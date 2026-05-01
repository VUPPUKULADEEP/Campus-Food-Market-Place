# write here the pydantic schemas which need to validate the apis and response to users

from pydantic import BaseModel,EmailStr
from typing import Optional, List
from datetime import datetime


class UserCreate(BaseModel):
    first_name : str
    reg_no : str
    mobile_no : str
    email :EmailStr
    password : str


class UserResponse(BaseModel):
    user_id : int
    first_name : str
    reg_no : str
    mobile_no : str
    email :EmailStr
    password : str

    model_config = {
        'from_attributes': True
    }


class Login(BaseModel):
    reg_no : str
    password : str

class AdminLogin(BaseModel):
    email : EmailStr
    password : str



class AdminCreate(BaseModel):
    first_name : str
    last_name : str
    email :EmailStr
    mobile_no: str
    password : str


class AdminResponse(BaseModel):
    admin_id : int
    first_name : str
    last_name : str
    email :EmailStr
    mobile_no : str
    password : str
    is_open : bool

    model_config = {
        'from_attributes': True
    }


class ItemsCreate(BaseModel):
    item_name : str
    quantity : int
    admin_id : int
    price : int

    model_config = {
        'from_attributes': True
    }

class ItemResponse(BaseModel):
    item_id : int
    item_name : str
    quantity : int
    price : int
    image_url : Optional[str]
    admin : AdminResponse

    model_config = {
        'from_attributes': True
    }

class ItemUpdate(BaseModel):
    item_name : str
    quantity : int
    price : int

    model_config = {
        'from_attributes' : True
    }


class CartAddItem(BaseModel):
    cart_id : int
    item_id : int
    quantity : int

    model_config = {
        'from_attributes' : True
    }

class CartResponse(BaseModel):
    item_id : int
    quantity : int
    cart_id : int
    model_config = {
        'from_attributes' : True
    }


class OrderCreate(BaseModel):
    user_id : int
    cart_id : int


    model_config = {
        'from_attributes' : True
    }

class OrderItem(BaseModel):
    item_name :str
    quantity : int
    price : int
    total : int

    model_config = {
        'from_attributes' : True
    }

class OrderSummary(BaseModel):
    order_id : int
    status : str
    time_stamp : datetime
    items : List[OrderItem]
    total_amount : int
    admin_id : int

    model_config = {
        'from_attributes' : True
    }

class OrderList(BaseModel):
    user_id : int
    order_id : int
    status : str
    time_stamp : datetime
    total_amount : int
    admin_id : int
    
    model_config = {
        'from_attributes' : True
    }

class AdminOrderList(BaseModel):
    user_id : int
    order_id : int
    status : str
    time_stamp : datetime
    total_amount : int
    admin_id : int
    user : UserResponse
    
    model_config = {
        'from_attributes' : True
    }