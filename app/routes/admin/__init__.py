from fastapi import APIRouter

from .badges import router as badges_router
from .branches import router as branches_router
from .document_types import router as document_types_router
from .users import router as users_router

router = APIRouter(
    prefix="/admin",
)

router.include_router(badges_router)
router.include_router(branches_router)
router.include_router(document_types_router)
router.include_router(users_router)