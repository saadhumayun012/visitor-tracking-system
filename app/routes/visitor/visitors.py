from fastapi import APIRouter, HTTPException, status

from app.models import Visitors, Visits
from app.schemas import CreateVisitorRequest, CreateVisitRequest
from app.utils import db_dependency, require_receptionist_dependency


router = APIRouter(
    prefix="/visitors",
    tags=["Visitor - Receptionist"]
)

# receptionist add the visitor (it is only visitor details)
@router.post("/", status_code=status.HTTP_201_CREATED)
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
        "details": new_visitor
    }

