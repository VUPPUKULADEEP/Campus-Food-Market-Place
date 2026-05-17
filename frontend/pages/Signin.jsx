import { useForm } from 'react-hook-form'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


const Signin = () => {
  const navigate = useNavigate();

  const { register, formState: { errors }, handleSubmit } = useForm()
  const onSubmit = async (userData) => {
    const formdata = new URLSearchParams()
    formdata.append("username", userData.username);
    formdata.append("password", userData.password);
    const apiurl = import.meta.env.VITE_BACKEND_URL;
    console.log(formdata)
    let response;
    try {
      response = await axios.post(`${apiurl}/users/login`, formdata, {
        headers:{
          "Content-Type" : "application/x-www-form-urlencoded"
        }
      });
      console.log(response)
      localStorage.setItem('access_token', response.data['access_token'])
      localStorage.setItem('refresh_token', response.data['refresh_token'])
      localStorage.setItem('token_type', response.data['token_type'] )
      navigate('/');
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
            <input type="text" className="form-control" id="username" placeholder="reg no" {...register('username')}
              onChange={(e) => {
                e.target.value = e.target.value.toUpperCase();
              }} />
            <label htmlFor="username">Registration no</label>
            {errors.username && <p className='error'>{errors.username.message}</p>}
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

export default Signin