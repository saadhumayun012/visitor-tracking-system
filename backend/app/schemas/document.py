from pydantic import BaseModel, Field

class CreateDocumentTypeRequest(BaseModel):
    document_code: str = Field(..., min_length=2)
    document_name: str = Field(..., min_length=3)
    is_required: bool = True