from fastapi import APIRouter, HTTPException, status
from passlib.context import CryptContext

from app.models import Users, Branches
from app.schemas import CreateUserRequest, CreateBranchRequest
from app.utils import db_dependency, user_dependency

from app.enum import UserRoles

router = APIRouter(
    prefix="/admin",
    tags= ["Admin"],
)

bcrypt_pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# admin can create all types of user including admin
@router.post("/users", status_code=status.HTTP_201_CREATED)
def create_user(
    db: db_dependency,
    user: user_dependency,
    request: CreateUserRequest
):
    if user.user_role!= UserRoles.ADMIN:
        raise HTTPException(
            status_code=403,
            detail="Only admin can perform this action"
        )
    
    if request.user_role == UserRoles.BRANCH_OFFICER and not request.branch_id:
        raise HTTPException(
            status_code=400,
            detail="For Branch officer, Branch id is required"
        )
    
    if request.user_role != UserRoles.BRANCH_OFFICER and request.branch_id:
        raise HTTPException(
            status_code=400,
            detail="Branch id allowed only for Branch officer"
        )

    new_user = Users(
        username= request.username,
        password_hash= bcrypt_pwd_context.hash(request.password),
        user_role= request.user_role,
        branch_id= None if request.branch_id == 0 else request.branch_id # i have do this because swagger puts by default 0 due to int
    )

    if (db.query(Users).filter(Users.username == new_user.username).first()):
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="User is already registered"
        )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return{
        "message": f"User: {request.user_role.value}, created successfully"
    }

# admin can add new branches
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

# admin can view all branches
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