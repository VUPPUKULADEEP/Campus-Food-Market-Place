from fastapi import FastAPI
from .database import get_db,init_db
from fastapi import Depends
from sqlalchemy.orm import Session
from .models import Users


app = FastAPI(title='E-commerce')

init_db()

@app.get('/')
def sample():
    return {'message' : 'hello world'}

@app.post('/user')
def user(email: str, db: Session = Depends(get_db)):
    user = Users(email = email)
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

@app.get('/user')
def user(db: Session = Depends(get_db)):
    users = db.query(Users).all()
    return [{
        'userid' : user.user_id,
        'email' : user.email
     } for user in users]