from pydantic import BaseModel, Field, field_validator, ConfigDict, model_validator
from datetime import date, datetime
from app.enum import GenderType

class CreateVisitorRequest(BaseModel):
    visitor_name: str = Field(...)
    father_name: str | None = None
    gender: GenderType 
    date_of_birth: date
    cnic_number: str = Field(..., pattern=r"^\d{5}-\d{7}-\d$")
    cnic_date_of_issue: date | None = None
    cnic_date_of_expiry: date | None = None
    current_address: str = Field(..., min_length=10)
    permanent_address: str | None = None
    phone_number: str = Field(...)

    @field_validator(
        "date_of_birth",
        "cnic_date_of_issue",
        "cnic_date_of_expiry",
        mode="before"
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
        raise ValueError("Invalid date format. Use DD.MM.YYYY, DD/MM/YYYY, or DD-MM-YYYY")

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

    model_config = ConfigDict(
        json_schema_extra = {
            "examples": [
                {
                    "visitor_name": "Saad Humayun",
                    "father_name": "Humayun Khan",
                    "gender": "male",
                    "cnic_number": "12345-1234567-1",
                    "date_of_birth": "01.01.1995",
                    "cnic_date_of_issue": "01.01.2015",
                    "cnic_date_of_expiry": "01.01.2030",
                    "current_address": "House 123, Street 5, Islamabad",
                    "permanent_address": "Near Road",
                    "phone_number": "03001234567"
                }
            ]
        }
    )

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
    created_at: datetime
    updated_at: datetime


class VisitorIdResponse(BaseModel):
    visitor_id: int
    visitor_name: str
    cnic_number: str

    model_config = ConfigDict(from_attributes=True)

class VisitorCnicResponse(BaseModel):
    visitor_id: int
    visitor_name: str
    cnic_number: str
    date_of_birth: date
    current_address: str
    phone_number: str

    model_config = ConfigDict(from_attributes=True)

class FoundVisitorResponse(BaseModel):
    visitor_name: str
    cnic_number: str
    purpose: str
    status: str
    check_in_time: datetime
    total_time: int
    badge_code: str

    model_config = ConfigDict(from_attributes=True)