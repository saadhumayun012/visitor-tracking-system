from pydantic import BaseModel, Field

class CreateVisitRequest(BaseModel):
    purpose: str = Field(...)
    purpose_description: str = Field(min_length=4, max_length=100)
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

