from fastapi import HTTPException, APIRouter
from app.database import get_db
from fastapi import Depends
from sqlalchemy.orm import Session
from app.schemas import OrderCreate, OrderSummary, OrderItem, OrderList, AdminOrderList, AdminOrderSimple, UpdateStatus
from app.models import Users, OrderDetails, Orders, Cart, CartItems
from app.dependency import get_current_user
from app.admin_dependency import get_current_admin
from zoneinfo import ZoneInfo
from datetime import datetime

router = APIRouter()
IST = ZoneInfo("Asia/Kolkata")

@router.get('/order/{order_id}',response_model= OrderList)
def get_order_by_id(order_id : int , db : Session = Depends(get_db)):
    order = db.query(Orders).filter(Orders.order_id == order_id).first()

    if not order:
        raise HTTPException(status_code=404, detail='order not found')

    return order

@router.get('/order/all/',response_model= list[OrderList])
def get_order_by_id( db : Session = Depends(get_db)):
    order = db.query(Orders).all()

    return order



@router.post('/order/create')
def create_order(order : OrderCreate,
                 user = Depends(get_current_user),
                 db : Session = Depends(get_db)):
    cart = db.query(Cart).filter(Cart.cart_id == order.cart_id).first()
    if not cart:
        raise HTTPException(status_code=404, detail='cart not found')

    cart_items = db.query(CartItems).filter(CartItems.cart_id == order.cart_id).all()
    if not cart_items:
        raise HTTPException(status_code=404, detail='cart has no items')
    
    cart_admin_id = cart_items[0].item.admin_id
    total= 0
    for cart_item in cart_items:
        total += cart_item.quantity * cart_item.item.price
    
    

    new_order = Orders(
        user_id = user.user_id,
        total_amount = total,
        admin_id = cart_admin_id,
        time_stamp = datetime.now(IST)
        
    )
    db.add(new_order)
    db.commit()
    db.refresh(new_order)

    for cart_item in cart_items:
        if cart_item.item.quantity < cart_item.quantity:
            raise HTTPException(status_code=400, detail=f'item {cart_item.item.item_name} is out of stock')
        cart_item.item.quantity -= cart_item.quantity
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
        'order_id' : new_order.order_id,
        'admin_id' : cart_admin_id
    }


@router.get('/summary/{order_id}', response_model=OrderSummary)
def order_details(order_id : int, db : Session = Depends(get_db)):
    order = db.query(Orders).filter(Orders.order_id == order_id).first()
    
    if not order:
        raise HTTPException(status_code=404, detail='no order found')

    order_details = db.query(OrderDetails).filter(OrderDetails.order_id == order_id).all()

    if not order_details:
        raise HTTPException(status_code=404, detail='no order details found')

    items = []

    for i in order_details:
        item_data = {
            'item_id' : i.item_id,
            'item_name' : i.item.item_name,
            'quantity' : i.quantity,
            'price' : i.price,
            'total' : i.quantity * i.price,
            'image_url' : i.item.image_url
        }
        items.append(item_data)

    return {
        'order_id' : order.order_id,
        'status' : order.status,
        'time_stamp' : order.time_stamp,
        'items' : items,
        'total_amount' : order.total_amount,
        'admin_id' : order.admin_id,
        'admin' : order.admin
    }


@router.get('/user/', response_model=list[OrderList])
def orders_by_user(
                   user = Depends(get_current_user),
                   db : Session = Depends(get_db)):
    orders = db.query(Orders).filter(Orders.user_id == user.user_id).all()

    return orders

@router.delete('/order/{order_id}/delete')
def delete_order(order_id : int,
                 user = Depends(get_current_user),
                 db : Session = Depends(get_db)):
    order = db.query(Orders).filter(Orders.order_id == order_id).first()

    if not order:
        raise HTTPException(status_code=404, detail='order not found')
    order_details = db.query(OrderDetails).filter(OrderDetails.order_id == order_id).all()
    for detail in order_details:
        detail.item.quantity += detail.quantity
    
    for detail in order_details:
        db.delete(detail)
    db.delete(order)
    db.commit()
    
    return {'message' : 'order deleted '}

@router.get('/admin/orders/' , response_model = list[AdminOrderSimple])
def orders_by_admin(
    admin = Depends(get_current_admin),
    db : Session = Depends(get_db)):
    orders = db.query(Orders).filter(Orders.admin_id == admin.admin_id).all()


    return orders



@router.get('/admin/order/details/{order_id}' , response_model = AdminOrderList)
def order_by_admin( order_id : int,
                   admin = Depends(get_current_admin),
                   db : Session = Depends(get_db)):
    order = db.query(Orders).filter(Orders.admin_id == admin.admin_id, Orders.order_id == order_id).first()
    order_details = db.query(OrderDetails).filter(OrderDetails.order_id == order_id).all()

    if not order_details:
        raise HTTPException(status_code=404, detail='no order details found')

    items = []

    for i in order_details:
        item_data = {
            'item_id' : i.item_id,
            'item_name' : i.item.item_name,
            'quantity' : i.quantity,
            'price' : i.price,
            'total' : i.quantity * i.price,
            'image_url' : i.item.image_url
        }
        items.append(item_data)

    return {
        'user_id' : order.user_id,
        'order_id' : order.order_id,
        'status' : order.status,
        'time_stamp' : order.time_stamp,
        'items' : items,
        'user': order.user,
        'total_amount' : order.total_amount,
        'admin_id' : order.admin_id
    }


@router.patch('/order/{order_id}/status')
def update_order_status(order_id : int, status : UpdateStatus,
                        admin = Depends(get_current_admin),
                        db : Session = Depends(get_db)):
    order = db.query(Orders).filter(Orders.order_id == order_id).first()

    if not order:
        raise HTTPException(status_code=404, detail='order not found')
    
    allowed_status = [
    'placed',
    'preparing',
    'out_for_delivery',
    'delivered',
    'cancelled']

    if status.status not in allowed_status:
        raise HTTPException(
        status_code=400,
        detail='invalid status'
       )
    order.status = status.status
    db.commit()
    db.refresh(order)

    return {
        'message' : 'order status updated',
        'order_id' : order.order_id,
        'status' : order.status
    }   