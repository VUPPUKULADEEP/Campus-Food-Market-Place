
import {useForm} from 'react-hook-form'

import {TextField} from '@mui/material'


const Signup = () => {


  
  const {register, watch, formState:{errors}, handleSubmit} = useForm()
  
  
  return(
    <form onSubmit={handleSubmit((data)=>{ console.log(data)})}>
      
       <label htmlFor="outlined-basic">Enter firstname</label>
      
      <TextField id="outlined-basic" label="Outlined" variant="standard" type="text" {...register('firstname', {required :'this is required'})}  />
      {errors.firstname && <p>{errors.firstname.message }</p>}
      <label htmlFor="lastname">Enter Lastname</label>
      <input type="text" {...register('lastname')} id="lastname" />
      <label htmlFor="email"></label>
      <input type="email" {...register('email')} id="email" />
      <input type='submit' /> 
    </form>
  )
}

export default Signup