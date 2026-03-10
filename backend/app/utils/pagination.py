from math import ceil
from sqlalchemy.orm import Query

# ==========+++++==========+++++==========
def paginate(query: Query, page: int, limit: int):
    # Count
    total_items = query.order_by(None).count()
    
    items = (
        query
        .offset((page - 1) * limit)   # page 1 → skip 0, page 2 → skip 20
        .limit(limit)                   # only 20
        .all()
    )
    
    # Total pages calculation
    # ceil(243/20) = ceil(12.15) = 13
    total_pages = ceil(total_items / limit) if total_items else 1
    
    return {
        "items": items,
        "total_items": total_items,
        "page": page,
        "limit": limit,
        "total_pages": total_pages,
    }