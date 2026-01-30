import React from 'react'
import ResponsiveAppBar from '../components/ResponsiveAppBar'
import AppBar from '../components/AppBar'
import 'bootstrap/dist/css/bootstrap.min.css'
import './home.css'
import Card from './Card'

const Home = () => {
  return (
    <>
    <AppBar/>
    <ResponsiveAppBar />
    

    <img src="../src/assets/sample2.webp" alt="not found"  className="img-fluid object-fit-cover w-100 mh-10"/>
    
    <Card/>

    </>
  )
}

export default Home