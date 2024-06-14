from models.base import BaseModel, Base
from sqlalchemy import Column, String, Boolean
from werkzeug.security import generate_password_hash, check_password_hash


class User(BaseModel, Base):
    __tablename__ = 'users'

    username = Column(String(50))
    password_hash = Column(String(50))
    email = Column(String(50))
    is_active = Column(Boolean, default=False)
    is_admin = Column(Boolean, default=False)

    def self_password(self, password):
        """To encrypt the password before storing it in the database"""
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        """Verify the entered password using the stored encrypted password."""
        return check_password_hash(self.password_hash, password)
