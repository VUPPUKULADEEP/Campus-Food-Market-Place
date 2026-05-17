from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from app.router.auth import decode_token


oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl= '/users/login'
)

def get_current_user(
    token : str = Depends(oauth2_scheme)
):
    payload = decode_token(token)
    print(payload)
    if payload is None:
        raise HTTPException(status_code=401, detail='invalid or expired token')
    
    if payload.get('type') != 'access':
        raise HTTPException(status_code=401, detail="Access token required")
    
    print(payload)
    return payload
