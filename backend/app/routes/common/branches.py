from fastapi import APIRouter, status
from typing import List

from app.models import Branches
from app.schemas import BranchResponse
from app.utils import db_dependency, user_dependency

router = APIRouter(
    prefix="/branches",
    tags= ["Common - Branches"],
)

# ==========+++++==========+++++==========
# get all branches
@router.get("/",response_model=List[BranchResponse], status_code=status.HTTP_200_OK)
def get_branches(
    db: db_dependency,
    _: user_dependency,
):
    return db.query(Branches).all()