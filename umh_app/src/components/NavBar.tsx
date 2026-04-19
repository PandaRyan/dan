import { useState } from "react";
import { Box, AppBar, Toolbar, Typography, CssBaseline, Stack} from "@mui/material"
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
const[HasLogIn, setHasLogIn] = useState(false);

  return (
    <>
    <CssBaseline />
    <AppBar position="static"
     sx={{
              backgroundColor : '#6F874B',
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
              <Themedbutton color="inherit" title="Groceries" ></Themedbutton>
              <Themedbutton color="inherit" title="Utilities" ></Themedbutton>
              <Themedbutton color="inherit" title="Transportation" ></Themedbutton>
              <Themedbutton color="inherit" title="Healthcare" ></Themedbutton>
              <Themedbutton color="inherit" title="Education" ></Themedbutton>
              <Themedbutton color="inherit" title="News" ></Themedbutton>
              <Themedbutton color="inherit" title="About"></Themedbutton>
               {HasLogIn ? <Account /> : <NoAccount />} 
              </Stack>  
        </Toolbar>
    </AppBar>
    </>
  )
}