import uuid
from datetime import datetime
import models


class BaseModel:
    '''The baseModel class'''


    def __init__(self, *args, **kwargs):
        '''Initiation of the base class'''

        if not kwargs:
            self.id = str(uuid.uuid4())
            self.created_at = datetime.now()
            self.updated_at = datetime.now()
            models.storage.new(self)
        else:
            for k, v in kwargs.items():
                if k in ["created_at", "updated_at"]:
                    setattr(self, k, datetime.fromisoformat(v))
                elif k != "__class__":
                    setattr(self, k, v)

    def __str__(self):
        """String representation of the BaseModel class"""
        return f"[{self.__class__.__name__}] ({self.id}) {self.__dict__}"

    def save(self):
        """Use to update time for updated_at attribute"""
        self.updated_at = datetime.now()
        models.storage.save()

    def to_dict(self):
        """Return a dict representation"""
        dict_obj = self.__dict__.copy()
        dict_obj['__class__'] = self.__class__.__name__
        dict_obj['updated_at'] = self.updated_at.isoformat()
        dict_obj['created_at'] = self.created_at.isoformat()
        return dict_obj 