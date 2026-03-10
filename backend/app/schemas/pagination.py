from typing import Generic, TypeVar, List
from pydantic import BaseModel

T = TypeVar("T")

# ==========+++++==========+++++==========
class PaginatedResponse(BaseModel, Generic[T]):
    items: List[T]
    total_items: int
    page: int
    limit: int
    total_pages: int