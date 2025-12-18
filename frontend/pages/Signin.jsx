import React, { useRef, useState } from 'react'
import './Signin.css'
import { useNavigate } from 'react-router-dom'



const Signin = () => {

  const navigate = useNavigate();
  return (
    <>
  
  <div className="main">
 <div className="container">
    <div className="inputText">email</div>
    <input type="text" name="email" className='input' /><br />
    <div className="inputText">password</div>
    <input type="text" name="password" className='input' /><br />


    <button type="button" className='loginBtn'  >login</button>

    <div className="reg" onClick={()=>{navigate('/Signup')}}>regester here</div>
  </div>
  </div>
  </>
  )
}

export default Signin