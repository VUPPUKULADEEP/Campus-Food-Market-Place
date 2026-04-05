import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import AppBar from '../components/AppBar'
import './singleproduct.css'
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';



const SingleProduct = () => {
  const labels = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
  };
  const value = 3.5;
  return (
    <>
      <AppBar isAdmin={false}/>
      <div className='w-100 d-flex flex-column justify-content-center align-items-center my-5'>

        <div id="carouselExample" className="carousel slide">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src="../src/assets/biriyani.jpg" className="d-block w-100" alt="..." />
            </div>
          </div>
        </div>

        <div className="col-md-6 my-4 mx-3">
          <h2>Torch lights</h2>


          <Box sx={{ width: 200, display: 'flex', alignItems: 'center' }}>
            <Rating
              name="text-feedback"
              value={value}
              readOnly
              precision={0.5}
              emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
            />
            <Box sx={{ ml: 2 }}>{value}</Box>
          </Box>



          <h3 className="text-success">₹299</h3>
          <p className="text-decoration-line-through text-muted">₹399</p>

          <p className="mt-3">
            Experience premium sound quality with long battery life and
            comfortable design, perfect for everyday use.
          </p>


          <div className="mb-3">
            <label className="form-label">Quantity</label>
            <input type="number" class="form-control w-25" defaultValue={1} min="1" />
          </div>


          <div className="d-flex gap-3">
            <button className="btn btn-primary px-4">Add to Cart</button>
          </div>


          <ul className="list-unstyled mt-4">
            <li>✔ Free Delivery</li>
            <li>✔ 7 Days Replacement</li>
            <li>✔ 1 Year Warranty</li>
          </ul>
        </div>
        
        
        
      </div>
    </>
  )
}

export default SingleProduct