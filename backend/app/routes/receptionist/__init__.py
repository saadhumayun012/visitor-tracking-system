from fastapi import APIRouter

from .badges import router as badges_router
from .visitors import router as visitors_router
from .visits import router as visits_router
from .find_visit import router as find_visit
from .ocr import router as ocr_router
from .document_types import router as document_types_router

router = APIRouter(
    prefix="/receptionist"
)

router.include_router(badges_router)
router.include_router(visitors_router)
router.include_router(visits_router)
router.include_router(find_visit)
router.include_router(ocr_router)
router.include_router(document_types_router)