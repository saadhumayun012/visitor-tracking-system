from pydantic import BaseModel, Field

from app.enum import BadgeStatus

class CreateBadgeRequest(BaseModel):
    badge_code: str = Field(...)
    badge_status: BadgeStatus = BadgeStatus.AVAILABLE