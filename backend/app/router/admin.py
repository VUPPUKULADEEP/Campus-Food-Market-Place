from fastapi import FastAPI, HTTPException, APIRouter
from app.database import get_db
from fastapi import Depends
from sqlalchemy.orm import Session
from app.models import Admins
from app.schemas import AdminCreate,AdminResponse,Login


router = APIRouter()


@router.post('/create', response_model=AdminResponse)
def create_admin( user:AdminCreate,db: Session = Depends(get_db)):
    try:
        admin = Admins(**user.dict())
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

@router.post('/login', response_model=AdminResponse)
def login(admin: Login, db:Session = Depends(get_db)):
    try:
        u = db.query(Admins).filter(Admins.email == admin.email, Admins.password == admin.password).first()
        if not u:
            raise HTTPException(status_code=401, detail='invalid admin')
        return u
    except HTTPException as e:
        raise HTTPException(status_code=401, detail='invalid admin')
    except Exception as e:
        return{'message' : 'unknown exception'} 
    