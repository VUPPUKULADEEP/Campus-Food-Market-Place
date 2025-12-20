import { useState } from "react"
import {useForm} from 'react-hook-form'

const Signup = () => {
  const {register, handleSubmit} = useForm()
  return (
    <form onSubmit={handleSubmit((register)=>{ console.log(JSON.stringify(register))})}>
      <input type="text" {...register('firstname')} />
      <input type="text" {...register('lastname')} />
      <input type='submit' />
    </form>
  )
}

export default Signup