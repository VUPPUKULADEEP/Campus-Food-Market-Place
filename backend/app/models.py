#here need to create the tables which are present in the database using sqlalchemy(orm mapper)

from sqlalchemy import Column, Integer, String
from .database import base

class Users(base):
    __tablename__ = 'Users'

    user_id = Column(Integer, primary_key=True,index=True )
    email = Column(String(30), unique = True, nullable=False)




