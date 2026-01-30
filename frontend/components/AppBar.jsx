import React, { useEffect, useState } from 'react'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import 'bootstrap/dist/css/bootstrap.min.css'
import './appbar.css'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';


const AppBar = () => {
  const pages = ['Products', 'Pricing', 'Blog'];

  return (<>

<div className='main'> 
    <div className='bg-custom container-fluid d-flex flex-row justify-content-between p-3 text-white'>
      <div className='mobile'>
        <IconButton

          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={() => { console.log('clicked') }}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
        <Menu>
          <MenuItem>
            <a href='' className='text-white nav-item'>home</a>
          </MenuItem>
          <MenuItem>
            <a href="" className='text-white nav-item'>products</a>
          </MenuItem>
          <MenuItem>
            <a href="" className='text-white nav-item'>search</a>
          </MenuItem>
        </Menu>
      </div>

      <div className='d-flex align-items-center gap-2' onClick={() => { console.log('home') }}>
        <HomeIcon />
        <h3 className='mb-0'>Ecommerce</h3>
        <div className='desktop'>
        <div className="container-fluid d-flex justify-content-center">
          {pages.map((page) => (
            <MenuItem key={page} >
              <Typography sx={{ textAlign: 'center', textDecoration: '', fontSize: 15 }}>{page.toUpperCase()}</Typography>
            </MenuItem>
          ))}
        </div>
        </div>
      </div>


      {/* <div className='desktop container-fluid d-flex flex-row justify-content-center gap-3 text-white'>
            <a href='' className='text-white nav-item'>home</a>
            <a href="" className='text-white nav-item'>products</a>
            <a href="" className='text-white nav-item'>search</a>

        </div> */}


      <div className=' d-flex flex-row gap-4'>
        <ShoppingCartIcon sx={{ height: 30, width: 30 }} />
        <AccountCircleIcon sx={{ height: 30, width: 30 }} />
      </div>

    </div>
    </div>
  </>
  )
}

export default AppBar