from fastapi import HTTPException, APIRouter


router = APIRouter()

@router.get('/')
def sample():
    pass