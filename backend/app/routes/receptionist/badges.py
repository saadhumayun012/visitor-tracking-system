from typing import List
from fastapi import APIRouter, HTTPException, status

from app.utils import db_dependency, require_receptionist_dependency
from app.models import Badges
from app.enum import BadgeStatus
from app.schemas import BadgeResponse

router = APIRouter(
    prefix="/badges",
    tags=["Badge - Receptionist"]
)

# get all available badges
@router.get("/available",response_model=List[BadgeResponse] ,status_code=status.HTTP_200_OK)
def get_available_badges(
    db: db_dependency, 
    _: require_receptionist_dependency
):
    return db.query(Badges).filter(Badges.badge_status == BadgeStatus.AVAILABLE).all()