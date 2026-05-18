import React, { useEffect, useState } from 'react'
import '../account.css'
import axios from 'axios'
import api from '../../src/api/api'
import {toast} from 'react-toastify'


const AdminAccount = () => {
    const [data, setData] = useState(null);
    
  useEffect(() =>{
    const fetchdata = async () => {
    const apiurl = import.meta.env.VITE_BACKEND_URL;
    let response;
    try {
      response = await api.get(`/admins/myprofile`);
      console.log(response.data)
      setData(response.data)
    }
    catch (error) {
      toast.error('fail to fetch');
      console.log(error)
    }
    }
    fetchdata();
  }, [])
  

  return (<>
  <div className='personal-info'>
    <h4>Restaurent Name <a href="#">Edit</a></h4>
    <input type="text" value={data?.first_name || 'xxxxxxxxxx'} readOnly />
    <input type="text" value={data?.last_name || 'xxxxxxxxxx'} readOnly />
    <h4>Email address <a href="#">Edit</a></h4>
    <input type="email" value={data?.email || 'xxxxxx@email.com'} readOnly />
    <h4>Mobile number <a href="#">Edit</a></h4>
    <input type="number" value={data?.mobile_no || 'xxxxxxxxxx'} readOnly />
    <h4>Status: <a href="#">Edit</a></h4> 
    <input type="text"  value={data?.is_open? 'Open' : 'Closed'} readOnly />
  </div>
    <div >
      
      <p id='delete'>delete account</p>
    </div>
    </>
  )
}

export default AdminAccount