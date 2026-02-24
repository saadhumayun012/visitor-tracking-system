from fastapi import APIRouter, HTTPException, status

from app.models import Visitors, Visits
from app.schemas import CreateVisitorRequest
from app.utils import db_dependency, require_receptionist_dependency


router = APIRouter(
    prefix="/visitors",
    tags=["Visitor - Receptionist"]
)

# receptionist add the visitor (it is only visitor details)
@router.post("/visitor", status_code=status.HTTP_201_CREATED)
def create_visitor(
    db: db_dependency,
    _: require_receptionist_dependency,
    request: CreateVisitorRequest
):  
    new_visitor = Visitors(
        visitor_name= request.visitor_name,
        father_name= request.father_name,
        gender= request.gender,
        cnic_number= request.cnic_number,
        date_of_birth= request.date_of_birth,
        cnic_date_of_issue= request.cnic_date_of_issue,
        cnic_date_of_expiry= request.cnic_date_of_expiry,
        current_address= request.current_address,
        permanent_address= request.permanent_address,
        phone_number= request.phone_number
    )

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
    db.commit()
    db.refresh(new_visitor)

    return {
        "message": f"Visitor: {new_visitor.visitor_name} added successfully",
        "visitor_id": new_visitor.visitor_id # this is need for the visit
    }

# get visitor by cnic
@router.get("/cnic")
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
    
    return {
        "visitor": visitor
    }

# receptionist get the visitor by id
@router.get("/{visitor_id}")
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
    
    return {
        "visitor": visitor
    }