from fastapi import FastAPI
from .database import get_db,init_db
from fastapi import Depends
from sqlalchemy.orm import Session
from .models import Users
from .schemas import UserCreate,UserResponse


app = FastAPI(title='E-commerce')

init_db()

@app.get('/')
def sample():
    return {'message' : 'hello world'}

@app.post('/user', response_model=UserResponse)
def create_user( user:UserCreate,db: Session = Depends(get_db)):
    user = Users(**user.dict())
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

@app.get('/user', response_model=list[UserResponse])
def get_user(db: Session = Depends(get_db)):
    users = db.query(Users).all()
    return users