
import { useForm } from 'react-hook-form'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
    const navigate = useNavigate();
    const { register, formState: { errors }, handleSubmit, watch } = useForm()
    const password = watch("password")
    const apiurl = import.meta.env.VITE_BACKEND_URL;
    console.log(import.meta.env.VITE_BACKEND_URL)
    const onSubmit = async (data) => {
        const { cnfpassword, ...userData } = data
        console.log(userData)
        let response;
        try {
            response = await axios.post(`${apiurl}/users/create`,
                userData);
            navigate('/signin');
        }
        catch (error) {  
            console.log(error.response.data.detail)
            if (error.response.data.detail) {
                alert(error.response.data.detail)
            }
        }


    }
    return (
        <>
            <div id="container" className='d-flex justify-content-center align-items-center' style={{ height: '100vh', minWidth: '50%' }}>
                <form id="main-container" className="d-flex flex-column justify-content-start align-items-center" style={{ width: '25%' }} onSubmit={handleSubmit(onSubmit)}>
                    <h3>Register here </h3>
                    <div className="form-floating mb-3 col-12">
                        <input type="text" className="form-control" id="name" placeholder="Name"
                            {...register('first_name',
                                {
                                    required: 'name is required',
                                    minLength: {
                                        value: 3, message: 'minimum 3 characters'
                                    }
                                })} />
                        <label htmlFor="name">Name</label>
                        {errors.first_name && <p class='error'>{errors.first_name.message}</p>}
                    </div>
                    <div className="form-floating mb-3 col-12">
                        <input type="text" className="form-control" id="reg_no" placeholder='Registration no'
                            {...register('reg_no')} onChange={(e) =>{
                                e.target.value = e.target.value.toUpperCase();
                            }} />
                        <label htmlFor="reg_no">Registration no</label>
                        {errors.reg_no && <p class='error'>{errors.reg_no.message}</p>}
                    </div>
                    <div className="form-floating mb-3 col-12">
                        <input type="string" className="form-control" id="number" placeholder='mobile number'
                            {...register('mobile_no')} />
                        <label htmlFor="number">Mobile number</label>
                        {errors.mobile_no && <p class='number'>{errors.mobile_no.message}</p>}
                    </div>
                    <div className="form-floating mb-3 col-12">
                        <input type="email" className="form-control" id="email" placeholder="name@example.com"
                            {...register('email')} />
                        <label htmlFor="email">email</label>
                        {errors.email && <p class='error'>{errors.email.message}</p>}
                    </div>
                    <div className="form-floating mb-3 col-12">
                        <input type="password" className="form-control" id="password" placeholder="xxxxxxxxxx"
                            {...register('password',
                                {
                                    required: 'password is required',
                                    minLength: {
                                        value: 8, message: 'minimum 8 characters'
                                    }
                                })
                            } />
                        <label htmlFor="password">password</label>
                        {errors.password && <p class='error'>{errors.password.message}</p>}
                    </div>
                    <div className="form-floating mb-3 col-12">
                        <input type="password" className="form-control" id="cnf-password" placeholder="xxxxxxxxxx" {...register('cnfpassword', {
                            validate: value => value === password || "password do not match"
                        })} />
                        <label htmlFor="cnf-password">confirm password</label>
                        {errors.cnfpassword && <p className='error'>{errors.cnfpassword.message}</p>}
                    </div>
                    <div className="d-grid gap-2 col-12 mx-auto">
                        <button className="btn btn-primary" type="submit" >submit </button>

                    </div>

                </form>
            </div>
        </>
    )
}

export default Signup