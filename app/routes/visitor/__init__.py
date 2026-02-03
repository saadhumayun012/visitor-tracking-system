from fastapi import APIRouter

from .visitors import router as visitors_router
from .visits import router as visits_router

router = APIRouter(
    prefix="/visitor"
)

router.include_router(visitors_router)
router.include_router(visits_router)