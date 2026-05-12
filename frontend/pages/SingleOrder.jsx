import React, { use } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import AppBar from '../components/AppBar'
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SingleOrder = () => {
    const { id } = useParams()
    const navigate = useNavigate();
    const [order, setOrder] = useState(null)
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/orders/summary/${id}`);
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

    const handleCancelOrder = async (order_id) => {
        try {
            await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/orders/order/${order_id}/delete`);
            alert('Order cancelled successfully');
            // Optionally, you can redirect the user to another page after cancellation
            navigate('/profile'); // Uncomment this line if you want to redirect to the profile page
            
        } catch (error) {
            alert('Failed to cancel order');
            console.log(error);
        }
    };

  return (
<>
  <AppBar />

  <div className="container mt-4">

    {order && (
      <>

        {/* Top Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">

          <div>
            <h3>
              Order #{order.order_id}
            </h3>

            <p className="mb-1 text-muted">
              {new Date(order.time_stamp).toLocaleString()}
            </p>
          </div>

          {/* <div className="text-end">

            <h5 className="text-success">
              ₹ {order.total_amount}
            </h5>

            <span className="badge bg-success">
              {order.status}
            </span>

          </div> */}

        </div>


        {/* Restaurant + Summary */}
        <div className="row mb-4">

          <div className="col-md-6">

            <h5 className="mb-3">
              Restaurant Details
            </h5>

            <p className="mb-1">
              <strong>Name:</strong>{" "}
              {order.admin.first_name}
            </p>

            <p className="mb-1">
              <strong>last name:</strong>{" "}
              {order.admin.last_name}
            </p>

            <p className="mb-1">
              <strong>Email:</strong>{" "}
              {order.admin.email}
            </p>

            <p className="mb-1">
              <strong>Mobile:</strong>{" "}
              {order.admin.mobile_no}
            </p>

          </div>


          <div className="col-md-6 text-md-end">

            <h5 className="mb-3">
              Order Summary
            </h5>

            <p className="mb-1">
              <strong>Total Items:</strong>{" "}
              {order.items.length}
            </p>

            <p className="mb-1">
              <strong>Status:</strong>{" "}

              <span className="badge bg-success">
                {order.status}
              </span>
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
              <th>Item</th>
              <th>Name</th>
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

  <div className='d-flex justify-content-center'>
  <button className='btn btn-danger' onClick={() =>{handleCancelOrder(order.order_id)}}>cancel order</button>
  <button className='btn btn-success ms-3' onClick={() => navigate(`/`)}>Go Home</button> 
  </div>
  </div>
</>
  )
}

export default SingleOrder