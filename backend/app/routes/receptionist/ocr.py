import cv2
import numpy as np
from fastapi import APIRouter, UploadFile, File, Form, HTTPException, status
from typing import List

from app.schemas.ocr import OcrResponse
from app.utils import db_dependency, require_receptionist_dependency, save_cnic_image, get_reader, parse_cnic_data

router = APIRouter(
    prefix="/ocr",
    tags=["Receptionist - OCR"]
)

ALLOWED_TYPES = ["image/jpeg", "image/png", "image/jpg"]

@router.post("/extract", response_model=OcrResponse, status_code=status.HTTP_200_OK)
async def extract_cnic(
    user: require_receptionist_dependency,
    documents: List[UploadFile] = File(...),
    document_codes: List[str] = Form(...),
):
    if len(documents) != len(document_codes):
        raise HTTPException(400, "documents aur document_codes ki count match nahi")

    ocr_data = None
    document_paths = []

    for file, code in zip(documents, document_codes):
        if file.content_type not in ALLOWED_TYPES:
            raise HTTPException(400, f"{code}: Only JPEG/PNG allowed")

        file_bytes = await file.read()
        path = save_cnic_image(file_bytes, code.lower())

        # Sirf CNIC_FRONT pe OCR
        if code == "cnic_front":
            nparr = np.frombuffer(file_bytes, np.uint8)
            img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
            results = get_reader().readtext(img)
            ocr_data = parse_cnic_data(results)

        document_paths.append({
            "document_code": code,
            "file_path": path
        })

    return {
        "extracted_data": ocr_data,
        "document_paths": document_paths,
    }