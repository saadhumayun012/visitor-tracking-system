from pydantic import BaseModel, Field, ConfigDict
from datetime import datetime

from app.enum import BadgeStatus

class CreateBadgeRequest(BaseModel):
    badge_code: str = Field(...)
    badge_status: BadgeStatus = BadgeStatus.AVAILABLE

class BadgeResponse(BaseModel):
    badge_id: int
    badge_code: str
    badge_status: str

    model_config = ConfigDict(from_attributes=True)