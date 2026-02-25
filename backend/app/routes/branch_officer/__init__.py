from fastapi import APIRouter
from app.routes.branch_officer import stream

router = APIRouter()
router.include_router(stream.router)