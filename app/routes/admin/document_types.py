from fastapi import APIRouter, HTTPException, status

from app.models import Document_Types
from app.schemas import CreateDocumentTypeRequest
from app.utils import db_dependency, admin_dependency

router = APIRouter(
    prefix="/document_types",
    tags= ["Admin - Document Types"],
)

# admin can add the types of documents which are needed
@router.post("/", status_code=status.HTTP_201_CREATED)
def add_documents_types(
    db: db_dependency,
    _: admin_dependency,
    request: CreateDocumentTypeRequest
):  
    new_document_type = Document_Types(
        document_code = request.document_code,
        document_name = request.document_name,
        is_required = request.is_required
    )

    existing_type = (
        db.query(Document_Types)
        .filter(Document_Types.document_code == new_document_type.document_code)
        .first()
    )

    if existing_type:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="This document is already added, check the document_code"
        )
    
    db.add(new_document_type)
    db.commit()
    db.refresh(new_document_type)

    return {
        "Message": f"Document Type: {new_document_type.document_name} added successfully"
    }

# admin can view all document types
@router.get("/all_document_types", status_code=status.HTTP_200_OK)
def get_document_types(
    db: db_dependency,
    _: admin_dependency,
):
    all_document_types = db.query(Document_Types).all()
    return {
        "All Document Types": all_document_types
    }