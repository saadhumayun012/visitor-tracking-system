from fastapi import APIRouter, HTTPException, status

from app.models import Visitors
from app.schemas import CreateVisitorRequest
from app.utils import db_dependency, user_dependency

from app.enum import UserRoles

router = APIRouter(
    prefix="/visitor",
    tags=["Visitors"]
)

@router.post("/visitors", status_code=status.HTTP_200_OK)
def create_visitor(
    db: db_dependency,
    user: user_dependency,
    request: CreateVisitorRequest
):
    if (user.user_role != UserRoles.RECEPTIONIST):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only Receptionist can perform this action"
        )
    
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
            detail="This visitor is already exits plz contact to admin to see details"
        )
    
    db.add(new_visitor)
    db.commit()
    db.refresh(new_visitor)

    return {
        "Message": f"Visitor: {new_visitor.visitor_name} added successfully"
    }