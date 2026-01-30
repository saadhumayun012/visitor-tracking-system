from fastapi import APIRouter, HTTPException, status
from passlib.context import CryptContext
from enum import Enum

from app.models import Users, Branches
from app.schemas import CreateUserRequest, CreateBranchRequest
from app.utils import db_dependency, user_dependency

router = APIRouter(
    prefix="/admin",
    tags= ["Admin"],
)

class UserRoles(str, Enum):
    ADMIN = "admin"
    RECEPTIONIST = "receptionist"
    BRANCH_OFFICER = "branch_officer"

bcrypt_pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

@router.post("/users", status_code=status.HTTP_201_CREATED)
def create_admin(
    db: db_dependency,
    user: user_dependency,
    request: CreateUserRequest
):
    if user.user_role.value != "admin":
        raise HTTPException(
            status_code=403,
            detail="Only admin can perform this action"
        )

    new_user = Users(
        username= request.username,
        password_hash= bcrypt_pwd_context.hash(request.password),
        user_role= "ADMIN"
    )


    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return{
        "message": "admin added successfully"
    }

@router.post("/users/receptionist", status_code=status.HTTP_201_CREATED)
def create_receptionist(
    db: db_dependency,
    user: user_dependency,
    request: CreateUserRequest
):
    if user.user_role.value != "admin":
        raise HTTPException(
            status_code=403,
            detail="Only admin can perform this action"
        )

    new_user = Users(
        username= request.username,
        password_hash= bcrypt_pwd_context.hash(request.password),
        user_role= "RECEPTIONIST"
    )


    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return{
        "message": "receptionist added successfully"
    }
    
@router.post("/users/branchOfficer", status_code=status.HTTP_201_CREATED)
def create_branch_officer(
    db: db_dependency,
    user: user_dependency,
    request: CreateUserRequest
):
    if user.user_role.value != "admin":
        raise HTTPException(
            status_code=403,
            detail="Only admin can perform this action"
        )
    
    new_user = Users(
        username= request.username,
        password_hash= bcrypt_pwd_context.hash(request.password),
        branch_id = request.branch_id,
        user_role= "BRANCH_OFFICER"
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return{
        "message": "brach officer added successfully"
    }

@router.post("/branch", status_code=status.HTTP_201_CREATED)
def add_branch(
    db: db_dependency,
    user: user_dependency,
    request: CreateBranchRequest
):
    if user.user_role.value != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only admin can perform this action"
        )
    
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

@router.get("/branches", status_code=status.HTTP_200_OK)
def get_branches(
    db: db_dependency,
    user: user_dependency
):
    if user.user_role.value != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only admin can perform this action"
        )
    
    all_branches = db.query(Branches).all()

    return { "All Branches List": all_branches }