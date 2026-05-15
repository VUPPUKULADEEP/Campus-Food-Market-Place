from datetime import timedelta, datetime, timezone
from fastapi import HTTPException, APIRouter
from typing import Annotated
from zoneinfo import ZoneInfo
import jwt
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jwt.exceptions import InvalidTokenError
from pwdlib import PasswordHash
from app.schemas import RefreshTokenRequest
import logging

router = APIRouter()

SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
IST = ZoneInfo("Asia/Kolkata")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

password_hash = PasswordHash.recommended()

def change_to_hash(password):
    return password_hash.hash(password)

def verify_password(password, hashed_password):
    return password_hash.verify(password, hashed_password)


def create_token(user_data: dict, token_type : str, expiry: timedelta = timedelta(minutes = ACCESS_TOKEN_EXPIRE_MINUTES)):
    payload = user_data.copy()
    payload.update({
        'exp' : datetime.now(timezone.utc) + expiry,
        'type' : token_type
    })
    token = jwt.encode(
        payload= payload,
        key= SECRET_KEY,
        algorithm=ALGORITHM,

    )
    return token

def decode_token(token: str) -> dict:
    try:
        print(token)
        token_data = jwt.decode(
        jwt=token,
        key=SECRET_KEY,
        algorithms=[ALGORITHM]
        )
        print(token_data)
        return token_data
    except jwt.PyJWTError as e:
        print('jwt error',e)
        return None


@router.post('/refresh')
def resend_access_token(data : RefreshTokenRequest):
    payload = decode_token(data.refresh_token)
    if payload and payload.get('type') != 'refresh':
        raise HTTPException(status_code=401, detail='invalid refresh token')

    new_access_token = create_token(
        user_data={
            'sub': payload.get('sub'),
            'reg_no' : payload.get('reg_no'),
            'role' : payload.get('role')
        },
        token_type= 'access'
    )
    return {
        'access_token' : new_access_token,
        'type': 'bearer'
    }
