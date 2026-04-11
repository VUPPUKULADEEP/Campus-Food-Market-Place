#here need to create the tables which are present in the database using sqlalchemy(orm mapper)

from sqlalchemy import Column, Integer, String, ForeignKey
from .database import base
from sqlalchemy.orm import relationship

class Users(base):
    __tablename__ = 'users'

    user_id = Column(Integer, primary_key=True,index=True )
    first_name = Column(String(10), nullable=False)
    last_name = Column(String(10), nullable=True)
    email = Column(String(30), unique = True, nullable=False)
    password = Column(String(20), nullable=False)



class Admins(base):
    __tablename__ = 'admins'

    admin_id = Column(Integer, primary_key=True,index=True )
    first_name = Column(String(10), nullable=False)
    last_name = Column(String(10), nullable=True)
    email = Column(String(30), unique = True, nullable=False)
    password = Column(String(20), nullable=False)

    items = relationship("Items", back_populates='admin')


class Items(base):
    __tablename__ = 'items'

    item_id = Column(Integer, primary_key=True, index=True)
    item_name = Column(String(20), nullable= False)
    quantity = Column(Integer, default=0)
    admin_id = Column(Integer, ForeignKey("admins.admin_id"))
    price = Column(Integer, nullable=False)

    admin = relationship("Admins", back_populates='items')


class Cart(base):
    __tablename__ = 'cart'

    cart_id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.user_id"))

    cart_items = relationship("CartItems", back_populates="cart", cascade="all, delete")


class CartItems(base):
    __tablename__ = 'cart_items'

    id = Column(Integer, primary_key=True, index=True)
    cart_id = Column(Integer, ForeignKey("cart.cart_id"))
    item_id = Column(Integer, ForeignKey('items.item_id'))
    quantity = Column(Integer, default=1)

    cart = relationship("Cart", back_populates="cart_items")
    item = relationship('Items') # to make one way accessing

    















