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
import LogoutIcon from '@mui/icons-material/Logout';
import apiInstance from "../../Pages/ApiInstance/index";
const drawerWidth = 240;

export default function PermanentDrawerLeft() {
  const navigate= useNavigate();
  const logout = async () => {
        try {
            const response = await apiInstance.post("logout");
            if(response.status === 200 ){
              navigate("/")
            }
        } catch (error) {
            console.log("Error", error);
        }
    };

    

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
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
  }}
  variant="permanent"
  anchor="left"
>
  {/* Top Section */}
  <Box>
    <Toolbar />
    <ListItem>
      <div style={{ display: "flex", justifyContent: "center", marginTop: "-40px" }}>
        <img style={{ width: "40%" }} src='/logo.png' alt="logo" />
      </div>
    </ListItem>
    <Divider />
    <List>
      {[
        { route: 'Domain Registration', src: "domain" },
        { route: "Domain List", src: "domainList" },
        { route: 'Contact List', src: "contactlist" }
      ].map((text) => (
        <ListItem key={text.route} disablePadding>
          <ListItemButton onClick={() => navigate(`/${text.src}`)}>
            <ListItemText primary={text.route} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  </Box>

  {/* Bottom Section - Logout */}
  <Box>
    <Divider />
    <ListItem disablePadding>
  <ListItemButton onClick={logout}>
    <ListItemIcon>
      <LogoutIcon />
    </ListItemIcon>
    <ListItemText primary="Logout" />
  </ListItemButton>
</ListItem>

  </Box>
</Drawer>

  
    </Box>
  );
}










