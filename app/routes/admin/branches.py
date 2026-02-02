from fastapi import APIRouter, HTTPException, status

from app.models import Branches
from app.schemas import CreateBranchRequest
from app.utils import db_dependency, admin_dependency

router = APIRouter(
    prefix="/branches",
    tags= ["Admin - Branches"],
)

# admin can add new branches
@router.post("/", status_code=status.HTTP_201_CREATED)
def add_branch(
    db: db_dependency,
    _: admin_dependency,
    request: CreateBranchRequest
):  
    new_branch = Branches(
        branch_code = request.branch_code,
        branch_name = request.branch_name
    )

    existing_branch = (
        db.query(Branches)
        .filter(Branches.branch_code == new_branch.branch_code)
        .first()
    )

    if existing_branch:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="This branch code already exists"
        )

    
    db.add(new_branch)
    db.commit()
    db.refresh(new_branch)

    return {
        "message": f"branch: {new_branch.branch_name} added successfully"
    }

# admin can view all branches
@router.get("/all_branches", status_code=status.HTTP_200_OK)
def get_branches(
    db: db_dependency,
    _: admin_dependency
):
    all_branches = db.query(Branches).all()

    return { 
        "branches List": all_branches 
    }