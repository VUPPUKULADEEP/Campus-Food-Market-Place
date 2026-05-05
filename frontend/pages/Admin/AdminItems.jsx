import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminItems = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      const apiurl = import.meta.env.VITE_BACKEND_URL;
      let response;
      try {
        response = await axios.get(`${apiurl}/items/admin/${localStorage.getItem('admin_id')}`);
        console.log(response.data)
        setItems(response.data)
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
      <div className='container-fluid mt-3'>
        <div className='header d-flex flex-row justify-content-between'>
          <h3 className='mb-2'>Your Items</h3>
          <button className='btn btn-primary' onClick={() => { navigate('/admin/additem') }}>Add Item</button>
        </div>

        {items.length == 0 && <div className='col-md-mx-auto mt-3'> No items Found</div>}
        {items &&
          <div className='container mt-4'>
            <div className='row'>
              {items.map((item) => (
                <div className='col-md-4 mb-4' key={item.item_id}>
                  <div className='card h-100 shadow-sm'>
                    <img
                      src={`http://localhost:8000/${item.image_url}`}
                      className='card-img-top'
                      style={{ height: "200px", objectFit: "cover" }}
                      alt="Not found" />
                    <div className='card-body'>
                      <h5 className="card-title">{item.item_name}</h5>
                      <p className="card-text">₹ {item.price}</p>
                      <p className="card-text">Qty: {item.quantity}</p>
                      <div className="d-flex justify-content-between">
                        <button className="btn btn-sm btn-warning">Edit</button>
                        <button className="btn btn-sm btn-danger">Delete</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        }


      </div >
    </>
  )
}

export default AdminItems