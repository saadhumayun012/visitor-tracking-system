from sqlalchemy import Column, String, Integer, Identity, DateTime, func, Enum, ForeignKey
from sqlalchemy.orm import relationship

from app.utils import CreatedAtMixin, TimestampMixin, Base

from app.enum import VisitStatus

#visitors visits model
class Visits(Base, CreatedAtMixin):
    __tablename__ = "visits"

    visit_id = Column(
        Integer, 
        Identity(always=True), 
        primary_key=True,
        index=True
    )
    
    purpose = Column(String(50))
    purpose_description = Column(String(500))
    
    check_in_time = Column(DateTime(timezone=True), server_default=func.now())
    check_out_time = Column(DateTime(timezone=True), nullable=True)
    
    status = Column(
        Enum(VisitStatus), 
        default=VisitStatus.CHECKED_IN, 
        nullable=False
    )
    # foreign keys
    visitor_id = Column(
        Integer, 
        ForeignKey("visitors.visitor_id"), 
        nullable=False
    )
    branch_id = Column(
        Integer, 
        ForeignKey("branches.branch_id"),
        nullable=False
    )
    badge_id = Column(
        Integer,
        ForeignKey("badges.badge_id"),
        nullable=True
    )
    created_by = Column(
        Integer,
        ForeignKey("users.user_id"),
        nullable=False
    )
    updated_by = Column(
        Integer,
        ForeignKey("users.user_id"),
        nullable=True
    )
    # relationships
    # many to one
    visitor = relationship("Visitors", back_populates="visits")
    # one to one
    visit_vehicle = relationship("Visit_Vehicles", back_populates="visit", uselist=False)
    visit_item = relationship("Visit_Items", back_populates="visit", uselist=False)
    badge = relationship("Badges", back_populates="visit", uselist=False)

#visitors -> visits -> vehicle model
class Visit_Vehicles(Base, CreatedAtMixin):
    __tablename__ = "visit_vehicles"

    visit_vehicle_id = Column(
        Integer,
        Identity(always=True),
        primary_key=True, 
        index=True
    )
    vehicle_number = Column(
        String(15),
        index=True
    )
    vehicle_type = Column(
        String(20)
    )
    vehicle_color = Column(
        String(15)
    )
    # foreign key
    visit_id = Column(
        Integer,
        ForeignKey("visits.visit_id", ondelete="CASCADE"),
        nullable=False
    )
    #relationships
    # one to one
    visit = relationship("Visits", back_populates="visit_vehicle", uselist=False)

#visitors -> visits -> Items model
class Visit_Items(Base, CreatedAtMixin):
    __tablename__ = "visits_items"

    visit_item_id = Column(
        Integer, 
        Identity(always=True), 
        primary_key=True,
        index=True
    )
    items_description = Column(String)
    # foreign key
    visit_id = Column(
        Integer, 
        ForeignKey("visits.visit_id", ondelete="CASCADE"), 
        nullable=False
    )
    #relationships
    # one to one
    visit = relationship("Visits", back_populates="visit_item", uselist=False)
    