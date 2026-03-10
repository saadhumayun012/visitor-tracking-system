from typing import List
from fastapi import APIRouter, HTTPException, status
from sqlalchemy.orm import joinedload
from sqlalchemy import desc

from app.models import Visitors, Visits
from app.models.visitor import Visitors_Documents
from app.schemas import (
    PaginatedResponse,
    VisitResponse,
    VisitorResponse,
    VisitorDocumentResponse,
)
from app.utils import (
    db_dependency,
    require_admin_dependency,
    pagination_dependency,
    paginate,
)

router = APIRouter(prefix="/visitors", tags=["Admin - Visitors"])

# ==========+++++==========+++++==========
# get all visitors
@router.get(
    "/",
    response_model=PaginatedResponse[VisitorResponse],
    status_code=status.HTTP_200_OK,
)
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

# ==========+++++==========+++++==========
# TODO: add pagination to this endpoint as well if needed, but for now we can get all documents of visitor without pagination because it is not expected to be large number of documents for a single visitor
# get all visits of visitor
@router.get("/{visitor_id}/visits", response_model=PaginatedResponse[VisitResponse], status_code=status.HTTP_200_OK)
def all_visits_of_visitor(
    db: db_dependency,
    _: require_admin_dependency,
    visitor_id: int,
):
    query = (
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
    )
    return query

# ==========+++++==========+++++==========
# get all documents of visitor
@router.get("/{visitor_id}/documents", response_model=List[VisitorDocumentResponse], status_code=status.HTTP_200_OK)
def get_visitor_documents(
    db: db_dependency,
    _: require_admin_dependency,
    visitor_id: int,
):
    visitor = db.query(Visitors).filter(Visitors.visitor_id == visitor_id).first()
    if not visitor:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, 
            detail="Visitor not found"
        )

    docs = (
        db.query(Visitors_Documents)
        .filter(Visitors_Documents.visitor_id == visitor_id)
        .options(
            joinedload(Visitors_Documents.document_type),
            joinedload(Visitors_Documents.uploader),
        )
        .order_by(desc(Visitors_Documents.created_at))
        .all()
    )

    return [
        VisitorDocumentResponse(
            visitor_document_id=d.visitor_document_id,  # type: ignore
            document_name=d.document_type.document_name,
            document_code=d.document_type.document_code,
            file_path=d.file_path,  # type: ignore
            uploaded_by_username=d.uploader.username if d.uploader else None,
            created_at=d.created_at,
        )
        for d in docs
    ]
