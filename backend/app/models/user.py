from sqlalchemy import Column, Integer, String, Identity, Boolean, func, DateTime, ForeignKey, Enum
from sqlalchemy.orm import relationship
from app.utils import TimestampMixin, CreatedAtMixin, Base

from app.enum import UserRoles

class Users(Base, TimestampMixin):
    __tablename__ = "users"

    user_id = Column(
        Integer,
        Identity(always=True),
        primary_key=True,
        index=True
    )
    username = Column(
        String(30),
        unique=True,
        index=True,
        nullable=False
    )
    password_hash = Column(
        String(255), 
        nullable=False
    )
    user_role = Column(
        Enum(UserRoles), 
        nullable=False
    )
    last_login_at = Column(DateTime(timezone=True), nullable=True)
    # foreign key
    branch_id = Column(
        Integer, 
        ForeignKey("branches.branch_id"),
        nullable=True
    )
    # relationship
    branch = relationship("Branches", foreign_keys=[branch_id])

    @property
    def branch_name(self) -> str | None:
        return self.branch.branch_name if self.branch else None


class AuditLogs(Base, CreatedAtMixin):
    __tablename__ = "audit_logs"

    audit_log_id = Column(
        Integer,
        Identity(always=True),
        primary_key=True,
        index=True
    )
    role_at_time = Column(Enum(UserRoles), nullable=False)
    action = Column(String(20))
    entity = Column(String(20))
    entity_id = Column(Integer)
    old_value = Column(String)
    new_value = Column(String)
    ip_address = Column(String(45))
    # foreign key
    user_id = Column(
        Integer,
        ForeignKey("users.user_id"),
        nullable=False
    )