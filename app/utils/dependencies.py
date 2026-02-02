from typing import Annotated
from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from typing import Annotated

from app.models.user import Users
from app.database import SessionLocal
from app.config import settings

from app.enum import UserRoles

# db dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    except: 
        db.rollback()
        raise
    finally:
        db.close()
db_dependency = Annotated[Session, Depends(get_db)]


# user_dependency
oauth2_bearer = OAuth2PasswordBearer(tokenUrl="/auth/login") # this will though exception 401 "Not Authenticated" if we try to login without credentials

def get_current_user(
    db: db_dependency,
    token: Annotated[str, Depends(oauth2_bearer)]
):
    try:
        payload = jwt.decode(
            token,
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

# require admin dependency
def require_admin(
    user: user_dependency
):
    if user.user_role != UserRoles.ADMIN:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only admin can perform this action"
        )
    return user

admin_dependency = Annotated[Users, Depends(require_admin)]