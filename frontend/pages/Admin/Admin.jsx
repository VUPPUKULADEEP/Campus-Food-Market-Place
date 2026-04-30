
import AppBar from '../../components/AppBar'
import AdminHeaderBar from '../../components/AdminHeader'
import AdminSideBar from '../../components/AdminSideBar'
import Account from '../Account'
import Orders from '../Orders'
import { useState } from 'react'
import { useLocation } from "react-router-dom";



const Admin = () => {

  const location = useLocation();
  const [page, setPage] = useState(
  location.state?.page || "Account"
);

  const renderpage = () => {
    switch (page) {
      case 'Account':
        console.log(page)
        return <Account />
      case 'orders':
        console.log(page)
        return <Orders />
      default:
        return <Account />
    }
  }
  return (<>
    <AdminHeaderBar />

    <div className='full-page'>
      <AdminSideBar setPage={setPage} />
      <div className='dynamic'>
        {renderpage()}
      </div>

    </div>
  </>

  )
}

export default Admin