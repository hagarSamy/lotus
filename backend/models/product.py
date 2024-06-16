#!/usr/bin/python3
from models.base import BaseModel, Base
from sqlalchemy import Column, String, Integer
from sqlalchemy.types import DECIMAL
from sqlalchemy.orm import relationship


class Product(BaseModel, Base):
    __tablename__ = 'products'

    name = Column(String(100), nullable=False)
    description = Column(String(1000), nullable=False)
    owner = Column(String(100), nullable=False)
    price = Column(DECIMAL(10, 2), nullable=False)
    img_url = Column(String(1000), nullable=False)
    # number of items available
    stock = Column(Integer, nullable=False)
    order_items = relationship('OrderItem', backref='product', cascade="all, delete, delete-orphan")
    cart_items = relationship('CartItem', backref='product', cascade="all, delete, delete-orphan")

    def __init__(self, *args, **kwargs):
        """initializes Product"""
        super().__init__(*args, **kwargs)
