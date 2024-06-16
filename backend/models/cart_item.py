from models.base import BaseModel, Base
from sqlalchemy import Column, Integer, ForeignKey
# from models.user import User
# from models.product import Product

class CartItem(BaseModel, Base):
    __tablename__ = 'cart_items'

    user_id = Column(ForeignKey('users.id'), nullable=False)
    product_id = Column(ForeignKey('products.id'), nullable=False)
    quantity = Column(Integer, nullable=False)
    
    def __init__(self, *args, **kwargs):
        """initializes CartItem"""
        super().__init__(*args, **kwargs)
