from fastapi import APIRouter, HTTPException, status

from app.models import Visitors
from app.schemas import (
    CreateVisitorRequest, 
    VisitorIdResponse, 
    UpdateVisitorRequest, 
    VisitorResponse
)
from app.utils import db_dependency, require_receptionist_dependency
from app.models.visitor import Document_Types, Visitors_Documents


router = APIRouter(
    prefix="/visitors",
    tags=["Visitor - Receptionist"]
)

# ==========+++++==========+++++==========
# receptionist add the visitor (it is only visitor details)
@router.post("/", status_code=status.HTTP_201_CREATED)
def create_visitor(
    db: db_dependency,
    user: require_receptionist_dependency,
    request: CreateVisitorRequest
):
    new_visitor = Visitors(**request.model_dump(
        exclude={"document_paths"}
    ))

    existing_visitor = (
        db.query(Visitors)
        .filter(Visitors.cnic_number == new_visitor.cnic_number)
        .first()
    )

    if existing_visitor:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="This visitor is already exists, contact to admin to see details"
        )
    
    db.add(new_visitor)
    db.flush()  # to get the visitor_id for the new visitor before commit

    # handle document uploads if any
    for doc in request.document_paths:
        doc_type = db.query(Document_Types).filter(
            Document_Types.document_code == doc.document_code
        ).first()

        if not doc_type:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Document type with code {doc.document_code} does not exist"
            )

        db.add(Visitors_Documents(
            visitor_id=new_visitor.visitor_id,
            file_path=doc.file_path,
            document_type_id=doc_type.document_type_id,
            uploaded_by=user.user_id
        ))

    db.commit()
    db.refresh(new_visitor)

    return {
        "message": "Visitor added successfully",
        "visitor_id": new_visitor.visitor_id # this is need for the visit
    }

# ==========+++++==========+++++==========
# get visitor by cnic
@router.get("/cnic", response_model=VisitorResponse, status_code=status.HTTP_200_OK)
def get_visitor_by_cnic(
    cnic_number: str,
    db: db_dependency,
    _: require_receptionist_dependency
):
    visitor = db.query(Visitors).filter(
        Visitors.cnic_number == cnic_number
    ).first()
    
    if not visitor:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Visitor not found"
        )
    
    return visitor

# ==========+++++==========+++++==========
# receptionist get the visitor by id
@router.get("/{visitor_id}", response_model=VisitorIdResponse, status_code=status.HTTP_200_OK)
def get_visitor_by_id(
    visitor_id: int,
    db: db_dependency,
    _: require_receptionist_dependency
):
    visitor = db.query(Visitors).filter(
        Visitors.visitor_id == visitor_id
    ).first()
    
    if not visitor:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Visitor not found"
        )
    
    return visitor

# ==========+++++==========+++++==========
# update the visitor record if needed means partially update
@router.patch("/{visitor_id}", status_code=status.HTTP_200_OK)
def update_visitor(
    db: db_dependency,
    _: require_receptionist_dependency,
    visitor_id: int,
    request: UpdateVisitorRequest
):
    visitor = db.query(Visitors).filter(
        Visitors.visitor_id == visitor_id
    ).first()

    if not visitor:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Visitor not found"
        )
    
    update_data = request.model_dump(exclude_unset=True)
    
    for field, value in update_data.items():
        setattr(visitor, field, value)

    db.commit()

    return {
        "message": "Visitor updated successfully"
    }