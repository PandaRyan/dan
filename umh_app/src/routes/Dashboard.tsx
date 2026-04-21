import { Box, Grid, type GridProps } from '@mui/material';

import EducationPicture from "../assets/images/Education-UMH.jpeg"
import GroceriesPicture from "../assets/images/Groceries-UMH.png"
import HealthcarePicture from "../assets/images/Healthcare-UMH.png"
import TransportationPicture from "../assets/images/Transportation-UMH.png"
import UtilitiesPicture from "../assets/images/Utilities-UMH.jpg"
import OthersPicture from "../assets/images/Others-UMH.jpg"
import SchoolIcon from '@mui/icons-material/School';


const categoryImages: Record<string, string> = {
  Utilities: UtilitiesPicture,
  Transportation: TransportationPicture,
  Healthcare: HealthcarePicture,
  Education: EducationPicture,
  Groceries: GroceriesPicture,
  Others: OthersPicture,
};

const categoryText: Record<string, { header: string, description: string, icons: React.ReactNode[]}> = {
  Utilities: {
    header: "Utilities" ,
    description: "Explore the latest utility tariffs, check your eligibility for targeted electricity subsidies, and track consumption.",
    icons: [
      <SchoolIcon key="bolt" fontSize="large" />,
    ]
  },
  Transportation: {
    header: "Transportation",
    description: "Navigate petrol subsidy rationalization updates and explore My50 monthly travel passes for RapidKL.",
    
    icons: [
      <SchoolIcon key="bolt" fontSize="large" />,
    ]
  },
  Healthcare: {
    header: "Healthcare",
    description: "Understand national health insurance schemes like the Madani Medical Scheme and find affordable clinic locations.",
    icons: [
      <SchoolIcon key="bolt" fontSize="large" />,
    ]
  },
  Education: {
    header: "Education",
    description: "Discover subsidies for educational materials, early schooling assistance, and higher education benefits such as Gemini for Education.",
    icons: [
      <SchoolIcon key="bolt" fontSize="large" />,
    ]
  },
  Groceries: {
    header: "Groceries",
    description: "Stay resilient against inflation with MyKasih credits, and the latest Jualan Rahmah locations.",
    icons: [
      <SchoolIcon key="bolt" fontSize="large" />,
    ]
  },
  Others: {
    header: "Others",
    description: "Covers every other aspects of assistance you can think of! From Sumbangan Tunai Rahmah (STR) to tax reliefs, you name the category, we'll match an available subsidy.",
    icons: [
      <SchoolIcon key="bolt" fontSize="large" />,
    ]
  },
};

interface ThemedGrid extends GridProps {
  title: string;
}


const ThemedGrid = ({ title, sx, onClick, ...props }: ThemedGrid) => {
  return (
    <>
      <Box
      onClick = {onClick}
  sx={{
    width: 450,
    minHeight:600,
    m: 2,
    p: 3,
    cursor: 'pointer',

    // Maintains the "Bento Box" inset style
    display: 'flex',
    flexDirection: 'column',
    gap: 1.5,
    borderRadius: '32px',
    backgroundColor: '#ffffff',
    boxShadow: `
      0 10px 20px rgba(13,18,6,0.05), // Natural light-green shadow tint
      inset 0 1px 0 rgba(255,255,255,0.7) // Clean highlight edge
    `,
    border: '1px solid rgba(13,18,6,0.03)', // Barely visible organic edge

    position: 'relative',
    overflow: 'hidden',
    transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    '&:hover': {
      transform: 'translateY(-10px) scale(1.02)',
      boxShadow: `
        0 15px 30px rgba(13,18,6,0.1),
        inset 0 1px 0 rgba(255,255,255,0.8)
      `,
      '& .glow-orb': { 
        
      },
      '& .card-image': {
        transform: 'scale(1.05)',
      }
    },
  }}
>
 
  <Box/>
  
  {/* Header */}
  <Box sx={{ zIndex: 1, px: 1 }}>
    <h1
      style={{
        margin: 0,
        fontSize: '2.2rem',
        fontWeight: 800,
        letterSpacing: '-0.04em',
        color: '#664a35',
      }}
    >
      {categoryText[title].header}
    </h1>
  </Box>

  {/* Picture Container (Inset Style) */}
  <Box
    sx={{
      width: '100%',
      height: 280,
      borderRadius: '20px',
      overflow: 'hidden',
      zIndex: 1,
      position: 'relative',
      boxShadow: `
        inset 0 2px 4px rgb(69, 39, 20), // Recess depth shadow
        0 1px 0 rgba(88, 34, 11, 0.74) // Glass highlight line below
      `,
      border: '1px solid rgba(67, 90, 36, 0.06)', 
    }}
  >
    <img
      className="card-image"
      src={categoryImages[title]}
      alt="Education"
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        transition: 'transform 0.7s ease',
      }}
    />
  </Box>
  {/* Icons */}
  <Box sx={{
    }}> 
    <SchoolIcon fontSize="large"/>
  </Box>
  {/* Footer Text */}
  <Box
    sx={{
      zIndex: 1,
      mb: 1,
      color: '#5d4430',
      fontSize: '1.05rem',
      lineHeight: 1.6,
      fontWeight: 400,
      letterSpacing: '-0.01em',
    }}
  >
    {categoryText[title].description}
  </Box>
</Box>
    </>
  )
}

export const Dashboard = () => {
  return (
    <Box sx={{ width: '100%', backgroundColor: '#C8E1A0', overflow: 'hidden'}}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{justifyContent: 'center', alignContent: 'center', mt:6}}>
        <ThemedGrid title={'Utilities'} />
        <ThemedGrid title={'Transportation'} />
        <ThemedGrid title={'Healthcare'} />
        <ThemedGrid title={'Education'} />
        <ThemedGrid title={'Groceries'} />
        <ThemedGrid title={'Others'} />
      </Grid>
    </Box>
  )
}