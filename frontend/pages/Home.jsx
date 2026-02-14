import React from 'react'
import ResponsiveAppBar from '../components/ResponsiveAppBar'
import AppBar from '../components/AppBar'
import 'bootstrap/dist/css/bootstrap.min.css'
import './home.css'
import Card from './Card'

const Home = () => {
  const element = []
  for (let index = 0; index < 10; index++) {
    element.push(<Card key={index} className='item'/>)
    
  }
  return (
    <>
    <AppBar/>
    <div className='home-container'>
    {element}
</div>
   

    </>
  )
}

export default Home