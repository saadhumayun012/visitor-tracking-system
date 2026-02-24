from datetime import datetime
from pydantic import BaseModel, ConfigDict, Field
from typing import Optional

from app.enum import UserRoles

class CreateUserRequest(BaseModel):
    username: str = Field(..., min_length=3)
    password: str = Field(..., min_length=4)
    user_role: UserRoles
    branch_id: Optional[int] = None


class LoginUserRequest(BaseModel):
    username: str = Field(...)
    password: str = Field(...)

class UserResponse(BaseModel):
    user_id: int
    username: str
    user_role: UserRoles
    last_login_at: Optional[datetime]
    branch_id: Optional[int]
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)