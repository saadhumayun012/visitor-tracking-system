from pydantic import BaseModel, Field, field_validator, ConfigDict
from datetime import date, datetime

from app.enum import GenderType, VisitStatus

class CreateVisitorRequest(BaseModel):
    visitor_name: str = Field(...)
    father_name: str | None = None
    gender: GenderType
    cnic_number: str = Field(..., pattern=r"^\d{5}-\d{7}-\d$")
    date_of_birth: date = Field(...)
    current_address: str = Field(...)
    permanent_address: str | None = None
    phone_number: str = Field(...)


    @field_validator(
        "date_of_birth",
        mode="before"
    )
    @classmethod
    def parse_date(cls, v):
        if v is None or isinstance(v, date):
            return v
        
        for fmt in ("%d.%m.%Y" , "%d/%m/%Y", "%d-%m-%Y"):
            try:
                return datetime.strptime(v, fmt).date()
            except:
                pass
        raise ValueError("Invalid date format, Date = (Date.Month.Year)")
    
    model_config = ConfigDict(
        json_schema_extra = {
            "examples": [
                {
                    "visitor_name": "Donald",
                    "father_name": "Trump",
                    "gender": "male",
                    "cnic_number": "12345-1234557-1",
                    "date_of_birth": "01.01.2000",
                    "current_address": "123 Main St",
                    "phone_number": "1234567890"
                }
            ]
        }
    )


# class CreateVisitRequest(BaseModel):
#     purpose: str = Field(...)
#     description: str = Field(min_length=4, max_length=100)
#     status: VisitStatus = VisitStatus.CHECKED_IN
#     visitor_id: int = Field(...)
#     branch_id: int = Field(...)

