import { useState } from "react";
import { Box, AppBar, Toolbar, Typography, CssBaseline, Stack, Menu, MenuItem } from "@mui/material"
import Themedbutton from "./Themedbutton";
import bukitLogo from "../assets/images/bukit.png";

const Account = () => {
  return (
    <Themedbutton color="inherit" title="Account"></Themedbutton>
  )
}

const NoAccount = () => {
  return (
    <Themedbutton color="inherit"
      title="Login/SignUp"
      sx={{
        border: '1px solid white',
        borderRadius: '0px',
        alignSelf: 'center'
      }}
    ></Themedbutton>
  )
}


export const NavBar = () => {
  const [HasLogIn, setHasLogIn] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isHoverLocked, setIsHoverLocked] = useState(false);

  const open = Boolean(anchorEl)
  
  //open menu
  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    if (!isHoverLocked) {//prevent menu from popping back immediatelly
      setAnchorEl(event.currentTarget);
    }
  };
  
  //close menu
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <CssBaseline />
      <AppBar position="static"
        sx={{
          backgroundColor: '#6F874B',
          color: '#F0F0F2'
        }}
      >
        <Toolbar >
          <Typography variant="h6"
            component='div'
            sx={{
              flexGrow: '1',
            }}
          >
            <Box
              component="img"
              src={bukitLogo}
              alt="Bukit Logo"
              sx={{
                height: 70,
                width: 'auto',
                my: 'auto',
                display: 'flex',
              }}
            />
          </Typography>
          <Stack direction="row" spacing={2}
            sx={{
              height: 70,
              width: 'auto',

            }}
          >

            <Themedbutton color="inherit" title="DashBoard" id="resource-button"
              onMouseEnter={handleOpen}
              onClick={handleClose}
              sx={{
              backgroundColor: open ? '#7d9e4b' : '#6f874b'
            }}
            />
            <Themedbutton color="inherit" title="News" />
            <Themedbutton color="inherit" title="About" />
            {HasLogIn ? <Account /> : <NoAccount />}
          </Stack>
          <Menu id="resource-menu"
            anchorEl={anchorEl}
            open={open}
            onClick={handleClose}
            slotProps={{
              list: {
                onMouseLeave: handleClose,
              },
              paper: { 
                sx: {
                  width: '100vw',
                  maxWidth: '100vw',
                  left: '0px !important',  
                  borderRadius: 0,

                }
              }
            }}
            sx={{
              '& .MuiMenuItem-root': {
                color: '#6C513C',         
                fontWeight: 'bold',
                py: 5,      
                '&:hover': {
                  backgroundColor: '#e2efd9', 
                  borderLeft: '10px solid #6F874B',
                },
              }
            }}
          >
            <Box sx={{ display: 'flex', width: '100%', minHeight: '300px' }}>
              <Box sx={{
                width: '250px', 
                borderRight: '1px solid #e0e0e0', 
                py: 1 
              }}>
                <MenuItem onClick={handleClose}>Utilities</MenuItem>
                <MenuItem onClick={handleClose}>Transportation</MenuItem>
                <MenuItem onClick={handleClose}>Healthcare</MenuItem>
                <MenuItem onClick={handleClose}>Education</MenuItem>
                <MenuItem onClick={handleClose}>Groceries</MenuItem>
              </Box>
              <Box sx={{
                flexGrow: 1, 
                p: 4,       
                backgroundColor: '#f9f9f9' 
              }}>
                <Typography variant="h5" color="primary" gutterBottom>
                  Featured Content
                </Typography>
                <Typography variant="body1">
                  anything u want here
                </Typography>
              </Box>
            </Box>
          </Menu>
        </Toolbar>
      </AppBar>
    </>
  )
}