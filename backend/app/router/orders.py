from fastapi import HTTPException, APIRouter
from app.database import get_db
from fastapi import Depends
from sqlalchemy.orm import Session

router = APIRouter()

@router.get('/')
def sample():
    return {'message' : 'helloworld'}


