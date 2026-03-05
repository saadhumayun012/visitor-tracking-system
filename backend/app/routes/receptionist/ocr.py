import cv2
import numpy as np
from fastapi import APIRouter, UploadFile, File, HTTPException, status

from app.models import Visitors_Documents, Document_Types
from app.schemas.ocr import OcrResponse
from app.utils import db_dependency, require_receptionist_dependency, save_cnic_image, get_reader, parse_cnic_data


router = APIRouter(
    prefix="/ocr",
    tags=["Receptionist - OCR"]
)

ALLOWED_TYPES = ["image/jpeg", "image/png", "image/jpg"]

@router.post("/extract", response_model=OcrResponse, status_code=status.HTTP_200_OK)
async def extract_cnic(
    db: db_dependency,
    user: require_receptionist_dependency,
    front_image: UploadFile = File(...),
    back_image: UploadFile = File(...),
):
    if front_image.content_type not in ALLOWED_TYPES:
        raise HTTPException(400, "Only JPEG/PNG allowed")

    front_bytes = await front_image.read()
    back_bytes = await back_image.read()

    # Images save karo
    front_path = save_cnic_image(front_bytes, "front")
    back_path = save_cnic_image(back_bytes, "back")

    # OCR — sirf front
    nparr = np.frombuffer(front_bytes, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    reader = get_reader()
    results = reader.readtext(img)

    extracted = parse_cnic_data(results)

    return {
        "extracted_data": extracted,
        "front_image_path": front_path,
        "back_image_path": back_path,
    }