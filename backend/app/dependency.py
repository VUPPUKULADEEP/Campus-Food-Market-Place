from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from app.router.auth import decode_token
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Users

oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl= '/users/login'
)

def get_current_user(
    token : str = Depends(oauth2_scheme),
    db : Session = Depends(get_db)
):
    payload = decode_token(token)
    if payload is None:
        raise HTTPException(status_code=401, detail='invalid or expired token')
    
    if payload.get('type') != 'access' or not payload.get("sub"):
        raise HTTPException(status_code=401, detail="Access token required")
    
    id = int(payload.get("sub"))
    
    user = db.query(Users).filter(Users.user_id == id).first()
    
    if not user:
        raise HTTPException(status_code=400, detail='user not found')
    
    return user
    
    
