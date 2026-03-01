# write here the pydantic schemas which need to validate the apis and response to users

from pydantic import BaseModel,EmailStr


class UserCreate(BaseModel):
    first_name : str
    last_name : str
    email :EmailStr
    password : str


class UserResponse(BaseModel):
    user_id : int
    first_name : str
    last_name : str
    email :EmailStr
    password : str

    class Config:
        orm_mode = True