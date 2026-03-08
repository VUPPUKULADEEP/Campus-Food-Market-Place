from fastapi import FastAPI, HTTPException, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from app.database import get_db,init_db
from fastapi import Depends
from sqlalchemy.orm import Session
from app.models import Users
from app.schemas import UserCreate,UserResponse


router = APIRouter()


@router.get('/')
def sample():
    return {'message' : 'hello world'}

@router.post('/create', response_model=UserResponse)
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

@router.get('/get_all', response_model=list[UserResponse])
def get_user(db: Session = Depends(get_db)):
    users = db.query(Users).all()
    return users