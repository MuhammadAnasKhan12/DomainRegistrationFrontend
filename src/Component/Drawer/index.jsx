import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

export default function PermanentDrawerLeft() {
    const navigate= useNavigate();

  return (
    <Box sx={{ display: {xs:"none",sm:'flex'} }}>
      <CssBaseline />
      {/* <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant="h6" ma noWrap component="div">
            Permanent drawer
          </Typography>
        </Toolbar>
      </AppBar> */}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          {[{
            route:'Domain Registration',
            src:"domain"
          }, {
            route:"Domain List",
            src:"domainList"
          },
          {
            route:'Contact List',
            src:"contactlist"
          },
        ].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton onClick={()=>navigate(`/${text.src}`)}>
               
                <ListItemText primary={text.route} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
       
      </Drawer>
  
    </Box>
  );
}










