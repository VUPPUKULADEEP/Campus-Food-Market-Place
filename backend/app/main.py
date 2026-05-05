from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from .database import get_db,init_db
from fastapi import Depends
from sqlalchemy.orm import Session
from .models import Users
from .schemas import UserCreate,UserResponse
from app.router import users, orders, admin, items, cart
from fastapi.staticfiles import StaticFiles

app = FastAPI(title='Order Food')
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.mount("/images", StaticFiles(directory="images"), name="images")

init_db()


app.include_router(users.router, prefix='/users', tags=["users"])
app.include_router(orders.router, prefix='/orders', tags=["orders"])
app.include_router(admin.router, prefix='/admins', tags=['admin'])
app.include_router(cart.router, prefix='/carts', tags=['cart'])
app.include_router(items.router, prefix='/items', tags=['items'])

