import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
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

function PermanentDrawerLeft() {
  const iconslist = [<AccountBoxIcon/>,
     <CheckBoxOutlineBlankIcon/>, 
     <ShoppingCartIcon/>,
     <FavoriteIcon/>,
     <LogoutIcon/>

  ]
  return (<>
    
    <Box sx={{ display: 'flex', position:'static' }}>
      <Drawer
        sx={{
          
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            marginTop:9.9
          },
        }}
        variant='permanent'
        anchor="left"
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
            <ListItem key={text} disablePadding>
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
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
        <Typography sx={{ marginBottom: 2 }}>
          hi
        </Typography>
        <Typography sx={{ marginBottom: 2 }}>
          ces sagittis orci a.
        </Typography>
      </Box>
    </Box>
    </>
  );
}


export default PermanentDrawerLeft