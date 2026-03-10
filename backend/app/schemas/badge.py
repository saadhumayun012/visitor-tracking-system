from pydantic import BaseModel, Field, ConfigDict
from datetime import datetime

from app.core.enum import BadgeStatus

# ==========+++++==========+++++==========
class CreateBadgeRequest(BaseModel):
    badge_code: str = Field(..., min_length=2, max_length=10)
    badge_status: BadgeStatus = BadgeStatus.AVAILABLE

# ==========+++++==========+++++==========
class BadgeResponse(BaseModel):
    badge_id: int
    badge_code: str
    badge_status: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)