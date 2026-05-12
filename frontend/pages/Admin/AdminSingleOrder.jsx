import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import AppBar from '../../components/AppBar'
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';


const AdminSingleOrder = () => {
const { id } = useParams()
    const [order, setOrder] = useState(null)
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/orders/admin/order/${localStorage.getItem('admin_id')}/${id}`);
                console.log(res.data)
                setOrder(res.data)
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
  <AppBar />

  <div className="container mt-4">

    {order && (

      <>

        {/* Top Section */}
        <div className="row mb-4">

          {/* Customer Details */}
          <div className="col-md-6">

            <h5 className="mb-3">
              Customer Details
            </h5>

            <p className="mb-1">
              <strong>Name:</strong> {order.user.first_name}
            </p>

            <p className="mb-1">
              <strong>Email:</strong> {order.user.email}
            </p>

            <p className="mb-1">
              <strong>Mobile:</strong> {order.user.mobile_no}
            </p>

            <p className="mb-1">
              <strong>Reg No:</strong> {order.user.reg_no}
            </p>

          </div>


          {/* Order Summary */}
          <div className="col-md-6 text-md-end">

            <h5 className="mb-3">
              Order Summary
            </h5>

            <p className="mb-1">
              <strong>Order ID:</strong> #{order.order_id}
            </p>

            <p className="mb-1">
              <strong>Status:</strong>

              <span className="badge bg-success ms-2">
                {order.status}
              </span>
            </p>

            <p className="mb-1">
              <strong>Date:</strong>{" "}
              {new Date(order.time_stamp).toLocaleString()}
            </p>

            <h4 className="text-success mt-3">
              ₹ {order.total_amount}
            </h4>

          </div>

        </div>


        {/* Items Table */}
        <table className="table table-hover align-middle text-center">

          <thead className="table-dark">

            <tr>
              <th>Image</th>
              <th>Item Name</th>
              <th>Unit Price</th>
              <th>Quantity</th>
              <th>Subtotal</th>
            </tr>

          </thead>

          <tbody>

            {order.items.map((item) => (

              <tr key={item.item_id}>

                <td>

                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL}/${item.image_url}`}
                    alt={item.item_name}
                    style={{
                      width: "80px",
                      height: "80px",
                      objectFit: "cover",
                      borderRadius: "8px"
                    }}
                  />

                </td>

                <td>
                  {item.item_name}
                </td>

                <td>
                  ₹ {item.price}
                </td>

                <td>
                  {item.quantity}
                </td>

                <td className="fw-bold text-success">
                  ₹ {item.total}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </>

    )}

  </div>

</>
  )
  
}

export default AdminSingleOrder