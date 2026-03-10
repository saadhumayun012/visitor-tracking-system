from datetime import datetime
from pydantic import BaseModel, ConfigDict, Field
from typing import Optional

from app.core.enum import UserRoles

# ==========+++++==========+++++==========
class CreateUserRequest(BaseModel):
    username: str = Field(..., min_length=3, max_length=20)
    password: str = Field(..., min_length=6, max_length=20)
    user_role: UserRoles
    branch_id: Optional[int] = None

# ==========+++++==========+++++==========
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

# ==========+++++==========+++++==========
class PasswordResetRequest(BaseModel):
    new_password: str = Field(...)
