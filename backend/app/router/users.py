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
    existing_user = db.query(Users).filter(
        (Users.reg_no == user.reg_no) |
        (Users.email == user.email) |
        (Users.mobile_no == user.mobile_no)
    ).first()

    if existing_user:
        raise HTTPException(status_code=400, detail="User already exists")
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
def get_users(db: Session = Depends(get_db)):
    users = db.query(Users).all()
    return users

@router.get('/by/{user_id}', response_model=UserResponse)
def get_user_by_id(user_id : int, db:Session = Depends(get_db)):
    user = db.query(Users).filter(Users.user_id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail='user not found')

    return user

@router.post('/login', response_model=UserResponse)
def login(user: Login, db:Session = Depends(get_db)):
    try:
        u = db.query(Users).filter(Users.reg_no == user.reg_no, Users.password == user.password).first()
        if not u:
            raise HTTPException(status_code=401, detail='wrong credintials')
        return u
    except HTTPException as e:
        raise HTTPException(status_code=401, detail='invalid user')
    except Exception as e:
        raise Exception({'message' : 'unknown exception'} )



@router.delete('/delete/user')
def delete_user(user_id : int, db:Session = Depends(get_db)):
    
    user = db.query(Users).filter(Users.user_id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail='user not found')
    db.delete(user)
    db.commit()
    return {'message' : 'deleted the user'}

    