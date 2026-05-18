import React, { useEffect } from 'react'
import AdminHeaderBar from '../../components/AdminHeader'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../src/api/api'

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const apiurl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await api.get(`${apiurl}/orders/admin/orders/`);
        console.log(res.data);
        setOrders(res.data);
      }
      catch (error) {
        alert('fail to fetch');
        console.log(error)
      }
    }
    fetchdata();
  }, [])
  return (

    <>
      {
        orders.length > 0 ? (

          <div className="container mt-4">

            <h3 className="mb-3">
              Orders
            </h3>

            <table className="table table-hover table-bordered align-middle text-center">

              <thead className="table-dark">

                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Email</th>
                  <th>Total Amount</th>
                  <th>Status</th>
                  <th>Time</th>
                </tr>

              </thead>

              <tbody>

                {
                  orders.map((order) => (

                    <tr key={order.order_id} className='cursor-pointer' onClick={() => { navigate(`/admin/order/${order.order_id}`) }}>

                      <td>
                        {order.order_id}
                      </td>

                      <td>
                        {order.user.first_name}
                      </td>

                      <td>
                        {order.user.email}
                      </td>

                      <td className="fw-bold text-success">
                        ₹ {order.total_amount}
                      </td>

                      <td>

                        <span className="badge bg-success">
                          {order.status}
                        </span>

                      </td>

                      <td>
                        {new Date(order.time_stamp).toLocaleString()}
                      </td>

                    </tr>

                  ))
                }

              </tbody>

            </table>

          </div>

        ) : (

          <div className="container mt-4">
            <h3>No orders found</h3>
          </div>

        )
      }
    </>
  )
}

export default AdminOrders