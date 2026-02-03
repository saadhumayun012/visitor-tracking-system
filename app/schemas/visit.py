from pydantic import BaseModel, Field

from app.enum import VisitStatus

class CreateVisitRequest(BaseModel):
    purpose: str = Field(...)
    purpose_description: str = Field(min_length=4, max_length=100)
    status: VisitStatus = VisitStatus.CHECKED_IN
    visitor_id: int = Field(...)
    branch_id: int = Field(...)
    badge_id: int = Field(...)


class CreateVisitVehicleRequest(BaseModel):
    vehicle_number: str = Field(...)
    vehicle_type: str = Field(...)
    vehicle_color: str = Field(...)
    visit_id: int = Field(...)


class CreateVisitItemRequest(BaseModel):
    items_description: str = Field(...)
    visit_id: int = Field(...)

