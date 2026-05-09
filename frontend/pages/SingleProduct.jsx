import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import AppBar from '../components/AppBar'
import './singleproduct.css'
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useMemo } from 'react';

const SingleProduct = () => {
  const [cartId, setCartId] = useState(null);
  const apiurl = import.meta.env.VITE_BACKEND_URL;
  const { id } = useParams()
  const [desc, setDesc] = useState('')
  const [item, setItem] = useState(null)
  const [quantity, setQuantity] = useState(1)
  useEffect(() => {
    const fetchdata = async () => {
      let response;
      try {
        response = await axios.get(`${apiurl}/items/item/${id}`);
        console.log(response.data)
        setItem(response.data)
        setDesc(`${response.data.item_name} is freshly prepared by ${response.data.admin.first_name}. Currently ${response.data.quantity} items are available. Enjoy delicious taste with premium quality ingredients at just ₹${response.data.price}.`)
      }
      catch (error) {
        alert('fail to fetch');
        console.log(error)
      }
    }
    fetchdata();
  }, [])

  const addtocart = async () => {
    const user_id = localStorage.getItem('user_id')
    console.log(item)
    try {
      let cart_details = await axios.post(`${apiurl}/carts/cart/${user_id}`)
      console.log(cart_details.data)
      setCartId(cart_details.data.cart_id)
    }
    catch (error) {
      console.log(error)
    }
    try {
      if (cartId) {
        const res = await axios.post(`${apiurl}/carts/cart/add/item`, {
          "cart_id": cartId,
          "item_id": item.item_id,
          "quantity": quantity
        });
        console.log(res.data)
      }
    }
    catch (error) {
      console.log(error)
      alert('same restaurent items allowed to add')
    }
  }

  const oldPrice = useMemo(() => {
    return item ? item.price + Math.floor(Math.random() * 40) : 0
  }, [item])

return (
  <>
    <AppBar />
    {item ?
      <div className='w-100 d-flex flex-column justify-content-center align-items-center my-5'>

        <div id="carouselExample" className="carousel slide">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={`${apiurl}/${item.image_url}`} className="d-block w-100" alt="..." />
            </div>
          </div>
        </div>

        <div className="col-md-6 my-4 mx-3">
          <h2>{item.item_name}</h2>


          {/* <Box sx={{ width: 200, display: 'flex', alignItems: 'center' }}>
            <Rating
              name="text-feedback"
              value={value}
              readOnly
              precision={0.5}
              emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
            />
            <Box sx={{ ml: 2 }}>{value}</Box>
          </Box> */}



          <h3 className="text-success">₹{item.price}</h3>
          <p className="text-decoration-line-through text-muted">₹{oldPrice}</p>

          <p className="mt-3">
            {desc}
          </p>


          <div className="mb-3">
            <label className="form-label" htmlFor='quantity'>Quantity</label>
            <input type="number" className="form-control w-25" name='quantity' id='quantity' defaultValue={1} min="1" onChange={(e) => { setQuantity(Number(e.target.value)) }} />
          </div>


          <div className="d-flex gap-3">
            <button className="btn btn-primary px-4" onClick={() => { addtocart() }}>Add to Cart</button>
          </div>


          <ul className="list-unstyled mt-4">
            <li>✔ Free Delivery</li>
          </ul>
        </div>



      </div> : <p>Loading</p>}
  </>
)
}

export default SingleProduct