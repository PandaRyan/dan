import { useState, useEffect } from "react";
import { Box, AppBar, Toolbar, Typography, CssBaseline, Stack} from "@mui/material"
import ThemedButton from "./Themedbutton";
import bukitLogo from "../assets/images/bukit.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";


const NoAccount = () => {

  const navigate = useNavigate();

  const handleAuth = () => {
    navigate('/signin')
  } 
  return (
    <ThemedButton color="inherit" 
      title="Login/SignUp"
      sx={{
        border: '1px solid white',
        borderRadius: '0px', 
        alignSelf: 'center'
      }}
      onClick = {handleAuth}
    ></ThemedButton> 
  )
}


export const NavBar = () => {
  const[name, setName] = useState('');
  const navigate = useNavigate();
  const { authUser, ContextLogout } = useAuth();

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
              <ThemedButton color="inherit" title="Groceries" ></ThemedButton>
              <ThemedButton color="inherit" title="Utilities" ></ThemedButton>
              <ThemedButton color="inherit" title="Transportation" ></ThemedButton>
              <ThemedButton color="inherit" title="Healthcare" ></ThemedButton>
              <ThemedButton color="inherit" title="Education" ></ThemedButton>
              <ThemedButton color="inherit" title="News" ></ThemedButton>
              <ThemedButton color="inherit" title="About"></ThemedButton>
              {!!authUser ? (<ThemedButton color="inherit" title={`Welcome Back, ${authUser.name}`} onClick={ContextLogout}/>)  : <NoAccount />} 
            </Stack>  
        </Toolbar>
    </AppBar>
    </>
  )
}