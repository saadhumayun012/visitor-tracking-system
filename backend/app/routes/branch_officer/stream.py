import asyncio
import json
import queue
from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import joinedload

from app.utils import db_dependency, require_branch_officer_dependency
from app.utils.connection_manager import manager
from app.models import Visits, Visitors
from app.enum import VisitStatus

router = APIRouter(
    prefix="/branch-officer",
    tags=["Branch Officer"]
)

@router.get("/stream")
async def branch_officer_stream(
    db: db_dependency,
    user: require_branch_officer_dependency
):
    branch_id = user.branch_id
    queue = manager.connect(branch_id) # type: ignore

    active_visits = (
        db.query(Visits)
        .options(joinedload(Visits.visitor))
        .filter(
            Visits.branch_id == branch_id,
            Visits.status == VisitStatus.CHECKED_IN
        )
        .all()
    )

    for visit in active_visits:
        await queue.put({
            "event": "checkin",
            "visit_id": visit.visit_id,
            "visitor_name": visit.visitor.visitor_name,
            "cnic_number": visit.visitor.cnic_number,
            "purpose": visit.purpose,
            "badge_id": visit.badge_id,
            "check_in_time": visit.check_in_time.isoformat(),
        })

    async def event_stream():
        try:
            while True:
                data = await queue.get()
                yield f"data: {json.dumps(data)}\n\n"
        except asyncio.CancelledError:
             manager.disconnect(branch_id) # type: ignore

    return StreamingResponse(
        event_stream(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "X-Accel-Buffering": "no"
        }
    )
    

    