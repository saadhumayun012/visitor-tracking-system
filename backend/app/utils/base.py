from sqlalchemy.orm import declarative_base
from sqlalchemy import Column, DateTime, func
from sqlalchemy.orm import declared_attr

Base = declarative_base()

# ==========+++++==========+++++==========
class CreatedAtMixin:
    @declared_attr
    def created_at(cls):
        return Column(
            DateTime(timezone=True),
            server_default=func.now(),
            nullable=False
        )

# ==========+++++==========+++++========== 
class TimestampMixin(CreatedAtMixin):
    @declared_attr
    def updated_at(cls):
        return Column(
            DateTime(timezone=True),
            server_default=func.now(),
            onupdate=func.now(),
            nullable=False
        )