from sqlalchemy import Column, String, Integer, ForeignKey
from sqlalchemy.orm import relationship
from base import BaseModel
from usr import User
from product import Product
from sqlalchemy.types import DECIMAL

class Order(BaseModel):
    __tablename__ = 'orders'
    user_id = Column(Integer, ForeignKey('users.id'))
    product_id = Column(Integer, ForeignKey('products.id'))
    quantity = Column(Integer)
    order_status = Column(String(50))
    total_price = Column(DECIMAL(10, 2))
    address = Column(String(200))
    phone = Column(String(20))
    user = relationship(User, backref='orders')
    product = relationship(Product, backref='orders')
