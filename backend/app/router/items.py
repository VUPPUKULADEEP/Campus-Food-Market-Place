from fastapi import HTTPException, APIRouter
from app.database import get_db
from fastapi import Depends
from sqlalchemy.orm import Session
from app.schemas import ItemsCreate, ItemResponse, ItemUpdate
from app.models import Items

router = APIRouter()


@router.post('/create', response_model=ItemResponse)
def create_user( item:ItemsCreate,db: Session = Depends(get_db)):
    try:
        item = Items(**item.dict())
        db.add(item)
        db.commit()
        db.refresh(item)
    except Exception as e:
        raise HTTPException(status_code=400,detail="400 server code")
    else:
        return item

@router.get('/get_all', response_model=list[ItemResponse])
def get_items(db: Session = Depends(get_db)):
    items = db.query(Items).all()
    return items

@router.get('/admin/{admin_id}', response_model = list[ItemResponse])
def admin_item_by_id(admin_id : int, db:Session = Depends(get_db)):
    items = db.query(Items).filter(Items.admin_id == admin_id).all()
    return items

@router.get('/item/{item_id}', response_model = ItemResponse)
def item_by_id(item_id : int, db: Session = Depends(get_db)):
    item = db.query(Items).filter(Items.item_id == item_id).first()
    return item

@router.put('/item/{item_id}' , response_model= ItemResponse)
def put_item(update_item : ItemUpdate, item_id : int, db:Session = Depends(get_db)):
    item = db.query(Items).filter(Items.item_id == item_id).first()

    if not item:
        raise HTTPException(status_code=404, detail='item not found')

    item.item_name = update_item.item_name
    item.quantity = update_item.quantity
    item.price = update_item.price
    
    db.commit()
    db.refresh(item)

    return item

@router.delete('/item/{item_id}')
def delete_item(item_id : int, db: Session = Depends(get_db)):
    item = db.query(Items).filter(Items.item_id == item_id).first()

    if not item:
        raise HTTPException(status_code=404, detail='item not found')

    db.delete(item)
    db.commit()

    return {'message' : 'item deleted '}


