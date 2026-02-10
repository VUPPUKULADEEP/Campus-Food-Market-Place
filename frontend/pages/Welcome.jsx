import React from 'react'
import ResponsiveAppBar from '../components/ResponsiveAppBar'
import AppBar from '../components/AppBar'
import 'bootstrap/dist/css/bootstrap.min.css'
import './home.css'
import Card from './Card'

const Welcome = () => {
    return (
        <>
            <AppBar />
            {/* <ResponsiveAppBar /> */}


            <img src="../src/assets/sample2.webp" alt="not found" id='banner' className="img-fluid object-fit-cover w-100 mh-10" />

            {/* <Card/> */}

            <div className='text-home'>
                <h3>About us</h3>
                <p>Welcome to Ecommerce, your one-stop destination for quality products at honest prices.

                    We started Ecommerce with a simple idea: shopping should be easy, reliable, and enjoyable. From carefully curated products to secure payments and fast delivery, everything we do is focused on giving you a smooth and satisfying shopping experience.

                    We work closely with trusted suppliers to ensure that every product meets our quality standards. Whether you’re looking for everyday essentials or something special, we’re here to bring you the best—without the hassle.</p>
            </div>

        </>
    )
}

export default Welcome