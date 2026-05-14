from fastapi import FastAPI, HTTPException, APIRouter
from app.database import get_db
from fastapi import Depends
from sqlalchemy.orm import Session
from app.models import Admins
from app.schemas import AdminLogin, AdminCreate,AdminResponse,Login
from app.router.auth import change_to_hash, verify_password


router = APIRouter()


@router.post('/create', response_model=AdminResponse)
def create_admin( user:AdminCreate,db: Session = Depends(get_db)):
    try:
        hashed_password = change_to_hash(user.password)
        admin = Admins(
            first_name = user.first_name,
            last_name = user.last_name,
            email = user.email,
            password = hashed_password,
            mobile_no = user.mobile_no
        )
        db.add(admin)
        db.commit()
        db.refresh(admin)
    except Exception as e:
        raise HTTPException(status_code=400,detail="admin already exists")
    else:
        return admin

@router.get('/get_all', response_model=list[AdminResponse])
def get_admins(db: Session = Depends(get_db)):
    admins = db.query(Admins).all()
    return admins

@router.get('/by/{admin_id}', response_model=AdminResponse)
def get_user_by_id(admin_id : int, db:Session = Depends(get_db)):
    admin = db.query(Admins).filter(Admins.admin_id == admin_id).first()
    if not admin:
        return HTTPException(status_code=404, detail='user not found')
    return admin

@router.post('/login', response_model=AdminResponse)
def login(admin: AdminLogin, db:Session = Depends(get_db)):
    try:
        u = db.query(Admins).filter(Admins.email == admin.email).first()
        if not u:
            raise HTTPException(status_code=401, detail='invalid admin')
        if not verify_password(admin.password, u.password):
            raise HTTPException(status_code=400, detail='password mismatch')
        
        return u
    except HTTPException as e:
        raise HTTPException(status_code=401, detail='invalid admin')
    except Exception as e:
        return{'message' : 'unknown exception'} 


@router.delete('/delete/admin')
def delete_user(admin_id : int, db:Session = Depends(get_db)):
    
    admin = db.query(Admins).filter(Admins.admin_id == admin_id).first()
    if not admin:
        raise HTTPException(status_code=404, detail='user not found')
    db.delete(admin)
    db.commit()
    return {'message' : 'deleted the admin'}