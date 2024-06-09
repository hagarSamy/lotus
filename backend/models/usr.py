#!/usr/bin/python3
from models.base import BaseModel
from sqlalchemy import Column, String
from werkzeug.security import generate_password_hash, check_password_hash

class User(BaseModel):
    __tablename__ = 'users'

    username = Column(String(50), nullable=False)
    password_hash = Column(String(128), nullable=False)
    email = Column(String(50), nullable=False)

    def __init__(self, **kwargs):
        """Perform encryption when creating a new user"""
        super().__init__(**kwargs)
        if 'password' in kwargs:
            self.set_password(kwargs['password'])

    def set_password(self, password):
        """To encrypt the password before storing it in the database"""
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        """Verify the entered password using the stored encrypted password."""
        return check_password_hash(self.password_hash, password)