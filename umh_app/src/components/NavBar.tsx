import { useState } from "react";
import { Box, AppBar, Toolbar, Typography, CssBaseline, Stack, Menu, MenuItem, Drawer, IconButton } from "@mui/material"
import Themedbutton from "./Themedbutton";
import bukitLogo from "../assets/images/bukit.png";
import MenuIcon from '@mui/icons-material/Menu';
import EducationPicture from "../assets/images/Education-UMH.jpeg"
import GroceriesPicture from "../assets/images/Groceries-UMH.png"
import HealthcarePicture from "../assets/images/Healthcare-UMH.png"
import TransportationPicture from "../assets/images/Transportation-UMH.png"
import UtilitiesPicture from "../assets/images/Utilities-UMH.jpg"
import OthersPicture from "../assets/images/Others-UMH.jpg"


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
        alignSelf: 'center',
        backgroundColor: 'transparent'
      }}
    ></Themedbutton>
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
  const [HasLogIn, setHasLogIn] = useState(false);
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
              display: { xs: 'none', md: 'flex' }

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
                        width: "1200px",
                        maxWidth: "100%",
                        height: "600px",
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
                        width: "1200px",
                        maxWidth: "100%",
                        height: "400px",
                        objectFit: "contain",
                        borderRadius: 2,
                      }}
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
                {HasLogIn ? <Account /> : <NoAccount />}
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
                <Themedbutton color="inherit" title="Utilities" />
                <Themedbutton color="inherit" title="Transportation" />
                <Themedbutton color="inherit" title="Healthcare" />
                <Themedbutton color="inherit" title="Education" />
                <Themedbutton color="inherit" title="Groceries" />
                <Themedbutton color="inherit" title="Others" />
                <Themedbutton color="inherit" title="News" />
                <Themedbutton color="inherit" title="About" />
              </Box>

            </Drawer>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  )
}