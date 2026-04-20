import { useState, useEffect } from "react";
import { Box, AppBar, Toolbar, Typography, CssBaseline, Stack, Menu, MenuItem, Drawer, IconButton } from "@mui/material"
import ThemedButton from "./Themedbutton";
import bukitLogo from "../assets/images/bukit.png";
import MenuIcon from '@mui/icons-material/Menu';
import EducationPicture from "../assets/images/Education-UMH.jpeg"
import GroceriesPicture from "../assets/images/Groceries-UMH.png"
import HealthcarePicture from "../assets/images/Healthcare-UMH.png"
import TransportationPicture from "../assets/images/Transportation-UMH.png"
import UtilitiesPicture from "../assets/images/Utilities-UMH.jpg"
import OthersPicture from "../assets/images/Others-UMH.jpg"
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
        alignSelf: 'center',
        backgroundColor: 'transparent'
      }}
      onClick={handleAuth}
    ></ThemedButton>
  )
}

const categoryImages: Record<string, string> = {
  Utilities: UtilitiesPicture,
  Transportation: TransportationPicture,
  Healthcare: HealthcarePicture,
  Education: EducationPicture,
  Groceries: GroceriesPicture,
  Others: OthersPicture,
};

const categoryText: Record<string, { title: string, body: string }> = {
  Utilities: {
    title: "Electricity & Water",
    body: "Explore the latest utility tariffs, check your eligibility for targeted electricity subsidies, and track consumption."
  },
  Transportation: {
    title: "Commute & Subsidies",
    body: "Navigate petrol subsidy rationalization updates and explore My50 monthly travel passes for RapidKL."
  },
  Healthcare: {
    title: "Healthcare Benefits",
    body: "Understand national health insurance schemes like the Madani Medical Scheme and find affordable clinic locations."
  },
  Education: {
    title: "Education Funds",
    body: "Discover subsidies for educational materials, early schooling assistance, and higher education benefits such as Gemeni for Education."
  },
  Groceries: {
    title: "Groceries & Rahmah",
    body: "Stay resilient against inflation with MyKasih credits, and the latest Jualan Rahmah locations."
  },
  Others: {
    title: "General Assistance",
    body: "Covers every other aspects of assistance you can think of! From Sumbangan Tunai Rahmah (STR) to tax reliefs, you name the category, we'll match an available subsidy."
  },
};


