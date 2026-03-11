from typing import Optional

from pydantic import BaseModel, Field, field_validator, ConfigDict, model_validator
from datetime import date, datetime
from app.core.enum import GenderType
from .document import DocumentPathItem

# ==========+++++==========+++++==========
class CreateVisitorRequest(BaseModel):
    visitor_name: str = Field(..., min_length=3, max_length=100)
    father_name: str | None = Field(None, max_length=100)
    gender: GenderType
    date_of_birth: date
    cnic_number: str = Field(..., pattern=r"^\d{5}-\d{7}-\d$")
    cnic_date_of_issue: date | None = None
    cnic_date_of_expiry: date | None = None
    current_address: str = Field(..., min_length=3, max_length=300)
    permanent_address: str | None = Field(None, max_length=300)
    phone_number: str = Field(..., min_length=10, max_length=15)

    # Optional: For file uploads, we can use a list of file paths or URLs
    document_paths: list[DocumentPathItem] = []

    @field_validator(
        "date_of_birth", "cnic_date_of_issue", "cnic_date_of_expiry", mode="before"
    )
    @classmethod
    def parse_date(cls, v):
        if v is None or isinstance(v, (date, datetime)):
            return v
        for fmt in ("%d.%m.%Y", "%d/%m/%Y", "%d-%m-%Y"):
            try:
                return datetime.strptime(v, fmt).date()
            except:
                pass
        raise ValueError(
            "Invalid date format. Use DD.MM.YYYY, DD/MM/YYYY, or DD-MM-YYYY"
        )

    @model_validator(mode="after")
    def check_logic(self):
        # Only validate if both dates are provided
        if self.cnic_date_of_issue and self.cnic_date_of_expiry:
            if self.cnic_date_of_expiry <= self.cnic_date_of_issue:
                raise ValueError("CNIC expiry date must greater then issue date")

            if self.cnic_date_of_expiry < date.today():
                raise ValueError("CNIC expired.")

        # Optional: Validate if only one is provided
        if self.cnic_date_of_issue and not self.cnic_date_of_expiry:
            raise ValueError("CNIC expiry date required when issue date is provided")

        if self.cnic_date_of_expiry and not self.cnic_date_of_issue:
            raise ValueError("CNIC issue date required when expiry date is provided")

        return self

# ==========+++++==========+++++==========
class VisitorResponse(BaseModel):
    visitor_id: int
    visitor_name: str
    father_name: str | None = None
    gender: GenderType
    date_of_birth: date
    cnic_number: str
    cnic_date_of_issue: date | None = None
    cnic_date_of_expiry: date | None = None
    current_address: str
    permanent_address: str | None = None
    phone_number: str
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    model_config = ConfigDict(from_attributes=True)

# ==========+++++==========+++++==========
class VisitorIdResponse(BaseModel):
    visitor_id: int
    visitor_name: str
    cnic_number: str

    model_config = ConfigDict(from_attributes=True)

# ==========+++++==========+++++==========
class FoundVisitorResponse(BaseModel):
    visitor_name: str
    cnic_number: str
    purpose: str
    status: str
    check_in_time: datetime
    total_time: int
    badge_code: str

    model_config = ConfigDict(from_attributes=True)

# ==========+++++==========+++++==========
class VisitorDocumentResponse(BaseModel):
    visitor_document_id: int
    document_name: str
    document_code: str
    file_path: str
    uploaded_by_username: str | None = None
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)

# ==========+++++==========+++++==========
class UpdateVisitorRequest(BaseModel):
    visitor_name: str | None = Field(None, min_length=3, max_length=100)
    father_name: str | None = Field(None, max_length=100)
    gender: GenderType | None = None
    date_of_birth: date | None = None
    cnic_number: str | None = Field(None, pattern=r"^\d{5}-\d{7}-\d$")
    cnic_date_of_issue: date | None = None
    cnic_date_of_expiry: date | None = None
    current_address: str | None = Field(None, min_length=10, max_length=300)
    permanent_address: str | None = Field(None, max_length=300)
    phone_number: str | None = Field(None, min_length=10, max_length=15)

    @field_validator(
        "date_of_birth", "cnic_date_of_issue", "cnic_date_of_expiry", mode="before"
    )
    @classmethod
    def parse_date(cls, v):
        if v is None or isinstance(v, (date, datetime)):
            return v
        for fmt in ("%d.%m.%Y", "%d/%m/%Y", "%d-%m-%Y"):
            try:
                return datetime.strptime(v, fmt).date()
            except:
                pass
        raise ValueError(
            "Invalid date format. Use DD.MM.YYYY, DD/MM/YYYY, or DD-MM-YYYY"
        )
