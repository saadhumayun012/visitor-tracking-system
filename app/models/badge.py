from sqlalchemy import Column, Integer, String, Identity, Enum
from app.utils import TimestampMixin, Base

from app.enum import BadgeStatus

class Badges(Base, TimestampMixin):
    __tablename__ = "badges"

    badge_id = Column(
        Integer,
        Identity(always=True),
        primary_key=True,
        index=True
    )
    badge_code = Column(
        String(20),
        unique=True,
        index=True,
        nullable=False
    )
    status = Column(
        Enum(BadgeStatus), 
        default=BadgeStatus.AVAILABLE, 
        nullable=False
    )

    