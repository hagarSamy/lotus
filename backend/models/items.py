#!/usr/bin/python3
from sqlalchemy import Column, Integer, ForeignKey, String
from sqlalchemy.orm import relationship
from models.base import BaseModel, Base
from sqlalchemy.types import  Float
# from models.order import Order
# from models.product import Product


class OrderItem(BaseModel, Base):
    __tablename__ = 'order_items'

    order_id = Column(ForeignKey('orders.id'), nullable=False)
    product_id = Column(ForeignKey('products.id'), nullable=False)
    quantity = Column(Integer, nullable=False)
    price = Column(Float, nullable=False)

    # order = relationship(Order, backref='items')
    # product = relationship(Product, backref='order_items')
