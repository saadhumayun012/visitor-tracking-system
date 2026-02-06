from enum import Enum

class UserRoles(str, Enum):
    ADMIN = "admin"
    RECEPTIONIST = "receptionist"
    BRANCH_OFFICER = "branch_officer"

class BadgeStatus(str, Enum):
    AVAILABLE = "available"
    IN_USE = "in_use"
    LOST = "lost"
    DISABLED = "disabled"

class VisitStatus(str, Enum):
    CHECKED_IN = "checked_in"
    CHECKED_OUT = "checked_out"
    FORCE_CLOSED = "force_closed"
    CANCELLED = "cancelled"

class GenderType(str, Enum):
    MALE = "male"
    FEMALE = "female"
    OTHER = "other"