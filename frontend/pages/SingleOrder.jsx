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
    <AppBar/>
    <div className='container mt-4'>
        {order && (
            <div className='card p-4'>
                <h4>Order Id: {order.order_id}</h4>
                <p>Total Amount: ₹ {order.total_amount}</p>
                <p>Status: {order.status}</p>
                <p>Order Date: {new Date(order.time_stamp).toLocaleDateString()}</p>
                {order.items.map((item) => (
                    <div key={item.item_id} className='border p-2 mb-2'>
                        <h5>{item.item_name}</h5>
                        <p>Price: ₹ {item.price}</p>
                        <p>Quantity: {item.quantity}</p>
                        <p>Subtotal: ₹ {item.price * item.quantity} </p>
                    </div>
                ))}
            </div>  
        )}
    </div>
    </>
  )
}

export default SingleOrder