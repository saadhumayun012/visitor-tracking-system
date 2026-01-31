from pydantic import BaseModel, Field
from typing import Optional

from app.enum import UserRoles

class CreateUserRequest(BaseModel):
    username: str = Field(..., min_length=3)
    password: str = Field(..., min_length=4)
    user_role: UserRoles
    branch_id: Optional[int] = Field(
        default=None,
        description="Required only for branch officer"
    )


class LoginUserRequest(BaseModel):
    username: str = Field(...)
    password: str = Field(...)