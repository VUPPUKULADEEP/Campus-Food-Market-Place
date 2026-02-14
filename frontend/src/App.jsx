import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import Signin from "../pages/Signin"
import Signup from "../pages/Signup"
import Home from "../pages/Home"
import SingleProduct from "../pages/SingleProduct"
import Profile from "../pages/Profile"
import Welcome from "../pages/Welcome"
import Test from "../components/test"

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
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
