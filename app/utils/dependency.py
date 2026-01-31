from typing import Annotated
from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from typing import Annotated

from app.models.user import Users
from app.database import SessionLocal
from app.config import settings


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


oauth2_bearer = OAuth2PasswordBearer(tokenUrl="/auth/login")
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
    
user_dependency = Annotated[dict, Depends(get_current_user) ]