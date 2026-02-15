from pydantic import BaseModel, Field

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