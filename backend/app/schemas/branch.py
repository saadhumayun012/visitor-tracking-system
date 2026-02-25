from datetime import datetime
from pydantic import BaseModel, Field, ConfigDict

class CreateBranchRequest(BaseModel):
    branch_code: str = Field(..., min_length=2)
    branch_name: str = Field(..., min_length=3)

class BranchResponse(BaseModel):
    branch_id: int
    branch_name: str
    branch_code: str

    model_config = ConfigDict(from_attributes=True)