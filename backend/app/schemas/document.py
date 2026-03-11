from datetime import datetime
from pydantic import BaseModel, Field, ConfigDict

# ==========+++++==========+++++==========
class CreateDocumentTypeRequest(BaseModel):
    document_code: str = Field(..., min_length=2)
    document_name: str = Field(..., min_length=3)
    is_required: bool = True

# ==========+++++==========+++++==========
class DocumentTypeResponse(BaseModel):
    document_type_id: int
    document_code: str
    document_name: str
    is_required: bool
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)

# ==========+++++==========+++++==========
class DocumentPathItem(BaseModel):
    document_code: str
    file_path: str