import React from 'react'
import { useParams } from 'react-router-dom'

const AdminItemEdit = () => {
    const { id } = useParams()
    return (

        <>
        <p>item id {id}</p>
        </>
    )
}

export default AdminItemEdit