from .base import Base, CreatedAtMixin, TimestampMixin
from .dependencies import db_dependency, user_dependency, require_admin_dependency, require_receptionist_dependency, pagination_dependency, require_branch_officer_dependency
from .pagination import paginate
from .connection_manager import manager
from .ocr import get_reader, parse_cnic_data, save_cnic_image

__all__ = [
    "Base",
    "CreatedAtMixin",
    "TimestampMixin",
    "db_dependency",
    "user_dependency",
    "require_admin_dependency",
    "require_receptionist_dependency",
    "pagination_dependency",
    "paginate",
    "manager",
    "require_branch_officer_dependency",
    "get_reader",
    "parse_cnic_data",
    "save_cnic_image"
]