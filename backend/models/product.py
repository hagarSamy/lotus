from base import BaseModel
from sqlalchemy import Column, DateTime, Integer, String
from sqlalchemy.types import DECIMAL
class Product(BaseModel):
    __tablename__ = 'products'

    name = Column(String(100))
    description = Column(String(1000))
    owner = Column(String(100))
    total_price = Column(DECIMAL(10, 2))
    img_url = Column(String(1000))