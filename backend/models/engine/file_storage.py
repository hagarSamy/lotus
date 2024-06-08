# #!/usr/bin/python3
# """Contains the FileStorage class"""

# import os
# import json
# from models.base import BaseModel
# from models.usr import User
# from models.product import Product
# from models.order import Order

# classes = {"BaseModel": BaseModel, "User": User, "Product": Product, "Order": Order}

# class FileStorage:
#     """Serializes instances to a JSON file & deserializes back to instances"""

#     # string - path to the JSON file
#     __file_path = "file.json"
#     # dictionary - empty but will store all objects by <class name>.id
#     __objects = {}

#     def all(self, cls=None):
#         """Returns a dictionary of all objects, optionally filtered by class"""
#         if cls:
#             if cls in classes.values():
#                 return {key: obj for key, obj in self.__objects.items() if isinstance(obj, cls)}
#             else:
#                 return {}
#         else:
#             return self.__objects


#     def new(self, obj=None):
#         """Adds a new object to the storage dictionary"""
#         if obj:
#             self.__objects[f"{obj.__class__.__name__}.{obj.id}"] = obj

#     def save(self):
#         """serializes __objects to the JSON file (path: __file_path)"""
#         str_objects = {}
#         for k, v in self.__objects.items():
#             str_objects[k] = v.to_dict()
#             with open(self.__file_path, 'w')as file:
#                 json.dump(str_objects, file)

#     def update(self, obj):
#         """Updates an object in __objects"""
#         key = obj.__class__.__name__ + '.' + obj.id
#         if key in self.__objects:
#             self.__objects[key] = obj

#     def delete(self, obj=None):
#         """delete obj from __objects if it’s inside"""
#         if obj:
#             key = obj.__class__.__name__ + '.' + obj.id
#             if key in self.__objects:
#                 del self.__objects[key]

#     def reload(self):
#         """Deserializes the JSON file, if exists, to objects"""

#         if os.path.exists(self.__file_path):
#             with open(self.__file_path, 'r') as f:
#                 dict = json.load(f)
#                 for key, value in dict.items():
#                     obj_class = eval(value['__class__'])
#                     obj_instance = obj_class(**value)
#                     self.__objects[key] = obj_instance
