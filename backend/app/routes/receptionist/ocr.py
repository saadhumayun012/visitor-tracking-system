import cv2
import numpy as np
from fastapi import APIRouter, UploadFile, File, Form, HTTPException, status
from typing import List

from app.schemas.ocr import OcrResponse
from app.utils import (
    require_receptionist_dependency,
    save_cnic_image,
    get_reader,
    parse_cnic_data,
)

router = APIRouter(prefix="/ocr", tags=["Receptionist - OCR"])

ALLOWED_TYPES = ["image/jpeg", "image/png", "image/jpg"]
MAX_FILE_SIZE = 5 * 1024 * 1024  # 5MB

# ==========+++++==========+++++==========
@router.post("/extract", response_model=OcrResponse, status_code=status.HTTP_200_OK)
async def extract_cnic(
    _: require_receptionist_dependency,
    documents: List[UploadFile] = File(...),
    document_codes: List[str] = Form(...),
):
    if len(documents) != len(document_codes):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Number of documents and document codes must match",
        )

    ocr_data = None
    document_paths = []

    # Validate each file and process OCR
    for file, code in zip(documents, document_codes):
        if file.content_type not in ALLOWED_TYPES:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Unsupported file type: {file.content_type}",
            )

        file_bytes = await file.read()

        # Size check
        if len(file_bytes) > MAX_FILE_SIZE:
            raise HTTPException(
                status_code=status.HTTP_413_PAYLOAD_TOO_LARGE,
                detail=f"File size exceeds the maximum limit of 5MB: {file.filename}",
            )

        # OpenCV decode check
        nparr = np.frombuffer(file_bytes, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        if img is None:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"{code}: Invalid image file",
            )

        path = save_cnic_image(file_bytes, code.lower())

        # Currently, The only support OCR for the front side of the CNIC. Can extend this logic to handle other document types and sides as needed.
        if code == "cnic_front":
            results = get_reader().readtext(img)
            ocr_data = parse_cnic_data(results)

        document_paths.append({"document_code": code, "file_path": path})

    return {
        "extracted_data": ocr_data,
        "document_paths": document_paths,
    }
