import React from 'react'
import AppBar from '../components/AppBar'
import './profile.css'
import PermanentDrawerLeft from '../components/PermanentDrawerLeft'
import Account from './Account'
import Orders from './Orders'
import Cart from './Cart'
import Wishlist from './Wishlist'
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
      case 'wishlist':
        return <Wishlist />
      default:
        return <Account />
    }
  }
  return (
    <>
      <AppBar isAdmin={false}/>

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