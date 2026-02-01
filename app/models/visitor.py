from sqlalchemy import Column, String, Integer, Date, Identity, Enum, ForeignKey, Boolean
from app.utils import CreatedAtMixin, TimestampMixin, Base

from app.enum import GenderType

#visitors model
class Visitors(Base, TimestampMixin):
    __tablename__ = "visitors"

    visitor_id = Column(
        Integer, 
        Identity(always=True), 
        primary_key=True,
        index=True
    )
    visitor_name = Column(
        String(30), 
        nullable=False
    )
    father_name = Column(
        String(30), 
        nullable=True
    )
    gender = Column(Enum(GenderType), nullable=True)
    cnic_number = Column(
        String(20), 
        index=True,
        unique=True, 
        nullable=False
    )
    date_of_birth = Column(Date)
    current_address = Column(
        String, 
        nullable=False
    )
    permanent_address = Column(String)
    phone_number = Column(
        String(15), 
        index=True, 
        nullable=False
    )

#visitors documents types
class Document_Types(Base, CreatedAtMixin):
    __tablename__ = "document_types"
    document_type_id = Column(
        Integer,
        Identity(always=True),
        primary_key=True, 
        index=True
    )
    document_code = Column(String(20), unique=True, nullable=False)
    document_name = Column(String(30))
    is_required = Column(Boolean, default=False)
    is_active = Column(Boolean, default=False)

#visitors documents
class Visitors_Documents(Base, CreatedAtMixin):
    __tablename__ = "visitors_documents"

    visitor_document_id = Column(
        Integer,
        Identity(always=True),
        primary_key=True,
        index=True
    )
    visitor_id = Column(
        Integer,
        ForeignKey("visitors.visitor_id"),
        nullable=False
    )
    file_path = Column(String)
    uploaded_by = Column(
        Integer,
        ForeignKey("users.user_id")
    )
    #foreign key
    document_type_id = Column(
        Integer,
        ForeignKey("document_types.document_type_id"),
        nullable=False
    )

    



