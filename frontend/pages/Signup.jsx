
import { useForm } from 'react-hook-form'
import 'bootstrap/dist/css/bootstrap.min.css'

const Signup = () => {

  const { register, formState: { errors }, handleSubmit } = useForm()

  return (<>
  <div id="container" className='d-flex justify-content-center align-items-center' style={{height:'100vh', minWidth:'50%'}}>
        <form id="main-container" className="d-flex flex-column justify-content-start align-items-center" style={{width:'25%'}} onSubmit={handleSubmit((register)=>{ console.log(JSON.stringify(register))})}>
            <h3>Register here </h3>
            <div className="form-floating mb-3 col-12">
                <input type="text" className="form-control" id="firstname" placeholder="name@example.com" {...register('firstname', { required: 'first name is required' })} />
                <label htmlFor="firstname">firstname</label>
                {errors.firstname && <p class='error'>{errors.firstname.message}</p>}
            </div>
            <div className="form-floating mb-3 col-12">
                <input type="text" className="form-control" id="lastname" placeholder="name@example.com" {...register('lastname')} />
                <label htmlFor="lastname">lastname</label>
                {errors.lastname && <p class='error'>{errors.lastname.message}</p>}
            </div>
            <div className="form-floating mb-3 col-12">
                <input type="email" className="form-control" id="email" placeholder="name@example.com" {...register('email')} />
                <label htmlFor="email">email</label>
                {errors.email && <p class='error'>{errors.email.message}</p>}
        </div>
            <div className="form-floating mb-3 col-12">
                <input type="password" className="form-control" id="password" placeholder="xxxxxxxxxx" {...register('password')}/>
                <label htmlFor="password">password</label>
                {errors.password && <p class='error'>{errors.password.message}</p>}
            </div>
            <div className="form-floating mb-3 col-12">
                <input type="password" className="form-control" id="cnf-password" placeholder="xxxxxxxxxx" {...register('cnfpassword')}/>
                <label htmlFor="cnf-password">confirm password</label>
                {errors.cnfpassword && <p class='error'>{errors.cnfpassword.message}</p>}
            </div>
            <div className="d-grid gap-2 col-12 mx-auto">
                <button className="btn btn-primary" type="submit" >submit </button>
                
            </div>
        
        </form>
    </div>
    
   

    

    {/* <div classNameName='wrapper'>
       <img src='../src/assets/signup.png' alt='not found'/>
      <form classNameName='form' onSubmit={handleSubmit((data) => { console.log(data) })}>
        <TextField id="outlined-basic" label="firstname" variant="standard" type="text" {...register('firstname', { required: 'first name is required' })} />
        {errors.firstname && <p className='error'>{errors.firstname.message}</p>}
        <TextField id="outlined-basic" label="lastname" variant="standard" type="text" {...register('lastname',  { required: 'last name is required' })} />
        {errors.lastname && <p className='error'>{errors.lastname.message}</p>}
        <TextField id="outlined-basic" label="email" variant="standard" type="email" {...register('email', {required : 'email is necessary'})} />
        {errors.email && <p className='error'>{errors.email.message}</p>}
        <TextField id="outlined-basic" label="password" variant="standard" type="password" {...register('password')} />
        {errors.password && <p className='error'>{errors.password.message}</p>}
        <TextField id="outlined-basic" label="confirm password" variant="standard" type="password" {...register('cnf_password')} />
        {errors.cnf_password && <p className='error'>{errors.cnf_password.message}</p>}
        <Button classNameName='submit' variant="contained" type='submit'>submit</Button>
      </form>
    </div> */}
    </>
  )
}

export default Signup