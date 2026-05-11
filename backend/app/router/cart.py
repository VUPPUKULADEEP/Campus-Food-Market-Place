from fastapi import HTTPException, APIRouter
from app.database import get_db
from fastapi import Depends
from sqlalchemy.orm import Session
from app.models import Cart, CartItems, Items
from app.schemas import CartAddItem, CartResponse

router = APIRouter()

@router.post('/cart/{user_id}')
def create_cart(user_id : int, db : Session = Depends(get_db)):
    cart = db.query(Cart).filter(Cart.user_id == user_id).first()

    if cart : 
        return cart
    
    new_cart = Cart(user_id = user_id)
    db.add(new_cart)
    db.commit()
    db.refresh(new_cart)

    return new_cart


@router.post('/cart/add/item', response_model=CartResponse)
def add_item( item : CartAddItem, db: Session = Depends(get_db)):
    # if previously existing item then update quantity
    existing_cart_item = db.query(CartItems).filter(CartItems.cart_id == item.cart_id , CartItems.item_id == item.item_id ).first()
    if existing_cart_item :
        existing_cart_item.quantity = item.quantity
        db.commit()
        db.refresh(existing_cart_item)
        return existing_cart_item

    # present item
    present_item = db.query(Items).filter(Items.item_id == item.item_id).first()
    if not present_item:
        raise HTTPException(status_code=400, detail='item not exists')
    present_admin = present_item.admin_id
    cart_item = db.query(CartItems).filter(CartItems.cart_id == item.cart_id , CartItems.item_id == item.item_id).first()

    if cart_item:
        if cart_item.item.admin_id == present_admin:
            return cart_item
        else:
            raise HTTPException(status_code=400, detail='item belongs to other restaurant')
    

    first_one = db.query(CartItems).filter(CartItems.cart_id == item.cart_id).first()

    if not first_one:
        cart_item = CartItems(
            cart_id = item.cart_id,
            item_id = item.item_id,
            quantity = item.quantity
        )
        db.add(cart_item)
        db.commit()
        db.refresh(cart_item)
        return cart_item

    
    if first_one.item.admin_id != present_admin:
        raise HTTPException(status_code=400, detail='admin must be same')
    
    
    cart_item = CartItems(
            cart_id = item.cart_id,
            item_id = item.item_id,
            quantity = item.quantity
    )
    db.add(cart_item)
    db.commit()
    db.refresh(cart_item)
    return cart_item

@router.get('/cart_items/{cart_id}', response_model=list[CartResponse])
def cart_items(cart_id : int, db: Session = Depends(get_db)):
    cart_items = db.query(CartItems).filter(CartItems.cart_id == cart_id).all()
    if not cart_items:
        return []
    return cart_items

@router.patch('/cart/{cart_id}/item/{item_id}' , response_model=CartResponse)
def update_quantity(cart_id : int, item_id : int , quantity : int, db: Session = Depends(get_db)): 
    cart_item = db.query(CartItems).filter(CartItems.cart_id == cart_id, CartItems.item_id == item_id).first()

    if not cart_item:
        raise HTTPException(status_code=404, detail='item not found')

    cart_item.quantity = quantity

    db.commit()
    db.refresh(cart_item)

    return cart_item


@router.delete('/cart/{cart_id}/item/{item_id}')
def delete_cart(cart_id : int, item_id : int, db:Session = Depends(get_db)):
    cart_item = db.query(CartItems).filter(CartItems.cart_id == cart_id, CartItems.item_id == item_id).first()
    if not cart_item:
        return HTTPException(status_code=404, detail='may be cart or item in cart not exists')
    db.delete(cart_item)
    db.commit()
    return {'message' : 'item removed from cart'}

@router.delete('/cart/{cart_id}')
def delete_cart(cart_id : int, db:Session = Depends(get_db)):
    cart = db.query(Cart).filter(Cart.cart_id == cart_id).first()
    if not cart:
        return HTTPException(status_code=404, detail='cart not found')
    db.delete(cart)
    db.commit()
    return {'message' : 'cart deleted'}




