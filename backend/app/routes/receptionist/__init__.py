from fastapi import APIRouter

from .badges import router as badges_router
from .visitors import router as visitors_router
from .visits import router as visits_router
from .find_visit import router as find_visit

router = APIRouter(
    prefix="/receptionist"
)

router.include_router(badges_router)
router.include_router(visitors_router)
router.include_router(visits_router)
router.include_router(find_visit)