#!/usr/bin/python3
from models.base import BaseModel, Base
from sqlalchemy import Column, String
from sqlalchemy.types import DECIMAL

class Product(BaseModel,Base):
    __tablename__ = 'products'

    name = Column(String(100), nullable=False)
    description = Column(String(1000), nullable=False)
    owner = Column(String(100), nullable=False)
    total_price = Column(DECIMAL(10, 2), nullable=False)
    img_url = Column(String(1000), nullable=False)
