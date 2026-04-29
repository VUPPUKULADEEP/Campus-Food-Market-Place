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
import { useNavigate } from 'react-router-dom';


const drawerWidth = 200;

function PermanentDrawerLeft({setPage}) {
  const navigate = useNavigate();

  const iconslist = [<AccountBoxIcon/>,
     <CheckBoxOutlineBlankIcon/>, 
     <ShoppingCartIcon/>,
     <FavoriteIcon/>,
     <LogoutIcon/>

  ]
  return (
    <div className='sidebar'>
    
      
        
        <Divider />
        <div className='profile-icon'>
          <AccountCircleIcon  className='icon' sx={{ height: 60, width: 60, display:'inline' }} />
          {/* <span className='span-text'>
          hi,
          </span> */}
         <h3 className='text'>
          Hi!
         </h3>
        </div>
        <Divider />
        <List>
          {['Account','orders', 'logout'].map((text, index) => (
            <ListItem key={text} disablePadding onClick={() =>{setPage(text)}}>
              <ListItemButton>
                <ListItemIcon>
                  {iconslist[index]}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        
     
      
    
    </div>
  );
}


export default PermanentDrawerLeft