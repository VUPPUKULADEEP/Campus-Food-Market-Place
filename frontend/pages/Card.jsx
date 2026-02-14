import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Box from '@mui/material/Box'
import Rating from '@mui/material/Rating'
import StarIcon from '@mui/icons-material/Star';

const Card = ({className}) => {
  const value = 3.5
  return (
    <>
    
    <div  className={`card ${className}`}>
  <img src="../src/assets/sample.jpg" className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">Card title</h5>
    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card’s content.</p>
    <a href="#" className="btn btn-primary">Go somewhere</a>
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
  </div>
</div>

    </>
  )
}

export default Card