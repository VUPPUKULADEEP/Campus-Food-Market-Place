from fastapi import HTTPException, APIRouter
from app.database import get_db
from fastapi import Depends
from sqlalchemy.orm import Session
from app.models import Cart, CartItems
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
    cart_item = db.query(CartItems).filter(CartItems.cart_id == item.cart_id , CartItems.item_id == item.item_id).first()

    if cart_item:
            return cart_item
    else:
        cart_item = CartItems(
            cart_id = item.cart_id,
            item_id = item.item_id,
            quantity = item.quantity
        )
        db.add(cart_item)
    db.commit()
    db.refresh(cart_item)
    return cart_item

@router.get('/cart_items/{cart_id}')
def cart_items(cart_id : int, db: Session = Depends(get_db)):
    cart_items = db.query(CartItems).filter(CartItems.cart_id == cart_id).all()
    if not cart_items:
        return {'message' : 'no cart items'}
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




