import React, { useEffect, useState } from 'react'
import './account.css'
import axios from 'axios'
import api from '../src/api/api'

const Account = () => {
    const [data, setData] = useState(null);
    
  useEffect(() =>{
    const fetchdata = async () => {
    const apiurl = import.meta.env.VITE_BACKEND_URL;
    const token = localStorage.getItem('access_token')
    let response;
    try {
      // response = await axios.get(`${apiurl}/users/myprofile`,
      //   {
      //     headers:{
      //       Authorization : `Bearer ${token}`
      //     }
      //   }
      // );
      response = await api.get('/users/myprofile')

      console.log(response.data)
      setData(response.data)
    }
    catch (error) {
      alert('fail to fetch');
      console.log(error)
    }
    }
    fetchdata();
  }, [])
  

  return (<>
  <div className='personal-info'>
    <h4>Personal Information <a href="#">Edit</a></h4>
    <input type="text" value={data?.first_name || 'xxxxxxxxxx'} readOnly />
    <h4>Email address <a href="#">Edit</a></h4>
    <input type="email" value={data?.email || 'xxxxxx@email.com'} readOnly />
    <h4>Mobile number <a href="#">Edit</a></h4>
    <input type="string" value={data?.mobile_no || 'xxxxxxxxxx'} readOnly />
    <h4>Registration No: <a href="#">Edit</a></h4> 
    <input type="text"  value={data?.username || 'xxxxxxxxxx'} readOnly />
  </div>
    <div >
      
      <p id='delete'>delete account</p>
    </div>
    </>
  )
}

export default Account