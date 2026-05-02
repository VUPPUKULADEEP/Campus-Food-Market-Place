import React from 'react'
import { useForm } from 'react-hook-form'
import AdminHeaderBar from '../../components/AdminHeader'
import AdminSideBar from '../../components/AdminSideBar'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate } from 'react-router-dom'


const AdminAddItem = () => {
  const navigate = useNavigate();
    const { register, formState: { errors }, handleSubmit } = useForm()
    const apiurl = import.meta.env.VITE_BACKEND_URL;
    console.log(import.meta.env.VITE_BACKEND_URL)
    const onSubmit = async (data) => {
        console.log(data)
        let response;
        try {
            // response = await axios.post(`${apiurl}/users/create`,
                // userData);
            // navigate('/signin');
            console.log('try');
        }
        catch (error) {  
            console.log(error.response.data.detail)
            if (error.response.data.detail) {
                alert(error.response.data.detail)
            }
        }


    }
  return (<>
  
    <AdminHeaderBar/>
    <div id="container" className='d-flex justify-content-center align-items-center' style={{ height: '100vh', minWidth: '50%' }}>
                <form id="main-container" className="d-flex flex-column justify-content-start align-items-center" style={{ width: '25%' }} onSubmit={handleSubmit(onSubmit)}>
                    <h3>Add Item</h3>
                    <div className="form-floating mb-3 col-12">
                        <input type="text" className="form-control" id="item_name" placeholder="Item Name"
                            {...register('item_name',
                                {
                                    required: 'name is required',
                                    minLength: {
                                        value: 3, message: 'minimum 3 characters'
                                    }
                                })} />
                        <label htmlFor="item_name">Item Name</label>
                        {errors.item_name && <p class='error'>{errors.item_name.message}</p>}
                    </div>
                    <div className="form-floating mb-3 col-12">
                        <input type="number" className="form-control" id="quantity" placeholder='Quantity'
                            {...register('quantity')}/>
                        <label htmlFor="reg_no">Quanity</label>
                        {errors.quantity && <p class='error'>{errors.quantity.message}</p>}
                    </div>
                    <div className="form-floating mb-3 col-12">
                        <input type="string" className="form-control" id="number" placeholder='price'
                            {...register('price')} />
                        <label htmlFor="number">price</label>
                        {errors.price && <p class='number'>{errors.price.message}</p>}
                    </div>
                    
                    <div className="d-flex justify-content-evenly gap-1 w-100">
                        <button className='btn btn-danger w-50 rounded' type='reset'>go back</button>
                        <button className="btn btn-primary w-50 rounded" type="submit" >submit </button>

                    </div>

                </form>
            </div>

  </>)
}

export default AdminAddItem