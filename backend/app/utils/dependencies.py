from dataclasses import dataclass
from typing import Annotated
from fastapi import Depends, HTTPException, Query, status, Request
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from typing import Annotated

from app.models.user import Users
from app.core.database import SessionLocal
from app.core.config import settings
from app.core.enum import UserRoles

# ==========+++++==========+++++==========
# db dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    except Exception: 
        db.rollback()
        raise
    finally:
        db.close()
db_dependency = Annotated[Session, Depends(get_db)]




#oauth2_bearer = OAuth2PasswordBearer(tokenUrl="/auth/login") # this will through exception 401 "Not Authenticated" if we try to login without credentials
# ==========+++++==========+++++==========
# user dependency
def get_current_user(
    db: db_dependency,
    request: Request,
):
    access_token = request.cookies.get("access_token")
    
    if access_token is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated"
        )
    try:
        payload = jwt.decode(
            access_token,
            settings.secret_key,
            algorithms=[settings.algorithm]
        )

        user_id = payload.get("user_id")
        if user_id is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token"
            )

        user = db.query(Users).filter(Users.user_id == int(user_id)).first()

        if user is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token"
            )

        return user

    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token"
        )
   
user_dependency = Annotated[Users, Depends(get_current_user) ]

# ==========+++++==========+++++==========
# require admin dependency
def require_admin(
    user: user_dependency
):
    if user.user_role != UserRoles.ADMIN: # type: ignore
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only admin can perform this action"
        )
    return user

require_admin_dependency = Annotated[Users, Depends(require_admin)]

# ==========+++++==========+++++==========
# require receptionist dependency
def require_receptionist(
    user: user_dependency
):
    if user.user_role != UserRoles.RECEPTIONIST: # type: ignore
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only Receptionist can perform this action"
        )
    return user

require_receptionist_dependency = Annotated[Users, Depends(require_receptionist)]

# ==========+++++==========+++++==========
# require branch officer dependency
def require_branch_officer(
    user: user_dependency
):
    if user.user_role != UserRoles.BRANCH_OFFICER: # type: ignore
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only Branch officer can perform this action"
        )
    return user

require_branch_officer_dependency = Annotated[Users, Depends(require_branch_officer)]

# ==========+++++==========+++++==========
#pagination dependency 
@dataclass
class PaginationParams:
    page: int = Query(1, ge=1)
    limit: int = Query(15, ge=1, le=100)

pagination_dependency = Annotated[PaginationParams, Depends(PaginationParams)]