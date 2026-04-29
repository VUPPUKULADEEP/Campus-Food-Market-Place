import React from 'react'
import './account.css'
import axios from 'axios'


const Account = () => {
  window.onload = () =>{
    const data = axios.get()
  }
  return (<>
  <div className='personal-info'>
    <h4>Personal Information <a href="#">Edit</a></h4>
    <input type="text" value={'xxxxxxxxxx'}/>
    <h4>Email address <a href="#">Edit</a></h4>
    <input type="email" value={'xxxxxx@gmail.com'} />
    <h4>Mobile number <a href="#">Edit</a></h4>
    <input type="number" value={'2314781902347'} />
    <h4>Registration No: <a href="#">Edit</a></h4> 
    <input type="text"  value={'xxxxxxxxxx'}/>
  </div>
    <div >
      <p id='deactivate'>deactivate account</p>
      <p id='delete'>delete account</p>
    </div>
    </>
  )
}

export default Account