from fastapi import APIRouter, HTTPException, status
from datetime import datetime, timezone

from app.models import Visitors, Badges, Visits
from app.utils import db_dependency, require_receptionist_dependency
from app.schemas import FindVisitorResponse

router = APIRouter(
    prefix="/find_visitor",
    tags=["Find Visitor - Receptionist"]
)

#find by badge_code
@router.get("/", response_model=FindVisitorResponse, status_code=status.HTTP_200_OK)
def find_visitor_by_badge(
    db: db_dependency,
    _: require_receptionist_dependency,
    badge_code: str
):

    badge = (
        db.query(Badges)
        .filter(Badges.badge_code == badge_code)
        .first()
    )

    if badge is None:
        raise HTTPException(
            status_code= status.HTTP_404_NOT_FOUND,
            detail= "Badge Not Found"
        )

    visit = (
        db.query(Visits)
        .filter(Visits.badge_id == badge.badge_id)
        .first()
    )

    if visit is None:
        raise HTTPException(
            status_code= status.HTTP_404_NOT_FOUND,
            detail= "Visit Not Found"
        )

    visitor = (
        db.query(Visitors)
        .filter(Visitors.visitor_id == visit.visitor_id)
        .first()
    )

    if visitor is None:
        raise HTTPException(
            status_code= status.HTTP_404_NOT_FOUND,
            detail= "Visitor Not Found"
        )

    return {
        "visitor_name": visitor.visitor_name,
        "father_name": visitor.father_name,
        "cnic_number": visitor.cnic_number,
        "purpose": visit.purpose,
        "status": visit.status,
        "check_in_time": visit.check_in_time,
        "total_time": datetime.now(timezone.utc) - visit.check_in_time
    }
    