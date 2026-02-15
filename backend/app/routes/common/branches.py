from fastapi import APIRouter, HTTPException, status

from app.models import Branches
from app.utils import db_dependency, user_dependency

router = APIRouter(
    prefix="/branches",
    tags= ["Common - Branches"],
)

# get all branches
@router.get("/", status_code=status.HTTP_200_OK)
def get_branches(
    db: db_dependency,
    _: user_dependency
):
    all_branches = db.query(Branches).all()

    return { 
        "branches": all_branches 
    }