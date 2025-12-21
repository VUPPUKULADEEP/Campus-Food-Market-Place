
import { useForm } from 'react-hook-form'
import './signup.css'
import { TextField, Button, Input, InputLabel, FormHelperText, FormControl } from '@mui/material'


const Signup = () => {

  const { register, formState: { errors }, handleSubmit } = useForm()

  return (
    <div className='wrapper'>
      <form className='form' onSubmit={handleSubmit((data) => { console.log(data) })}>
        <TextField id="outlined-basic" label="firstname" variant="standard" type="text" {...register('firstname', { required: 'first name is required' })} />
        {errors.firstname && <p class='error'>{errors.firstname.message}</p>}
        <TextField id="outlined-basic" label="lastname" variant="standard" type="text" {...register('lastname',  { required: 'last name is required' })} />
        {errors.lastname && <p class='error'>{errors.lastname.message}</p>}
        <TextField id="outlined-basic" label="email" variant="standard" type="email" {...register('email', {required : 'email is necessary'})} />
        {errors.email && <p class='error'>{errors.email.message}</p>}
        <TextField id="outlined-basic" label="password" variant="standard" type="password" {...register('password')} />
        {errors.password && <p class='error'>{errors.password.message}</p>}
        <TextField id="outlined-basic" label="confirm password" variant="standard" type="password" {...register('cnf_password')} />
        {errors.cnf_password && <p class='error'>{errors.cnf_password.message}</p>}
        <Button className='submit' variant="contained" type='submit'>submit</Button>
      </form>
    </div>
  )
}

export default Signup