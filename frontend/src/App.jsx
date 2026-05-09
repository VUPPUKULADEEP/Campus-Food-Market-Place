import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import Signin from "../pages/Signin"
import Signup from "../pages/Signup"
import Home from "../pages/Home"
import SingleProduct from "../pages/SingleProduct"
import Profile from "../pages/Profile"
import Welcome from "../pages/Welcome"
import Test from "../components/test"
import Cart from "../pages/Cart"
import Admin from "../pages/Admin/Admin"
import AdminSignin from "../pages/Admin/AdminSignin"
import AdminSignup from "../pages/Admin/AdminSignup"
import AdminAddItem from "../pages/Admin/AdminAddItem"
import AdminItemEdit from "../pages/Admin/AdminItemEdit"

function App() {
  

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/home" element = {<Home/>}/>
        <Route path="/" element={<Home/>}/>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/single/:id" element={<SingleProduct/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path='/test' element={<Test/>}></Route>
        <Route path='/admin' element={<Admin/>}></Route>
        <Route path='/admin/signin' element={<AdminSignin/>}/>
        <Route path="/admin/signup" element={<AdminSignup/>}/>
        <Route path="/admin/additem" element={<AdminAddItem/>}/>
        <Route path='/admin/edit/:id' element={<AdminItemEdit/>}/>

      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
