from fastapi import APIRouter, HTTPException, status, Depends
from datetime import datetime, timezone, timedelta
from jose import jwt
from passlib.context import CryptContext
from fastapi.security import OAuth2PasswordRequestForm #will remove when saving the token in cookie
from typing import Annotated

from app.config import settings
from app.utils import db_dependency
from app.models import Users


router = APIRouter(
    prefix= "/auth",
    tags= ["Authentication"]
)

# For verify password
bcrypt_pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# create the access token and return it
def create_access_token(data: dict):
    to_encode = data.copy()

    expires = datetime.now(timezone.utc) + timedelta(hours=settings.access_token_expire_hours)
    to_encode.update({"exp": expires})

    encoded_jwt = jwt.encode(
        to_encode,
        settings.secret_key,
        algorithm=settings.algorithm
    )

    return encoded_jwt

# login the user and get the token
@router.post("/login", status_code=status.HTTP_200_OK)
async def login_user(
    db: db_dependency,
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()]
):
    user = db.query(Users).filter(
        Users.username == form_data.username
    ).first()

    if user is None or not bcrypt_pwd_context.verify(form_data.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
        )

    token = create_access_token(
        data={"user_id": user.user_id}
    )

    # user last login time?
    user.last_login_at = datetime.now(timezone.utc)
    db.commit()

    return {
        "access_token": token,
        "token_type": "bearer"
    }