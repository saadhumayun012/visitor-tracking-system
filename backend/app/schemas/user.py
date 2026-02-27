from datetime import datetime
from pydantic import BaseModel, ConfigDict, Field
from typing import Optional

from app.enum import UserRoles

class CreateUserRequest(BaseModel):
    username: str = Field(..., min_length=3, max_length=50)
    password: str = Field(..., min_length=4, max_length=100)
    user_role: UserRoles
    branch_id: Optional[int] = None


class LoginUserRequest(BaseModel):
    username: str = Field(...)
    password: str = Field(...)

class UserResponse(BaseModel):
    user_id: int
    username: str
    user_role: UserRoles
    last_login_at: Optional[datetime] = None
    branch_id: Optional[int] = None
    branch_name: Optional[str] = None       
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
