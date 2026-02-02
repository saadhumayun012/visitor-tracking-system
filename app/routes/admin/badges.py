from fastapi import APIRouter, HTTPException, status

from app.models import Badges
from app.schemas import CreateBadgeRequest
from app.utils import db_dependency, admin_dependency

router = APIRouter(
    prefix="/badges",
    tags= ["Admin - Badges"],
)

# admin add the badges which are given to visitor
@router.post("/", status_code=status.HTTP_201_CREATED)
def add_badge(
    db: db_dependency,
    _: admin_dependency,
    request: CreateBadgeRequest
):
    new_badge = Badges(
        badge_code = request.badge_code,
        badge_status = request.badge_status
    )

    existing_badge = (
        db.query(Badges)
        .filter(Badges.badge_code == new_badge.badge_code)
        .first()
    )

    if existing_badge:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="This badge is already exists, check the badge code"
        )
    
    db.add(new_badge)
    db.commit()
    db.refresh(new_badge)

    return {
        "message": "badge added successfully"
    }

# admin view all the badges
@router.get("/all_badges", status_code=status.HTTP_200_OK)
def get_badges(
    db: db_dependency,
    _: admin_dependency
):
    all_badges = db.query(Badges).all()
    return {
        "Badges List": all_badges
    }