import AppBar from '../components/AppBar'
import React, { useEffect } from 'react'
import axios from 'axios';
import { useState } from 'react';


const Cart = () => {
  const apiurl = import.meta.env.VITE_BACKEND_URL;
  const user_id = localStorage.getItem('user_id')
  const [cartId, setCartId] = useState(null);
  const [items, setItems] = useState([])
  useEffect(() => {
    const fetchcart = async () => {
      let cart_details
      let cart_id
      try {
        cart_details = await axios.post(`${apiurl}/carts/cart/${user_id}`)
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
          const res = await axios.get(`${apiurl}/carts/cart_items/${cart_id}`);
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
  return (
    <>
    <AppBar />
    <div className='header d-flex flex-row justify-content-center mt-2'>
          <h3 className='mb-2'>Cart Items</h3>
          
      </div>
    <div className="container mt-4">
          <table className="table table-bordered table-hover align-middle text-center">

            <thead className="table-dark">
              <tr>
                <th>Item</th>
                <th>Item Name</th>
                <th>Price</th>
                <th>Quantity</th>
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

                    <td>
                      <div className="d-flex justify-content-center gap-2">

                        <button
                          className="btn btn-warning btn-sm"
                          onClick={() =>
                            navigate()
                          }
                        >
                          Edit
                        </button>

                        <button
                          className="btn btn-danger btn-sm"
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