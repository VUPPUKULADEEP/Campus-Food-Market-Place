import React, { useEffect } from 'react'
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import AppBar from '../components/AppBar'
import api from '../src/api/api'

const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([])
  useEffect(()=>{
    const fetchorders = async () => {
      try{
        const res = await api.get(`/orders/user/`);
        console.log(res.data)
        setOrders(res.data)
      }
      catch(error){
        console.log(error)
      }
    }
    fetchorders();  
  }, [])
  return (
    <>
      <div className='header d-flex flex-row justify-content-Centermt-2'>
          <h3 className='mb-2'>Orders</h3>
          {/* <div>
          <button className='btn btn-danger m-2' onClick={() => {clearcart()}}>Clear Cart</button>
          <button className='btn btn-success' onClick={() => {checkout()}}>Checkout</button>
          </div> */}
      </div>
    <div className="container mt-4">
          <table className="table table-bordered table-hover align-middle text-center">

            <thead className="table-dark">
              <tr>
                <th></th>
                <th>Order Id</th>
                <th>Total Price</th>
                <th>Status</th>
                <th>Order Date
                  <br/>
                  (MM/DD/YYYY)
                </th>
              </tr>
            </thead>

            <tbody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr className='cursor-pointer' key={order.order_id} onClick={()=>{navigate(`/order/${order.order_id}`)}}>

                    <td>
                      <img
                        src={`../src/assets/order.png`}
                        alt={'not found'}
                        style={{
                          width: "70px",
                          height: "70px",
                          objectFit: "cover",
                          borderRadius: "8px"
                        }}
                      />
                    </td>

                    <td>{order.order_id}</td>

                    <td>₹ {order.total_amount}</td>

                    <td>{order.status}</td>

                    <td>{new Date(order.time_stamp).toLocaleDateString()}</td>

                    

                    {/* <td>
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
                    </td> */}

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>
    </>
  )
}

export default Orders