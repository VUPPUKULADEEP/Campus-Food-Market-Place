import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import AdminHeaderBar from '../../components/AdminHeader'
import AdminSideBar from '../../components/AdminSideBar'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const AdminAddItem = () => {
    const navigate = useNavigate();
    const [isImage, setisImage] = useState(false)
    const [preview, setPreview] = useState(null)
    const { register, formState: { errors }, handleSubmit } = useForm()
    const apiurl = import.meta.env.VITE_BACKEND_URL;
    const formData = new FormData()

    const createItem = async (data) => {
        const response = await axios.post(`${apiurl}/items/create`,data)

        return response.data
    }

    const uploadImage = async(item_id, file) => {
        const formData = new FormData()
        formData.append("pic", file)

        await axios.post(`${apiurl}/items/item/${item_id}/upload`, formData,{
                headers : {'Content-Type' : 'multipart/form-data'}
        })
        console.log('image uploaded')
    }

    const onSubmit = async (data) => {
        console.log(data)
        const finaldata = {
            ...data,
            'admin_id': localStorage.getItem('admin_id')
        }

        try{
            const createdItem = await createItem(finaldata)
        
            if(data.image_url && data.image_url.length > 0){
                await uploadImage(createdItem.item_id, data.image_url[0])
            }
            console.log('item + image uploaded')
            // console.log(finaldata)
            navigate('/admin')
        }
        catch(error){
            alert('item not added ')
            console.log(error)
        }
        
        


    }
    return (<>

        <AdminHeaderBar />
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
                        {...register('quantity',
                            { required: 'quantity is required' })
                        } />
                    <label htmlFor="reg_no">Quanity</label>
                    {errors.quantity && <p class='error'>{errors.quantity.message}</p>}
                </div>
                <div className="form-floating mb-3 col-12">
                    <input type="string" className="form-control" id="number" placeholder='price'
                        {...register('price',
                            { required: 'price is required' })
                        } />
                    <label htmlFor="number">price</label>
                    {errors.price && <p class='number'>{errors.price.message}</p>}
                </div>
                 <div className="mb-3 w-100 text-center">
                    <label className="form-label fw-semibold">Upload Image</label>

                    <input
                        type="file"
                        className="form-control"
                        accept="image/*"
                        {...register("image_url")
                        }
                        onChange={(e) => {
                            const file = e.target.files[0]
                            if (file){
                                setPreview(URL.createObjectURL(file))
                                setisImage(true)
                            }
                        }}
                    />

                    
                    {isImage && preview &&(
                        <img
                            src={preview}
                            alt="preview"
                            className="mt-3 rounded"
                            style={{ width: "150px", height: "150px", objectFit: "cover" }}
                        />
                    )}
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