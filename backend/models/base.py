#!/usr/bin/python3
import uuid
from datetime import datetime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, String, DateTime
from models.engine import storage
Base = declarative_base()

class BaseModel(Base):
    '''The baseModel class'''
    __tablename__ = 'base_model'

    id = Column(String(60), primary_key=True, nullable=False, default=lambda: str(uuid.uuid4()))
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow)
    updated_at = Column(DateTime, nullable=False, default=datetime.utcnow)

    def __init__(self, *args, **kwargs):
        """Initializes the base model"""
        super().__init__(*args, **kwargs)
        if 'id' not in kwargs:
            self.id = str(uuid.uuid4())
        if 'created_at' not in kwargs:
            self.created_at = datetime.utcnow()
        if 'updated_at' not in kwargs:
            self.updated_at = datetime.utcnow()

    def save(self):
        """Updates updated_at and saves the model"""
        self.updated_at = datetime.utcnow()
        storage.new(self)
        storage.save()


