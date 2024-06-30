#!/usr/bin/python3
from models.engine.db_storage import DBStorage

# Create a singleton instance
storage = DBStorage()
storage.reload()
