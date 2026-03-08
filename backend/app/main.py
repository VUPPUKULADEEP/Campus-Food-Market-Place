from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from .database import get_db,init_db
from fastapi import Depends
from sqlalchemy.orm import Session
from .models import Users
from .schemas import UserCreate,UserResponse
from app.router import users


app = FastAPI(title='E-commerce')
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


init_db()


app.include_router(users.router, prefix='/users', tags=["users"])