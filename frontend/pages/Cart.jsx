import AppBar from '../components/AppBar'
import React, { useEffect } from 'react'
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import api from '../src/api/api'

const Cart = () => {
  const navigate = useNavigate();
  const apiurl = import.meta.env.VITE_BACKEND_URL;
  const [cartId, setCartId] = useState(null);
  const [items, setItems] = useState([])
  useEffect(() => {
    const fetchcart = async () => {
      let cart_details
      let cart_id
      try {
        cart_details = await api.post(`/carts/cart/by/user`)
        console.log(cart_details.data)
        cart_id = cart_details.data.cart_id
        setCartId(cart_id)
        console.log(cartId)
      }
      catch (error) {
        console.log(error)
      }
      console.log(cartId)
      try {
        if (cart_id) {
          const res = await api.get(`/carts/cart_items/${cart_id}`);
          console.log(res.data)
          setItems(res.data)
        }
      }
      catch (error) {
        console.log(error)
        alert('same restaurent items allowed to add')
      }
    }
    fetchcart();
  }, [])
  const deleteitem = async (item_id) => {
    try {
      const res = await api.delete(`/carts/cart/${cartId}/item/${item_id}`);
      console.log(res.data.message)
      alert(res.data.message)
      setItems(items.filter((item) => item.item_id !== item_id))
    }
    catch (error) {
      console.log(error)
    }
  }
  const checkout = async () => {
    let response;
    try{
      response = await api.post(`/orders/order/create`,{
        "cart_id": cartId,
      })
      console.log(response.data)
      alert('order placed successfully')
      navigate(`/order/${response.data.order_id}`)
      
    }
    catch(error){
      console.log(error)
      alert('failed to place order')
    }
  }

  const clearcart = async () => {
    try {
      const res = await axios.delete(`${apiurl}/carts/cart/${cartId}`);
      console.log(res.data)
      setItems([])
    }
    catch (error) {
      console.log(error)
    }
  }
  return (
    <>
    <AppBar />
    <div className='header d-flex flex-row justify-content-between mt-2'>
          <h3 className='mb-2'>Cart Items</h3>
          <div>
          <button className='btn btn-danger m-2' onClick={() => {clearcart()}}>Clear Cart</button>
          <button className='btn btn-success' onClick={() => {checkout()}}>Checkout</button>
          </div>
      </div>
    <div className="container mt-4">
          <table className="table table-bordered table-hover align-middle text-center">

            <thead className="table-dark">
              <tr>
                <th>Item</th>
                <th>Item Name</th>
                <th>Unit Price </th>
                <th>Quantity</th>
                <th>Total Price</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {items.length > 0 ? (
                items.map((item) => (
                  <tr key={item.id}>

                    <td>
                      <img
                        src={`http://localhost:8000/${item.item.image_url}`}
                        alt={item.item.item_name}
                        style={{
                          width: "70px",
                          height: "70px",
                          objectFit: "cover",
                          borderRadius: "8px"
                        }}
                      />
                    </td>

                    <td>{item.item.item_name}</td>

                    <td>₹ {item.item.price}</td>

                    <td>{item.quantity}</td>

                    <td>₹ {item.quantity * item.item.price}</td>

                    <td>
                      <div className="d-flex justify-content-center gap-2">

                        <button
                          className="btn btn-warning btn-sm"
                          onClick={() =>
                            navigate(`/single/${item.item_id}`)
                          }
                        >
                          Edit
                        </button>

                        <button
                          className="btn btn-danger btn-sm"
                          onClick = {() => {deleteitem(item.item_id)}}
                        >
                          Delete
                        </button>

                      </div>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    No items found
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>
    </>
  )
}

export default Cart