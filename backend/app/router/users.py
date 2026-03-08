from fastapi import FastAPI, HTTPException, APIRouter
from app.database import get_db
from fastapi import Depends
from sqlalchemy.orm import Session
from app.models import Users
from app.schemas import UserCreate,UserResponse,Login


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

@router.post('/login', response_model=UserResponse)
def login(user: Login, db:Session = Depends(get_db)):
    try:
        u = db.query(Users).filter(Users.email == user.email, Users.password == user.password).first()
        if not u:
            raise HTTPException(status_code=401, detail='invalid user')
        return u
    except HTTPException as e:
        raise HTTPException(status_code=401, detail='invalid user')
    except Exception as e:
        return{'message' : 'unknown exception'} 



