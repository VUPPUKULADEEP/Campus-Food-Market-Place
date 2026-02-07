import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import './drawer.css'
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LogoutIcon from '@mui/icons-material/Logout';



const drawerWidth = 200;

function PermanentDrawerLeft({setPage, className}) {
  

  const iconslist = [<AccountBoxIcon/>,
     <CheckBoxOutlineBlankIcon/>, 
     <ShoppingCartIcon/>,
     <FavoriteIcon/>,
     <LogoutIcon/>

  ]
  return (
    <div>
    <Box >
      <Drawer
        sx={{
          '& .MuiDrawer-paper': {
            width:drawerWidth,
            top:'4.1rem'
            
          },
        }}
        variant='permanent'
        
      >
        
        <Divider />
        <div className='profile-icon'>
          <AccountCircleIcon  className='icon' sx={{ height: 60, width: 60, display:'inline' }} />
          <span className='span-text'>
          hi,
          </span>
         <h3 className='text'>
          kuladeep
         </h3>
        </div>
        <List>
          {['Account','orders', 'cart', 'wishlist', 'logout'].map((text, index) => (
            <ListItem key={text} disablePadding onClick={() => {setPage(text)}}>
              <ListItemButton>
                <ListItemIcon>
                  {iconslist[index]}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        
      </Drawer>
      
    </Box>
    </div>
  );
}


export default PermanentDrawerLeft