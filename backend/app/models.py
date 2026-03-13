#here need to create the tables which are present in the database using sqlalchemy(orm mapper)

from sqlalchemy import Column, Integer, String
from .database import base

class Users(base):
    __tablename__ = 'Users'

    user_id = Column(Integer, primary_key=True,index=True )
    first_name = Column(String(10), nullable=False)
    last_name = Column(String(10), nullable=True)
    email = Column(String(30), unique = True, nullable=False)
    password = Column(String(20), nullable=False)


class Admins(base):
    __tablename__ = 'Admins'

    admin_id = Column(Integer, primary_key=True,index=True )
    first_name = Column(String(10), nullable=False)
    last_name = Column(String(10), nullable=True)
    email = Column(String(30), unique = True, nullable=False)
    password = Column(String(20), nullable=False)






