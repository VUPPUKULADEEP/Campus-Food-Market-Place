import React, { useEffect, useState } from 'react'
import ResponsiveAppBar from '../components/ResponsiveAppBar'
import AppBar from '../components/AppBar'
import 'bootstrap/dist/css/bootstrap.min.css'
import './home.css'
import Card from './Card'
import axios from 'axios'
import {toast} from 'react-toastify'


const Home = () => {
  const [items, setItems] = useState(null)
  useEffect(() =>{
    const fetchdata = async () => {
    const apiurl = import.meta.env.VITE_BACKEND_URL;
    let response;
    try {
      response = await axios.get(`${apiurl}/items/get_all`);
      console.log(response.data)
      setItems(response.data)
    }
    catch (error) {
      toast.error('fail to fetch');
      console.log(error)
    }
    }
    fetchdata();
  }, [])
  
  return (
    <>
    <AppBar/>
    <div className='home-container'>
    {items && items.map((item) => (
      <Card key={item.item_id} data={item}/>
    )
    )}
</div>
   

    </>
  )
}

export default Home