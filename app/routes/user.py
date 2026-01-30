# from fastapi import APIRouter, HTTPException
# from pydantic import BaseModel, Field, ConfigDict
# from typing import Optional
# from enum import Enum
# from datetime import date

# router = APIRouter(
#     prefix =  "/users",
#     tags = ["Users"]
# )

# class Purpose(Enum): 
#     IT_BRANCHE = 1
#     DBO_OFFICE = 2
#     # will add more

# class VechicalDetails(BaseModel):
#     NUMBER: str
#     TYPE: str
#     COLOR: str

# class CreateUserRequest(BaseModel):
#     name: str = Field(...)
#     father_name: str = Field(...)
#     gender: bool = Field(default=True, description="1 for Male, 0 for Female")
#     cnic_no: str = Field(min_length=13) # use regex
#     date_of_birth: date = Field(...)
#     cnic_date_of_issue: date = Field(...)
#     cnic_date_of_expiry: date = Field(...)
#     address: str = Field(...)
#     phone_number: str = Field(...) # use regex
#     purpose: Purpose = Field(...)
#     purpose_description: Optional[str] = None
#     vechical_availble: bool = Field(default=False)
#     vechical_description: Optional[VechicalDetails] = None
#     logistics_decription: str = None

#     #logic of cnic of date of expiry
#     model_config = ConfigDict(
#         json_schema_extra = {
#             "examples": [
#                 {
#                     "name": "saad",
#                     "father_name": "humayun",
#                     "gender": "1",
#                     "cnic_no": "12345-67890-1",
#                     "date_of_birth": "2000-01-01",
#                     "cnic_date_of_issue": "2020-01-01",
#                     "cnic_date_of_expiry": "2025-01-01",
#                     "address": "123 Main St",
#                     "phone_number": "1234567890",
#                     "purpose": 1,
#                     "purpose_description": "For IT Branch",
#                     "vechical_availble": "true",
#                     "vechical_description": {
#                         "NUMBER": "ABC123",
#                         "TYPE": "SUV",
#                         "COLOR": "RED"
#                     },
#                     "logistics_decription": "bag, watch, phone"
#                 }
#             ]
#         }
#     )


# @router.post("/user", status_code=201)
# async def create_user(request: CreateUserRequest):
#     return {"message": "User created", "data": request}


