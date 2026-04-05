import React, { useEffect, useState} from 'react'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import 'bootstrap/dist/css/bootstrap.min.css'
import './appbar.css'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import {useNavigate} from 'react-router-dom'


const AppBar = ({isAdmin}) => {
const settings = ['Profile', 'Logout'];
  const navigate = useNavigate();
  const pages = ['Home', 'cart'];
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
    };
    
  
     const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  


  return (<>

<div className='main'> 
    <div className='bg-custom container-fluid d-flex flex-row justify-content-between p-3 text-white'>
      <div className='mobile'>
        
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton

          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenNavMenu}
          color="inherit"
        >
            <MenuIcon />
            </IconButton>
          
        <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              
                <MenuItem key='Home' onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: 'center' }}>Home</Typography>
                </MenuItem>
                <MenuItem key='Cart' onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: 'center' }}>Cart</Typography>
                </MenuItem>
              
            </Menu>
        </Box>
      </div>

      <div className='d-flex align-items-center gap-2'>
        <FastfoodIcon onClick={()=>{navigate('/home')}}/>
        <h5 className='mb-0 text-nowrap' onClick={()=>{navigate('/home')}}>Order Food</h5>
        
          {!isAdmin && (<div className='search'>
            <input type="text" placeholder='search...' className='input-box'/>
            <SearchIcon className='icon'/>
          </div>)}
          
        {!isAdmin && (<div className='desktop'>
        <div className="container-fluid d-flex justify-content-center">
          {pages.map((page) => (
            <MenuItem key={page}  >
              <Typography  onClick={()=>{navigate(`/${page}`)}} sx={{ textAlign: 'center', textDecoration: '', fontSize: 15 }}>{page.toUpperCase()}</Typography>
            </MenuItem>
          ))}
        </div>
        </div>)}
      </div>


      


      <div className=' d-flex flex-row gap-4'>
        
         {!isAdmin &&  (<ShoppingCartIcon sx={{ height: 30, width: 30 }} onClick={()=>{navigate('/profile', { state: { page: "orders" } })}}/>)}
        <Box>
        <AccountCircleIcon onClick={handleOpenUserMenu} sx={{ height: 30, width: 30 }} />
        
        
        <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography sx={{ textAlign: 'center' }} onClick={()=>{navigate(`/${setting}`)}}>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        
      </div>

    </div>
    </div>
  </>
  )
}

export default AppBar