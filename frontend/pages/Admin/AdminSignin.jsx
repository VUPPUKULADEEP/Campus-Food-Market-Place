import React from 'react'
import { useForm } from 'react-hook-form'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const AdminSignin = () => {
const navigate = useNavigate();

  const { register, formState: { errors }, handleSubmit } = useForm()
  const onSubmit = async (userData) => {
    const apiurl = import.meta.env.VITE_BACKEND_URL;
    console.log(userData)
    let response;
    try {
      response = await axios.post(`${apiurl}/admin/login`,
        userData);
        console.log(response)
      navigate('/admin');
    }
    catch (error) {
alert('login failed');
      console.log(error)
      // if (error.response.data.detail) {
      //   alert(error.response.data.detail)
      // }
    }


  }
  return (
    <>
      <div id="container" className='d-flex justify-content-center align-items-center' style={{ height: '100vh', minWidth: '50%' }}>
        <form id="main-container" className="d-flex flex-column justify-content-start align-items-center" style={{ width: '25%' }} onSubmit={handleSubmit(onSubmit)}>
          <h3>Login</h3>

          <div className="form-floating mb-3 col-12">
            <input type="email" className="form-control" id="email" placeholder="name@example.com" {...register('email')} />
            <label htmlFor="email">email</label>
            {errors.email && <p className='error'>{errors.email.message}</p>}
          </div>
          <div className="form-floating mb-3 col-12">
            <input type="password" className="form-control" id="password" placeholder="xxxxxxxxxx" {...register('password')} />
            <label htmlFor="password">password</label>
            {errors.password && <p className='error'>{errors.password.message}</p>}
          </div>
          <div className="w-100 text-end mb-2">
            <Link to="/signup" className='text-decoration-none'>register here</Link>
          </div>
          <div className="d-grid gap-2 col-12 mx-auto">
            <button className="btn btn-primary" type="submit" >Login</button>

          </div>

        </form>
      </div>
    </>
  )
}

export default AdminSignin






