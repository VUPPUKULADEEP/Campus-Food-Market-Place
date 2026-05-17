from fastapi import FastAPI, HTTPException, APIRouter
from app.database import get_db
from fastapi import Depends
from sqlalchemy.orm import Session
from app.models import Users
from app.schemas import UserCreate,UserResponse,Login
from app.router.auth import change_to_hash, verify_password, create_token
from datetime import timedelta
from app.dependency import get_current_user
from fastapi.security import OAuth2PasswordRequestForm

router = APIRouter()


@router.post('/create', response_model=UserResponse)
def create_user( user:UserCreate,db: Session = Depends(get_db)):
    existing_user = db.query(Users).filter(
        (Users.username == user.username) |
        (Users.email == user.email) |
        (Users.mobile_no == user.mobile_no)
    ).first()

    if existing_user:
        raise HTTPException(status_code=400, detail="User already exists")
    try:
        hashed_password = change_to_hash(user.password)
        user = Users(
            first_name = user.first_name,
            username = user.username,
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

@router.get('/myprofile', response_model=UserResponse)
def myprofile(
    current_user = Depends(get_current_user),
    db : Session = Depends(get_db)
):
    return current_user

@router.post('/login')
def login(
    user: OAuth2PasswordRequestForm = Depends(),      
    db:Session = Depends(get_db)
):
    try:
        u = db.query(Users).filter(Users.username == user.username).first()
        if not u:
            raise HTTPException(status_code=401, detail='wrong credintials')
        if not verify_password( user.password, u.password):
            raise HTTPException(status_code=400, detail='password wrong')
        token = create_token({
            'sub': str(u.user_id),
            'username' : u.username,
            'role' : 'user'
        },
        token_type='access')
        refresh_token = create_token({
            'sub': str(u.user_id),
            'username' : u.username,
            'role' : 'user'
        },
        token_type='refresh',
        expiry= timedelta(days=1))
        return {
            'access_token' : token,
            'token_type' : 'bearer',
            'refresh_token' : refresh_token
        }
    
    except HTTPException as e:
        raise e
    except Exception as e:
        raise e



@router.delete('/delete/user')
def delete_user(user_id : int,
                user = Depends(get_current_user),
                db:Session = Depends(get_db)
):
    if not user:
        raise HTTPException(status_code=404, detail='no user found')
    db.delete(user)
    db.commit()
    return {'message' : 'deleted the user'}

    