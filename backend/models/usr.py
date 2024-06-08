from base import BaseModel
from sqlalchemy import Column, DateTime, Integer, String
from werkzeug.security import generate_password_hash, check_password_hash
class User(BaseModel):
    __tablename__ = 'users'

    username = Column(String(50))
    password_hash = Column(String(128))
    email = Column(String(50))

    def __init__(self, **kwargs):
        """Perform encryption when creating a new user"""
        super().__init__(**kwargs)
        if 'password' in kwargs:
            self.set_password(kwargs['password'])

    def self_password(self, password):
        """To encrypt the password before storing it in the database"""
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        """Verify the entered password using the stored encrypted password."""
        return check_password_hash(self.password_hash, password)
