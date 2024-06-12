#!/usr/bin/python3
import os
from sqlalchemy import create_engine, exc
from sqlalchemy.orm import sessionmaker, scoped_session
from models.base import Base
from models.user import User
from models.product import Product
from models.order import Order

classes = {"User": User, "Product": Product, "Order": Order}

class DBStorage:
    """Interacts with the MySQL database"""
    __engine = None
    __session = None

    def __init__(self):
        """Instantiate a DBStorage object"""
        LOTUS_MYSQL_USER = os.getenv('LOTUS_MYSQL_USER')
        LOTUS_MYSQL_PWD = os.getenv('LOTUS_MYSQL_PWD')
        LOTUS_MYSQL_HOST = os.getenv('LOTUS_MYSQL_HOST')
        OTUS_MYSQL_DB = os.getenv('LOTUS_MYSQL_DB')
        LOTUS_ENV = os.getenv('LOTUS_ENV')
        
        if not all([LOTUS_MYSQL_USER, LOTUS_MYSQL_PWD, LOTUS_MYSQL_HOST, OTUS_MYSQL_DB]):
            raise ValueError("Missing one or more database environment variables")

        self.__engine = create_engine(f'mysql+mysqldb://{LOTUS_MYSQL_USER}:{LOTUS_MYSQL_PWD}@{LOTUS_MYSQL_HOST}/{OTUS_MYSQL_DB}')
        
        # if env == "test":
        #     Base.metadata.drop_all(self.__engine)

    def all(self, cls=None):
        """Returns a dictionary of all objects, optionally filtered by class"""
        if cls:
            if cls in classes.values():
                return {obj.id: obj for obj in self.__session.query(cls).all()}
            else:
                return {}
        else:
            all_objects = {}
            for cls in classes.values():
                all_objects.update({obj.id: obj for obj in self.__session.query(cls).all()})
            return all_objects

    def get_one(self, cls, attribute, value):
        """Retrieve a model instance based on a specified attribute and its value."""
        return self.__session.query(cls).filter(getattr(cls, attribute) == value).first()

    def new(self, obj=None):
        """Adds a new object to the database session"""
        if obj:
            self.__session.add(obj)
            self.save()

    def save(self):
        """Commits all changes to the database"""
        try:
            self.__session.commit()
        except exc.SQLAlchemyError as e:
            self.__session.rollback()
            raise RuntimeError("Failed to commit to the database") from e

    def update(self, obj):
        """Updates an object in the database"""
        self.__session.add(obj)
        self.save()

    def delete(self, obj=None):
        """Deletes an object from the database"""
        if obj:
            self.__session.delete(obj)
            self.save()

    def reload(self):
        """Reloads data from the database"""
        Base.metadata.create_all(self.__engine)
        session_factory = sessionmaker(bind=self.__engine, expire_on_commit=False)
        self.__session = scoped_session(session_factory)

    def close(self):
        """Call remove() method on the private session attribute"""
        self.__session.remove()
