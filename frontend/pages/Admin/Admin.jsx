
import AppBar from '../../components/AppBar'
import AdminHeaderBar from '../../components/AdminHeader'
import AdminSideBar from '../../components/AdminSideBar'
import AdminOrders from './AdminOrders'
import { useState } from 'react'
import { useLocation } from "react-router-dom";
import AdminItems from './Items'
import AdminAccount from './AdminAccount'


const Admin = () => {

  const location = useLocation();
  const [page, setPage] = useState(
  location.state?.page || "Account"
);

  const renderpage = () => {
    switch (page) {
      case 'Account':
        console.log(page)
        return <AdminAccount />
      case 'Orders':
        console.log(page)
        return <AdminOrders />
      case 'Items':
        console.log(page)
        return <AdminItems/>
      default:
        return <AdminAccount />
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