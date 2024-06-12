#!/usr/bin/python3
from sqlalchemy import Column, Integer, ForeignKey, String
from sqlalchemy.orm import relationship
from models.base import BaseModel, Base
from models.user import User
from models.product import Product
from sqlalchemy.types import DECIMAL

class Order(BaseModel, Base):
    __tablename__ = 'orders'
    
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    product_id = Column(Integer, ForeignKey('products.id'), nullable=False)
    quantity = Column(Integer, nullable=False)
    order_status = Column(String(50), nullable=False)
    total_price = Column(DECIMAL(10, 2), nullable=False)
    address = Column(String(200), nullable=False)
    phone = Column(String(20), nullable=False)
    
    user = relationship(User, backref='orders')
    product = relationship(Product, backref='orders')
