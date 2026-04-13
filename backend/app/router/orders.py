from fastapi import HTTPException, APIRouter
from app.database import get_db
from fastapi import Depends
from sqlalchemy.orm import Session
from app.schemas import OrderCreate, OrderSummary, OrderItem
from app.models import Users, OrderDetails, Orders, Cart, CartItems


router = APIRouter()

@router.get('/')
def sample():
    return {'message' : 'helloworld'}


@router.post('/order/create')
def create_order(order : OrderCreate, db : Session = Depends(get_db)):
    cart = db.query(Cart).filter(Cart.cart_id == order.cart_id).first()
    if not cart:
        raise HTTPException(status_code=404, detail='cart not found')

    cart_items = db.query(CartItems).filter(CartItems.cart_id == order.cart_id).all()
    if not cart_items:
        raise HTTPException(status_code=404, detail='cart has no items')
    
    total= 0
    for cart_item in cart_items:
        total += cart_item.quantity * cart_item.item.price
    
    new_order = Orders(
        user_id = cart.user_id,
        total_amount = total 
    )
    db.add(new_order)
    db.commit()
    db.refresh(new_order)

    for cart_item in cart_items:
        order_detail = OrderDetails(
            order_id = new_order.order_id,
            item_id = cart_item.item_id,
            quantity = cart_item.quantity,
            price = cart_item.item.price
        )
        db.add(order_detail)
    
    db.commit()

    for cart_item in cart_items:
        db.delete(cart_item)
    
    db.commit()

    return {
        'message' : 'order created',
        'order_id' : new_order.order_id
    }


@router.get('/summary/{order_id}', response_model=OrderSummary)
def order_details(order_id : int, db : Session = Depends(get_db)):
    order = db.query(Orders).filter(Orders.order_id == order_id).first()
    
    if not order:
        raise HTTPException(status_code=404, detail='no order found')

    order_details = db.query(OrderDetails).filter(Orders.order_id == order_id).all()

    if not order_details:
        raise HTTPException(status_code=404, detail='no order details found')

    items = []

    for i in order_details:
        item_data = {
            'item_name' : i.item.item_name,
            'quantity' : i.quantity,
            'price' : i.price,
            'total' : i.quantity * i.price
        }
        items.append(item_data)

    return {
        'order_id' : order.order_id,
        'status' : order.status,
        'time_stamp' : order.time_stamp,
        'items' : items,
        'total_amount' : order.total_amount
    }


