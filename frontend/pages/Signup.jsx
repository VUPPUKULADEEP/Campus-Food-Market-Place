
import { useForm } from 'react-hook-form'
import 'bootstrap/dist/css/bootstrap.min.css'

const Signup = () => {

    const { register, formState: { errors }, handleSubmit } = useForm()
    const call = () => {

    }
    return (
        <>
            <div id="container" className='d-flex justify-content-center align-items-center' style={{ height: '100vh', minWidth: '50%' }}>
                <form id="main-container" className="d-flex flex-column justify-content-start align-items-center" style={{ width: '25%' }} onSubmit={handleSubmit((register) => { console.log(JSON.stringify(register)) })}>
                    <h3>Register here </h3>
                    <div className="form-floating mb-3 col-12">
                        <input type="text" className="form-control" id="firstname" placeholder="name@example.com"
                            {...register('firstname',
                                {
                                    required: 'first name is required',
                                    minLength: {
                                        value: 3, message: 'minimum 3 characters'
                                    }
                                })} />
                        <label htmlFor="firstname">firstname</label>
                        {errors.firstname && <p class='error'>{errors.firstname.message}</p>}
                    </div>
                    <div className="form-floating mb-3 col-12">
                        <input type="text" className="form-control" id="lastname" placeholder="name@example.com"
                            {...register('lastname')} />
                        <label htmlFor="lastname">lastname</label>
                        {errors.lastname && <p class='error'>{errors.lastname.message}</p>}
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
                        <input type="password" className="form-control" id="cnf-password" placeholder="xxxxxxxxxx" {...register('cnfpassword')} />
                        <label htmlFor="cnf-password">confirm password</label>
                        {errors.cnfpassword && <p className='error'>{errors.cnfpassword.message}</p>}
                    </div>
                    <div className="d-grid gap-2 col-12 mx-auto">
                        <button className="btn btn-primary" type="submit" onClick={call}>submit </button>

                    </div>

                </form>
            </div>
        </>
    )
}

export default Signup