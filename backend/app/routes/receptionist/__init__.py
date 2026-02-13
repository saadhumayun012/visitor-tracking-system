from fastapi import APIRouter

from .visitors import router as visitors_router
from .visits import router as visits_router
from .find_visitors import router as find_visitor

router = APIRouter(
    prefix="/receptionist"
)

router.include_router(visitors_router)
router.include_router(visits_router)
router.include_router(find_visitor)