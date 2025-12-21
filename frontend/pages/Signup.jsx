
import {useForm} from 'react-hook-form'

import {TextField,Button} from '@mui/material'


const Signup = () => {
  
  const {register, formState:{errors}, handleSubmit} = useForm()

  return(
    <form onSubmit={handleSubmit((data)=>{ console.log(data)})}>
      <TextField id="outlined-basic" label="firstname" variant="standard" type="text" {...register('firstname', {required :'this is required'})}  />
      {errors.firstname && <p>{errors.firstname.message }</p>}
       <TextField id="outlined-basic" label="lastname" variant="standard"  type="text" {...register('lastname')}/>
      <TextField id="outlined-basic" label="email" variant="standard"  type="email" {...register('email')}/>
      <TextField id="outlined-basic" label="password" variant="standard"  type="password" {...register('email')}/>
      <TextField id="outlined-basic" label="confirm password" variant="standard"  type="password" {...register('email')}/>
      <Button variant="contained" type='submit'>submit</Button>
    </form>
  )
}

export default Signup