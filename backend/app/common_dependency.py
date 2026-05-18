from fastapi import Header, HTTPException, Depends
from app.router.auth import decode_token
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Admins, Users


def authenticated_user(
    authorization : str = Header(None),
    db : Session = Depends(get_db)
):
    if not authorization:
        raise HTTPException(status_code=401, detail='token missing')

    try : 
        token = authorization.split(" ")[1]
    except:
        raise HTTPException(status_code=401, detail='invalid format')

    payload = decode_token(token)
    
    if payload is None:
        raise HTTPException(status_code=401, detail='invalid token')

    role = payload('role')
    
    if role == 'user':
        user = db.query(Users).filter(Users.user_id == int(payload.get("sub"))).first()
        return user
    elif role == 'admin':
        admin = db.query(Admins).filter(Admins.admin_id == int(payload.get('sub'))).first()
        return admin
    else:
        raise HTTPException(status_code=401, detail='not in a type of user')