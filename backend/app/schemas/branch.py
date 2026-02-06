from pydantic import BaseModel, Field

class CreateBranchRequest(BaseModel):
    branch_code: str = Field(..., min_length=2)
    branch_name: str = Field(..., min_length=3)