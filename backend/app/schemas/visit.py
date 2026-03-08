from datetime import datetime
from typing import Optional
from pydantic import BaseModel, ConfigDict, Field

from app.core.enum import VisitStatus


class CreateVisitVehicleRequest(BaseModel):
    vehicle_number: str = Field(..., min_length=2, max_length=15)
    vehicle_type: str = Field(..., max_length=30)
    vehicle_color: str = Field(..., max_length=20)


class CreateVisitItemRequest(BaseModel):
    items_description: str = Field(..., min_length=3, max_length=500)
    
class CreateCompleteVisitRequest(BaseModel):
    purpose: str = Field(..., min_length=3, max_length=100)
    purpose_description: str | None = Field(None, max_length=300)
    visitor_id: int = Field(...)
    branch_id: int = Field(...)
    badge_id: int = Field(...)
    vehicle: CreateVisitVehicleRequest | None = None
    items: CreateVisitItemRequest | None = None

class VisitVehicleResponse(BaseModel):
    vehicle_number: str
    vehicle_type: str
    vehicle_color: str

    model_config = ConfigDict(from_attributes=True)

class VisitItemResponse(BaseModel):
    items_description: str

    model_config = ConfigDict(from_attributes=True)

class VisitResponse(BaseModel):
    visit_id: int
    purpose: str
    purpose_description: Optional[str] = None
    check_in_time: datetime
    check_out_time: Optional[datetime] = None 
    status: VisitStatus
    branch_id: int
    branch_name: Optional[str] = None         
    badge_id: int
    badge_code: Optional[str] = None          
    created_by: int
    created_by_username: Optional[str] = None
    visit_vehicle: Optional[VisitVehicleResponse] = None
    visit_item: Optional[VisitItemResponse] = None
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
