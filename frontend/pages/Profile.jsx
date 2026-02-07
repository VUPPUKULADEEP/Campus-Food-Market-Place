import React from 'react'
import AppBar from '../components/AppBar'
import './profile.css'
import PermanentDrawerLeft from '../components/PermanentDrawerLeft'

const Profile = () => {
  return (
    <>
    <AppBar/>
    {/* <div className='profile-container'>
      <div className='details'>
        <p>hello</p>
        <h3>kuladeep v</h3>

      </div>
      <div className='menu'>
          <a href="#"> my orders</a>
          <a href="#"> my cart</a>
          <a href="#"> logout</a>
      </div>
      <div className='content'>

      </div>
    </div> */}
    <div>
    <PermanentDrawerLeft/>

    </div>
    </>
  )
}

export default Profile