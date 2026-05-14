from fastapi import FastAPI, HTTPException, APIRouter
from app.database import get_db
from fastapi import Depends
from sqlalchemy.orm import Session
from app.models import Users
from app.schemas import UserCreate,UserResponse,Login
from app.router.auth import change_to_hash, verify_password

router = APIRouter()


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
        hashed_password = change_to_hash(user.password)
        user = Users(
            first_name = user.first_name,
            reg_no = user.reg_no,
            email = user.email,
            mobile_no = user.mobile_no,
            password = hashed_password,
            )
        db.add(user)
        db.commit()
        db.refresh(user)
    except Exception as e:
        raise HTTPException(status_code=400,detail="something wrong in creation")
    
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
        u = db.query(Users).filter(Users.reg_no == user.reg_no).first()
        if not u:
            raise HTTPException(status_code=401, detail='wrong credintials')
        if not verify_password( user.password, u.password):
            raise HTTPException(status_code=400, detail='password wrong')
        return u
    except HTTPException as e:
        raise HTTPException(status_code=401, detail='invalid user')
    except Exception as e:
        print(e)
        raise Exception({'message' : 'unknown exception'} )



@router.delete('/delete/user')
def delete_user(user_id : int, db:Session = Depends(get_db)):
    
    user = db.query(Users).filter(Users.user_id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail='user not found')
    db.delete(user)
    db.commit()
    return {'message' : 'deleted the user'}

    