#here need to create the tables which are present in the database using sqlalchemy(orm mapper)

from sqlalchemy import Column, Integer, String, ForeignKey, Text, Boolean
from .database import base
from sqlalchemy.orm import relationship
from sqlalchemy import DateTime
from datetime import datetime


class Users(base):
    __tablename__ = 'users'

    user_id = Column(Integer, primary_key=True)
    first_name = Column(String(10), nullable=False)
    reg_no = Column(String(10), unique=True, nullable=False)
    email = Column(String(30), unique = True, nullable=False)
    password = Column(String(20), nullable=False)

    orders = relationship('Orders', back_populates='user')



class Admins(base):
    __tablename__ = 'admins'

    admin_id = Column(Integer, primary_key=True)
    first_name = Column(String(10), nullable=False)
    last_name = Column(String(10), nullable=True)
    email = Column(String(30), unique = True, nullable=False)
    password = Column(String(20), nullable=False)

    admin_orders = relationship('Orders', back_populates='admin')
    items = relationship("Items", back_populates='admin')


class Items(base):
    __tablename__ = 'items'

    item_id = Column(Integer, primary_key=True)
    item_name = Column(String(20), nullable= False)
    quantity = Column(Integer, default=0)
    admin_id = Column(Integer, ForeignKey("admins.admin_id"), index = True)
    price = Column(Integer, nullable=False)
    image_url = Column(Text, nullable=True)
    is_available = Column(Boolean, nullable=False, default=True)
    admin = relationship("Admins", back_populates='items')


class Cart(base):
    __tablename__ = 'cart'

    cart_id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.user_id"), index=True)

    cart_items = relationship("CartItems", back_populates="cart", cascade="all, delete")


class CartItems(base):
    __tablename__ = 'cart_items'

    id = Column(Integer, primary_key=True)
    cart_id = Column(Integer, ForeignKey("cart.cart_id"), index = True)
    item_id = Column(Integer, ForeignKey('items.item_id'))
    quantity = Column(Integer, default=1)

    cart = relationship("Cart", back_populates="cart_items")
    item = relationship('Items') # to make one way accessing

    

class Orders(base):
    __tablename__ = 'orders'

    order_id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.user_id"), index=True)
    total_amount = Column(Integer, nullable=False)
    status = Column(Text, default='placed', nullable=False)
    admin_id = Column(Integer, ForeignKey("admins.admin_id"), index=True)
    time_stamp = Column(DateTime, default=datetime.utcnow)

    admin = relationship("Admins", back_populates='admin_orders')
    user = relationship("Users", back_populates='orders')
    order_details = relationship("OrderDetails", back_populates='order', cascade="all, delete")


class OrderDetails(base):
    __tablename__ = 'order_details'

    id = Column(Integer, primary_key = True)
    order_id = Column(Integer, ForeignKey("orders.order_id"), index=True)
    item_id = Column(Integer, ForeignKey("items.item_id"), index=True)
    quantity = Column(Integer, nullable=False)
    price = Column(Integer, nullable=False)

    item = relationship('Items')
    order = relationship('Orders', back_populates='order_details')

