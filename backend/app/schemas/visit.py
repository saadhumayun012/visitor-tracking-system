from datetime import datetime
from typing import Optional
from pydantic import BaseModel, ConfigDict, Field


class CreateVisitVehicleRequest(BaseModel):
    vehicle_number: str = Field(...)
    vehicle_type: str = Field(...)
    vehicle_color: str = Field(...)


class CreateVisitItemRequest(BaseModel):
    items_description: str = Field(...)

class CreateCompleteVisitRequest(BaseModel):
    purpose: str = Field(...)
    purpose_description: str | None = Field(None, max_length=100)
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
    branch_id: int
    badge_id: int
    vehicle: Optional[VisitVehicleResponse] = None
    items: Optional[VisitItemResponse] = None
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)