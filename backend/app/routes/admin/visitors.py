from fastapi import APIRouter, HTTPException, status
from sqlalchemy.orm import joinedload

from app.models import Visitors, Visits

from app.utils import db_dependency, require_admin_dependency, user_dependency
router = APIRouter(
    prefix="/visitors",
    tags=["Admin - Visitors"]
)

# get all visitors
@router.get("/", status_code=status.HTTP_200_OK)
def get_visitor(
    db: db_dependency,
    _: user_dependency
):
    all_visitors = db.query(Visitors).all()

    return {
        "visitors": all_visitors
    }

# get all visits of visitor
@router.get("/{visitor_id}/visits", status_code=status.HTTP_200_OK)
def all_visits_of_visitor(
    db: db_dependency,
    _: require_admin_dependency,
    visitor_id: int
):
    visitor = (
        db.query(Visitors)
        .options(
            joinedload(Visitors.visits).joinedload(Visits.visit_item),
            joinedload(Visitors.visits).joinedload(Visits.visit_vehicle)
        )
        .filter(Visitors.visitor_id == visitor_id)
        .first()
    )
    
    if not visitor:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Visitor Not Found"
        )

    return {
        "visits": visitor.visits
    }
