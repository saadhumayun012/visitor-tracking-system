from sqlalchemy import Column, Integer, String, Identity, Boolean
from app.utils import TimestampMixin, Base

class Branches(Base, TimestampMixin):
    __tablename__ = "branches"

    branch_id = Column(
        Integer,
        Identity(always=True),
        primary_key=True,
        index=True
    )
    branch_code = Column(
        String(20),
        unique=True,
        index=True
    )
    branch_name = Column(String(30))

    