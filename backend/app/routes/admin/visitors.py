from fastapi import APIRouter, HTTPException, status
from sqlalchemy.orm import joinedload

from app.models import Visitors, Visits

from app.utils import db_dependency, require_admin_dependency
router = APIRouter(
    prefix="/visitors",
    tags=["Admin - Visitors"]
)

# visitors all visits
@router.get("/{visitor_id}", status_code=status.HTTP_200_OK)
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
        "visitor": visitor.visitor_name,
        "visits": visitor.visits
    }
