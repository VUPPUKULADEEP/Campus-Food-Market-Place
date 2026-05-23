import React from 'react'
import AppBar from '../components/AppBar'
import './profile.css'
import PermanentDrawerLeft from '../components/PermanentDrawerLeft'
import Account from './Account'
import Orders from './Orders'
import Cart from './Cart'
import { useState } from 'react'
import { useLocation } from "react-router-dom";

const Profile = () => {
  const location = useLocation();
  const [page, setPage] = useState(
  location.state?.page || "Account"
);

  
  const renderpage = () => {
    switch (page) {
      case 'Account':
        console.log(page)
        return <Account />
      case 'orders':
        console.log(page)
        return <Orders />
      default:
        return <Account />
    }
  }
  return (
    <>
      <AppBar/>

      <div className='full-page'>
        <PermanentDrawerLeft  setPage={setPage} />
        <div className='dynamic'>
          {renderpage()}
        </div>

      </div>
    </>
  )
}

export default Profile