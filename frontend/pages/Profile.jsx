import React from 'react'
import AppBar from '../components/AppBar'
import './profile.css'

const Profile = () => {
  return (
    <>
    <AppBar/>
    <div className='container'>
      <div className='details'>
        <p>hello</p>
        <h3>kuladeep v</h3>

      </div>
      <div className='menu'>
          <a href="#"> my orders</a>
          <a href="#"> my cart</a>
          <a href="#"> logout</a>
      </div>
      <div className='editable'>

      </div>
    </div>
    </>
  )
}

export default Profile