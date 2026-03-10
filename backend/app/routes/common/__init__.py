from fastapi import APIRouter
from .branches import router as branches_router
from .auth import router as auth_router
from .document_types import router as document_types_router

router = APIRouter()
router.include_router(branches_router)
router.include_router(auth_router)
router.include_router(document_types_router)