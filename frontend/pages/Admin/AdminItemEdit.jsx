import React from 'react'
import { useParams } from 'react-router-dom'
import AdminHeaderBar from '../../components/AdminHeader'

const AdminItemEdit = () => {
    const { id } = useParams()
    return (
        <>
        <AdminHeaderBar />
        
        </>
    )
}

export default AdminItemEdit