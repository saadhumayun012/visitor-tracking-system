import asyncio
from fastapi import APIRouter, HTTPException, status
from datetime import datetime, timezone
from sqlalchemy.orm import joinedload

from app.models import Visitors, Badges, Visits
from app.utils import db_dependency, require_receptionist_dependency, manager
from app.schemas import FoundVisitorResponse

from app.core.enum import VisitStatus, BadgeStatus

router = APIRouter(
    prefix="/find-visit",
    tags=["Find Visitor - Receptionist"]
)

# receptionist find the visit by badge code
@router.get("/", response_model=FoundVisitorResponse, status_code=status.HTTP_200_OK)
def find_visit_by_badge(
    db: db_dependency,
    _: require_receptionist_dependency,
    badge_code: str
):
    print(badge_code)
    badge = db.query(Badges).filter(Badges.badge_code == badge_code).first()
    if not badge:
        raise HTTPException(404, "Badge not found")

    visit = (
        db.query(Visits)
        .join(Visits.visitor)
        .filter(
            Visits.badge_id == badge.badge_id,
            Visits.status == VisitStatus.CHECKED_IN
        )
        .first()
    )
    if not visit:
        raise HTTPException(404, "No active visit found for this badge")

    return {
        "visitor_name": visit.visitor.visitor_name,
        "cnic_number": visit.visitor.cnic_number,
        "purpose": visit.purpose,
        "status": visit.status,
        "check_in_time": visit.check_in_time,
        "total_time": int((datetime.now(timezone.utc) - visit.check_in_time).total_seconds() // 60),
        "badge_code": badge_code  # need for checkout
    }
    
# now after found - check out the visit
@router.post("/checkout", status_code=status.HTTP_200_OK)
def check_out(
    db: db_dependency,
    _: require_receptionist_dependency,
    badge_code: str  # (already validated)
):   
    badge = db.query(Badges).filter(Badges.badge_code == badge_code).first()
    if not badge:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Badge Not Found"
        )

    visit = (
        db.query(Visits)
        .filter(
            Visits.badge_id == badge.badge_id,
            Visits.status == VisitStatus.CHECKED_IN
        )
        .first()
    )
    if not visit:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No active visit found for this badge"
        )

    visit.status = VisitStatus.CHECKED_OUT  # type: ignore
    visit.check_out_time = datetime.now(timezone.utc) # type: ignore
    badge.badge_status = BadgeStatus.AVAILABLE # type: ignore
    
    db.commit()

    # Sending SSE event
    asyncio.run(manager.send_to_branch(
        branch_id=visit.branch_id, # type: ignore
        data={
            "event": "checkout",
            "visit_id": visit.visit_id,
        }
    ))

    return {
        "message": "Checkout successful"
    } 