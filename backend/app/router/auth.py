from datetime import timedelta, datetime, timezone
from typing import Annotated
from zoneinfo import ZoneInfo
import jwt
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jwt.exceptions import InvalidTokenError
from pwdlib import PasswordHash
import logging


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
    payload = user_data
    payload.update({
        'exp' : datetime.now(IST) + expiry,
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
        token_data = jwt.decode(
        jwt=token,
        key=SECRET_KEY,
        algorithms=[ALGORITHM]
        )
        return token_data
    except jwt.PyJWTError as e:
        logging.exception(e)
        return None


    