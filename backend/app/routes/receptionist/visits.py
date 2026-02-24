from fastapi import APIRouter, HTTPException, status
from datetime import datetime, timezone
from app.models import Visitors, Visits, Visit_Vehicles, Visit_Items, Badges, Branches
from app.schemas import CreateCompleteVisitRequest
from app.utils import db_dependency, require_receptionist_dependency

from app.enum import VisitStatus, BadgeStatus

router = APIRouter(
    prefix="/visits",
    tags=["Visitor - Receptionist"]
)

#receptionist add the visits details (complete) of visitors
@router.post("/visit", status_code=status.HTTP_201_CREATED)
def add_visits(
    db: db_dependency,
    user: require_receptionist_dependency,
    request: CreateCompleteVisitRequest
):
    visitor_exists = (
        db.query(Visitors)
        .filter(Visitors.visitor_id == int(request.visitor_id))
        .first()
    )

    if not visitor_exists:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Visitor Not Found"
        )
    
    badge = (
        db.query(Badges)
        .filter(
            Badges.badge_id == request.badge_id,
            Badges.badge_status == BadgeStatus.AVAILABLE
        )
        .first()
    )

    if not badge:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Badge not available"
        )
    
    new_visit = Visits(
        purpose = request.purpose,
        purpose_description = request.purpose_description,
        status = VisitStatus.CHECKED_IN,
        visitor_id = request.visitor_id,
        branch_id = request.branch_id,
        badge_id = request.badge_id,
        created_by = user.user_id  # automatic
    )

    badge.badge_status = BadgeStatus.IN_USE # type: ignore
    db.add(new_visit)
    db.flush() # get visit_id

    if request.vehicle:
        vehicle = Visit_Vehicles(
            vehicle_number=request.vehicle.vehicle_number,
            vehicle_color=request.vehicle.vehicle_color,
            vehicle_type=request.vehicle.vehicle_type,
            visit_id=new_visit.visit_id
        )
        db.add(vehicle)

    if request.items:
        items = Visit_Items(
            items_description=request.items.items_description,
            visit_id=new_visit.visit_id 
        )
        db.add(items)

    db.commit()
    db.refresh(new_visit)

    return{
        "message": "Visit added successfully"
    }

# add visitor vehicle details in the time of its visit
# @router.post("/vehicle", status_code=status.HTTP_201_CREATED)
# def add_vehicle(
#     db: db_dependency,
#     _: require_receptionist_dependency,
#     request: CreateVisitVehicleRequest
# ):
#     visit = db.query(Visits).filter(Visits.visit_id == int(request.visit_id)).first()

#     if not visit:
#         raise HTTPException(
#             status_code=status.HTTP_404_NOT_FOUND,
#             detail="Visit Not Found"
#         )
    
#     vehicle = Visit_Vehicles(
#         vehicle_number = request.vehicle_number,
#         vehicle_color = request.vehicle_color,
#         vehicle_type = request.vehicle_type,
#         visit_id = request.visit_id
#     )

#     db.add(vehicle)
#     db.commit()
#     db.refresh(vehicle)

#     return {
#         "message": "vehicle added successfully",
#         "details": vehicle
#     }

# add visitor vehicle details in the time of its visit
# @router.post("/items", status_code=status.HTTP_201_CREATED)
# def add_item(
#     db: db_dependency,
#     _: require_receptionist_dependency,
#     request: CreateVisitItemRequest
# ):
#     visit = db.query(Visits).filter(Visits.visit_id == int(request.visit_id)).first()

#     if not visit:
#         raise HTTPException(
#             status_code=status.HTTP_404_NOT_FOUND,
#             detail="Visit Not Found"
#         )
    
#     items = Visit_Items(
#         items_description = request.items_description,
#         visit_id = request.visit_id
#     )

#     db.add(items)
#     db.commit()
#     db.refresh(items)

#     return {
#         "message": "items description added successfully",
#         "details": items
#     }


# check out the visitor
@router.patch("/checkout/{visit_id}", status_code= status.HTTP_200_OK)
def check_out(
    db: db_dependency,
    _: require_receptionist_dependency,
    visit_id: int
):
    visit = db.query(Visits).filter(
        Visits.visit_id == visit_id,
        Visits.status == VisitStatus.CHECKED_IN
    ).first()

    if not visit:
        raise HTTPException(status_code=404, detail="Active visit not found")

    visit.status = VisitStatus.CHECKED_OUT # type: ignore
    visit.check_out_time = datetime.now(timezone.utc) # type: ignore

    db.query(Badges)\
    .filter(Badges.badge_id == visit.badge_id)\
    .update(
        {
            Badges.badge_status: BadgeStatus.AVAILABLE
        }
    )

    db.commit()

    return {
        "message": "Visitor checked out successfully"
    }
