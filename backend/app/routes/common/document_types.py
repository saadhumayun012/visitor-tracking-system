from typing import List
from fastapi import APIRouter, status

from app.models import Document_Types
from app.schemas import DocumentTypeResponse
from app.utils import db_dependency, user_dependency

router = APIRouter(
    prefix="/document-types",
    tags=["Receptionist - Document Types"],
)

# ==========+++++==========+++++==========
# receptionist can view all document types (needed for document upload slots)
@router.get("/", response_model=List[DocumentTypeResponse], status_code=status.HTTP_200_OK)
def get_document_types(
    db: db_dependency,
    _: user_dependency,
):
    return db.query(Document_Types).all()