export const NavBar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState<null | HTMLElement>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  const handleOpenDrawer = (event: React.MouseEvent<HTMLElement>) => {
    setIsDrawerOpen(event.currentTarget);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(null);
  };

  const openDrawer = Boolean(isDrawerOpen)

  const open = Boolean(anchorEl)

  //open menu
  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  //close menu and reset image
  const handleClose = () => {
    setAnchorEl(null);
    setHoveredCategory(null);
  };

  const [name, setName] = useState('');
  const navigate = useNavigate();
  const { authUser, ContextLogout } = useAuth();

  const handleNewsClick = () => {
    navigate('/news');
  }

  const handleLogoClick = () => {
    navigate('/');
  }

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
                cursor: 'pointer',
                height: 70,
                width: 'auto',
                my: 'auto',
                display: 'flex',
              }}
              onClick={handleLogoClick}
            />
          </Typography>
          <Stack direction="row" spacing={2}
            sx={{
              height: 70,
              width: 'auto',
              display: { xs: 'none', md: 'flex' }

            }}
          >

            <ThemedButton color="inherit" title="Dashboard"
              onMouseEnter={handleOpen}
              onClick={handleClose}
              sx={{
                backgroundColor: open ? '#7d9e4b' : '#6f874b'
              }}
            />
            <ThemedButton color="inherit" title="News" onClick={handleNewsClick} />
            {!!authUser ? (<ThemedButton color="inherit" title={`Welcome Back, ${authUser.name}`} onClick={ContextLogout} />) : <NoAccount />}
          </Stack>


          <Menu
            anchorEl={anchorEl}
            open={open}
            onClick={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            slotProps={{
              list: {
                onMouseLeave: handleClose,
                sx: { padding: 0 }
              },
              paper: {
                sx: {
                  width: '100vw',
                  maxWidth: '100vw',
                  height: '30vw',
                  maxHeight: '30vw',
                  left: '0px !important',
                  borderRadius: 0,
                  boxShadow: 'none'
                }
              }

            }}
            sx={{
              '& .MuiMenuItem-root': {
                color: '#6C513C',
                fontWeight: 'bold',
                py: 2,
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
                <MenuItem onClick={handleClose} onMouseEnter={() => setHoveredCategory('Utilities')}>Utilities</MenuItem>
                <MenuItem onClick={handleClose} onMouseEnter={() => setHoveredCategory('Transportation')}>Transportation</MenuItem>
                <MenuItem onClick={handleClose} onMouseEnter={() => setHoveredCategory('Healthcare')}>Healthcare</MenuItem>
                <MenuItem onClick={handleClose} onMouseEnter={() => setHoveredCategory('Education')}>Education</MenuItem>
                <MenuItem onClick={handleClose} onMouseEnter={() => setHoveredCategory('Groceries')}>Groceries</MenuItem>
                <MenuItem onClick={handleClose} onMouseEnter={() => setHoveredCategory('Others')}>Others</MenuItem>
              </Box>
              <Box sx={{
                flexGrow: 1,
                backgroundColor: '#f9f9f9',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'stretch',
                justifyContent: 'space-between'
              }}>
                <Box sx={{
                  width: '350px',
                  flexShrink: 0,
                  p: 5,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center'
                }}>


                  <Typography
                    variant="overline"
                    sx={{
                      color: '#6F874B',
                      letterSpacing: 2,
                      fontWeight: 'bold',
                      mb: 1,
                      lineHeight: 1
                    }}
                  >
                    {hoveredCategory ? "RESOURCE CATEGORY" : "WELCOME"}
                  </Typography>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 800,
                      color: '#2d381e',
                      mb: 2,
                      lineHeight: 1.2
                    }}
                  >
                    {hoveredCategory ? categoryText[hoveredCategory].title : "Build Your Resilience"}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: 'text.secondary',
                      mb: 4,
                      lineHeight: 1.6
                    }}
                  >
                    {hoveredCategory ? categoryText[hoveredCategory].body : "Navigate the economic landscape with confidence. Our tools help you break down complex policies and optimize your household budget."}
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      color: '#6F874B',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      width: 'fit-content',
                      transition: '0.2s',
                      '&:hover': {
                        color: '#4a5a32',
                        transform: 'translateX(5px)'
                      }
                    }}
                  >
                  </Box>

                </Box>
                <Box sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  flexGrow: 1,
                  backgroundColor: '#6F874B',
                  pb: 4,
                  pt: 2,
                  pl: 1,
                  pr: 6,
                  borderLeft: '20px solid #6C513C'
                }}>
                  {hoveredCategory ? (
                    <Box
                      component="img"
                      src={categoryImages[hoveredCategory]}
                      alt="Category Preview"
                      sx={{
                        width: "680px",
                        maxWidth: "100%",
                        height: "350px",
                        objectFit: "cover",
                        borderRadius: 2,
                      }}
                    />
                  ) : (
                    <Box
                      component="img"
                      src={bukitLogo}
                      alt="Default Logo"
                      sx={{
                        width: "600px",
                        maxWidth: "100%",
                        height: "350px",
                        maxHeight: '70%',
                        objectFit: "contain",
                        borderRadius: 2,
                      }}
                      onClick={handleLogoClick}
                    />
                  )}
                </Box>
              </Box>
            </Box>
          </Menu>


          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton color="inherit" onClick={handleOpenDrawer}>
              <MenuIcon />
            </IconButton>
            <Drawer open={openDrawer} onClose={handleOpenDrawer} anchor={'right'}
              slotProps={{
                paper: {
                  sx: {
                    backgroundColor: '#C8E1A0'

                  }
                }
              }}
            >
              <IconButton color="inherit" onClick={handleCloseDrawer}>
                <MenuIcon />
              </IconButton>

              <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                mb: 2,
                '& .MuiButtonBase-root': {
                  backgroundColor: '#C8E1A0',
                  color: '#6C513C',
                  '&:hover': {
                    backgroundColor: '#c9ea93',
                    border: '1px solid #6C513C',
                  }
                }
              }}>
                {!!authUser ? (<ThemedButton color="inherit" title={`Welcome Back, ${authUser.name}`} onClick={ContextLogout} />) : <NoAccount />}
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  mt: 0,
                  gap: 0,
                  '& .MuiButtonBase-root': {
                    backgroundColor: '#C8E1A0',
                    color: '#6C513C',
                    borderTop: '1px solid white',
                    borderBottom: '1px solid white',
                    '&:hover': {
                      backgroundColor: '#c9ea93',
                      border: '1px solid #6C513C',
                    }
                  }
                }}
              >
                <ThemedButton color="inherit" title="Utilities" />
                <ThemedButton color="inherit" title="Transportation" />
                <ThemedButton color="inherit" title="Healthcare" />
                <ThemedButton color="inherit" title="Education" />
                <ThemedButton color="inherit" title="Groceries" />
                <ThemedButton color="inherit" title="Others" />
                <ThemedButton color="inherit" title="News" onClick={handleNewsClick} />
              </Box>

            </Drawer>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  )
}