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
          <button className='btn btn-primary' onClick={()=>{navigate('/admin/additem')}}>Add Item</button>
        </div>

        {items.length == 0 && <div className='col-md-mx-auto mt-3'> No items Found</div>}
        {/* {!items.length == 0 && 
    <div>

    </div>
    } */}


      </div>
    </>
  )
}

export default AdminItems