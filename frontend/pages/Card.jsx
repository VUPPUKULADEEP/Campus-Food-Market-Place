import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Box from '@mui/material/Box'
import Rating from '@mui/material/Rating'
import StarIcon from '@mui/icons-material/Star';
import { useNavigate } from 'react-router-dom';

const Card = ({data}) => {
  const apiurl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const short_description = `${data.item_name} available at ${data.admin.first_name} for ₹${data.price}`
  return (
    <>
    
    <div  className={`card`}>
  <img src={`${apiurl}/${data.image_url}`} className="card-img-top" alt="not found"/>
  <div className="card-body">
    <h5 className="card-title">
      {data.item_name}
    </h5>
    <p className="card-text">{short_description}</p>
    <button className="btn btn-primary" onClick={()=>{navigate(`/single/${data.item_id}`, {state : {data:data}} )}}>See Details</button>
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
  </div>
</div>

    </>
  )
}

export default Card