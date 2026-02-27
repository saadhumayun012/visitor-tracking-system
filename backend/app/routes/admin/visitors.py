from typing import List

from fastapi import APIRouter, HTTPException, status
from sqlalchemy.orm import joinedload
from sqlalchemy import desc

from app.models import Visitors, Visits
from app.schemas import PaginatedResponse, VisitResponse, VisitorResponse
from app.utils import db_dependency, require_admin_dependency, pagination_dependency, paginate


router = APIRouter(
    prefix="/visitors",
    tags=["Admin - Visitors"]
)

# get all visitors
@router.get("/",response_model=PaginatedResponse[VisitorResponse], status_code=status.HTTP_200_OK)
def get_visitor(
    db: db_dependency,
    _: require_admin_dependency,
    pagination: pagination_dependency,
):
    query = db.query(Visitors).order_by(desc(Visitors.created_at))

    return paginate(
        query, 
        pagination.page, 
        pagination.limit
    )

# get all visits of visitor
@router.get("/{visitor_id}/visits", response_model=List[VisitResponse], status_code=status.HTTP_200_OK)
def all_visits_of_visitor(
    db: db_dependency,
    _: require_admin_dependency,
    visitor_id: int,
):
    visits = (
        db.query(Visits)
        .filter(Visits.visitor_id == visitor_id)
        .order_by(desc(Visits.created_at))
        .options(
            joinedload(Visits.visit_item),
            joinedload(Visits.visit_vehicle),
            joinedload(Visits.badge),     
            joinedload(Visits.creator),   
            joinedload(Visits.branch),   
        )
        .all()
    )
    return visits