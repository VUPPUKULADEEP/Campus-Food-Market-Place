
import {useForm} from 'react-hook-form'

import {TextField,Button} from '@mui/material'


const Signup = () => {


  
  const {register, watch, formState:{errors}, handleSubmit} = useForm()
  
  
  return(
    <form onSubmit={handleSubmit((data)=>{ console.log(data)})}>
      
       
      
      <TextField id="outlined-basic" label="Outlined" variant="standard" type="text" {...register('firstname', {required :'this is required'})}  />
      {errors.firstname && <p>{errors.firstname.message }</p>}
       <TextField id="outlined-basic" label="Outlined" variant="standard"  type="text" {...register('lastname')}/>
      <TextField id="outlined-basic" label="Outlined" variant="standard"  type="email" {...register('email')}/>
      <Button variant="contained" type='submit'>submit</Button>
    </form>
  )
}

export default Signup