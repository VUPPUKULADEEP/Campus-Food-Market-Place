import React, { use } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import AppBar from '../components/AppBar'
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

const SingleOrder = () => {
    const { id } = useParams()
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
  return (
<>
  <AppBar />

  <div className="container mt-4">

    {order && (
      <>
        <div className="d-flex justify-content-between align-items-center mb-4">

          <div>
            <h3>
              Order #{order.order_id}
            </h3>

            <p className="mb-1 text-muted">
              {new Date(order.time_stamp).toLocaleString()}
            </p>
          </div>

          <div className="text-end">

            <h5 className="text-success">
              ₹ {order.total_amount}
            </h5>

            <span className="badge bg-success">
              {order.status}
            </span>

          </div>

        </div>


        
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
                  ₹ {item.price * item.quantity}
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

export default SingleOrder