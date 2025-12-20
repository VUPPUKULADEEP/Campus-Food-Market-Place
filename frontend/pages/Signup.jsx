
import {useForm} from 'react-hook-form'




const Signup = () => {


  
  const {register, watch, formState:{errors}, handleSubmit} = useForm()
  
  
  return(
    <form onSubmit={handleSubmit((data)=>{ console.log(data)})}>
      <label htmlFor="firstname">Enter firstname</label>
      
      <input type="text" {...register('firstname', {required :'this is required'})} id="firstname" />
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