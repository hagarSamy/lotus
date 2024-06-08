#!/usr/bin/python3
from os import getenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, scoped_session
from models.base import Base
from models.usr import User
from models.product import Product
from models.order import Order

classes = {"User": User, "Product": Product, "Order": Order}

class DBStorage:
    """Interacts with the MySQL database"""
    __engine = None
    __session = None

    def __init__(self):
        """Instantiate a DBStorage object"""
        mysql_user = getenv('LOTUS_MYSQL_USER')
        mysql_pwd = getenv('LOTUS_MYSQL_PWD')
        mysql_host = getenv('LOTUS_MYSQL_HOST')
        mysql_db = getenv('LOTUS_MYSQL_DB')
        env = getenv('LOTUS_ENV')
        
        self.__engine = create_engine(f'mysql+mysqldb://{mysql_user}:{mysql_pwd}@{mysql_host}/{mysql_db}')
        
        if env == "test":
            Base.metadata.drop_all(self.__engine)

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

    def get_one(self, cls, id):
        """Returns the object based on the class and id"""
        return self.__session.query(cls).filter_by(id=id).first()

    def new(self, obj=None):
        """Adds a new object to the database session"""
        if obj:
            self.__session.add(obj)
            self.save()

    def save(self):
        """Commits all changes to the database"""
        try:
            self.__session.commit()
        except:
            self.__session.rollback()
            raise

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

