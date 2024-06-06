from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, DateTime, Integer

Base = declarative_base()

class BaseModel(Base):
    """Abstract Base Class"""
    """An abstract attribute to define common rules for all data attributes"""
    __abstract__ = True
    id = Column(Integer, primary_key=True)
    created_at = Column(DateTime)
    updated_at = Column(DateTime)
