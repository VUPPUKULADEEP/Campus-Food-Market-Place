from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from .database import get_db,init_db
from fastapi import Depends
from sqlalchemy.orm import Session
from .models import Users
from .schemas import UserCreate,UserResponse


app = FastAPI(title='E-commerce')
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


init_db()

@app.get('/')
def sample():
    return {'message' : 'hello world'}

@app.post('/user', response_model=UserResponse)
def create_user( user:UserCreate,db: Session = Depends(get_db)):
    try:
        user = Users(**user.dict())
        db.add(user)
        db.commit()
        db.refresh(user)
    except Exception as e:
        raise HTTPException(status_code=400,detail="user already exists")
    else:
        return user

@app.get('/user', response_model=list[UserResponse])
def get_user(db: Session = Depends(get_db)):
    users = db.query(Users).all()
    return users