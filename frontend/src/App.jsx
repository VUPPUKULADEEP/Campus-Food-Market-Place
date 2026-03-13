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

function App() {
  

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/home" element = {<Home/>}/>
        <Route path="/" element={<Welcome/>}/>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/single" element={<SingleProduct/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path='/test' element={<Test/>}></Route>
        <Route path='/admin' element={<Admin/>}></Route>
        <Route path='/admin/signin' element={<AdminSignin/>}></Route>
        <Route path="/admin/signup" element={<AdminSignup/>}></Route>

      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
