import React from 'react'
import { useParams } from 'react-router-dom'
import AdminHeaderBar from '../../components/AdminHeader'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useEffect } from 'react'

const AdminItemEdit = () => {
    const navigate = useNavigate();
    const [item, setItem] = useState(null)
    const [imageChange, setImageChange] = useState(false)
    const [preview, setPreview] = useState()
    const [isImage, setisImage] = useState(false)
    const { register, formState: { errors,isDirty }, handleSubmit, reset } = useForm()
    const { id } = useParams()
    const {onChange : imageOnChange, ...imageRest} = register('image_url')
    const apiurl = import.meta.env.VITE_BACKEND_URL;
    useEffect(() => {
        const fetchdata = async () => {

            let response;
            try {
                response = await axios.get(`${apiurl}/items/item/${id}`);
                console.log(response.data)
                setItem(response.data)
                reset(response.data)
                if (response.data.image_url) {
                    setisImage(true)
                }
            }
            catch (error) {
                alert('fail to fetch');
                console.log(error)
            }
        }
        fetchdata();
    }, [])
    const updateItem = async (data) => {
        const response = await axios.put(`${apiurl}/items/item/${id}`, data)

        return response.data
    }

    const updateImage = async (item_id, file) => {
        const formData = new FormData()
        formData.append("pic", file)
        console.log(formData.get('pic'))
        if(formData.get('pic') === undefined){
            return
        }
        await axios.put(`${apiurl}/items/item/${item_id}/image`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
        console.log('image uploaded')
    }

    const onSubmit = async (data) => {
        console.log(data)
        const {image_url, ...finaldata } = data

        try {
            const updatedItem = await updateItem(finaldata)

            if (imageChange && data.image_url?.[0]) {
                await updateImage(updatedItem.item_id, data.image_url[0])
            }
            console.log('item + image uploaded')
            // console.log(finaldata)
            navigate('/admin')
        }
        catch (error) {
            alert('item not added ')
            console.log(error)
        }
    }

    return (
        <>
            <AdminHeaderBar />
            <div id="container" className='d-flex justify-content-center align-items-center' style={{ height: '100vh', minWidth: '50%' }}>
                <form id="main-container" className="d-flex flex-column justify-content-start align-items-center" style={{ width: '25%' }} onSubmit={handleSubmit(onSubmit)}>
                    <h3>Edit Item {id}</h3>
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
                        <input type="number" className="form-control" id="number" placeholder='price'
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
                            accept=".jpg,.png,.jpeg"
                            {...imageRest}
                            onChange={(e) => {
                                imageOnChange(e)
                                setImageChange(true)
                                const file = e.target.files[0]
                                if (file) {
                                    setPreview(URL.createObjectURL(file))
                                    setisImage(true)
                                }
                            }}
                        />


                        {isImage && (
                            <img
                                src={
                                    preview ?
                                        preview :
                                        item?.image_url
                                            ? `${apiurl}/${item.image_url}` : ''}
                                alt="preview"
                                className="mt-3 rounded"
                                style={{ width: "150px", height: "150px", objectFit: "cover" }}
                            />
                        )}
                    </div>

                    <div className="d-flex justify-content-evenly gap-1 w-100">

                        <button className='btn btn-danger w-50 rounded' type='reset' onClick={() => { navigate('/admin') }}>go back</button>


                        <button
                            className="btn btn-primary"
                            type="submit"
                            disabled={!isDirty}
                        >
                            Modify
                        </button>

                    </div>

                </form>
            </div>
        </>
    )
}

export default AdminItemEdit