from pydantic import BaseModel
from typing import Optional

class OcrExtractedData(BaseModel):
    name: Optional[str] = None
    father_name: Optional[str] = None
    cnic_number: Optional[str] = None
    date_of_birth: Optional[str] = None
    date_of_issue: Optional[str] = None
    date_of_expiry: Optional[str] = None
    gender: Optional[str] = None

class OcrResponse(BaseModel):
    extracted_data: OcrExtractedData
    front_image_path: str
    back_image_path: str