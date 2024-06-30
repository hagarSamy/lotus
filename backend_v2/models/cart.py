from models.base import BaseModel, Base
from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship

class Cart(BaseModel, Base):
    __tablename__ = 'carts'
    user_id = Column(ForeignKey('users.id'), nullable=False)
    items = relationship('CartItem', backref='cart')

    def __init__(self, *args, **kwargs):
        """initializes Cart"""
        super().__init__(*args, **kwargs)
