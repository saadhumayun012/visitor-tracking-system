from fastapi import APIRouter, HTTPException, status
from passlib.context import CryptContext

from app.models import Users
from app.schemas import CreateUserRequest
from app.utils import db_dependency, require_admin_dependency

from app.enum import UserRoles

router = APIRouter(
    prefix="/users",
    tags= ["Admin - Users"],
)

# To hash the password
bcrypt_pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# admin can create all types of user including admin
@router.post("/", status_code=status.HTTP_201_CREATED)
def create_user(
    db: db_dependency,
    _: require_admin_dependency,
    request: CreateUserRequest
):  
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
        branch_id= None if request.branch_id == 0 else request.branch_id
        # request.branch_id #None if == 0 else request.branch_id # i have do this because swagger puts by default 0 due to int
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
        "message": f"User: {request.user_role.value}, created successfully",
        "details": new_user
    }

# admin can view all users
@router.get("/", status_code=status.HTTP_200_OK)
def get_user(
    db: db_dependency,
    _: require_admin_dependency
):
    all_users = db.query(Users).all()
    return {
        "users": all_users
    }
