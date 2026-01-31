import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import Signin from "../pages/Signin"
import Signup from "../pages/Signup"
import Home from "../pages/Home"
import SingleProduct from "../pages/SingleProduct"


function App() {
  

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/single" element={<SingleProduct/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
