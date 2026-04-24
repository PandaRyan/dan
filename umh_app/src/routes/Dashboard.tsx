import { Box, Grid, type GridProps } from '@mui/material';

import EducationPicture from "../assets/images/Education-UMH.jpeg"
import GroceriesPicture from "../assets/images/Groceries-UMH.png"
import HealthcarePicture from "../assets/images/Healthcare-UMH.png"
import TransportationPicture from "../assets/images/Transportation-UMH.png"
import UtilitiesPicture from "../assets/images/Utilities-UMH.jpg"
import OthersPicture from "../assets/images/Others-UMH.jpg"
import BoltIcon from '@mui/icons-material/Bolt';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import SchoolIcon from '@mui/icons-material/School';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';


const categoryImages: Record<string, string> = {
  Utilities: UtilitiesPicture,
  Transportation: TransportationPicture,
  Healthcare: HealthcarePicture,
  Education: EducationPicture,
  Groceries: GroceriesPicture,
  Others: OthersPicture,
};

const categoryText: Record<string, { header: string, description: string, icons: React.ReactNode[] }> = {
  Utilities: {
    header: "Utilities",
    description: "Check your eligibility for Rebat Elektrik and water subsidies through PADU.",
    icons: [
      <BoltIcon key="bolt" fontSize="large" />,
    ]
  },
  Transportation: {
    header: "Transportation",
    description: "Navigate fuel assistance via BUDI MADANI and explore public transit like My50 and FLYsiswa.",

    icons: [
      <DirectionsBusIcon key="bus" fontSize="large" />,
    ]
  },
  Healthcare: {
    header: "Healthcare",
    description: "Access fully subsidized care via Skim Perubatan Madani, PEKA B40 and mySalam.",
    icons: [
      <LocalHospitalIcon key="hospital" fontSize="large" />,
    ]
  },
  Education: {
    header: "Education",
    description: "Discover Bantuan Awal Persekolahan (BAP) for school, book vouchers, and PTPTN.",
    icons: [
      <SchoolIcon key="school" fontSize="large" />,
    ]
  },
  Groceries: {
    header: "Groceries",
    description: "Manage your cost of living with Sumbangan Asas Rahmah (SARA) and locate the nearest Jualan Payung Rahmah.",
    icons: [
      <LocalGroceryStoreIcon key="grocery" fontSize="large" />,
    ]
  },
  Others: {
    header: "Others",
    description: "Explore Sumbangan Tunai Rahmah (STR), e-Madani digital wallets and income tax reliefs.",
    icons: [
      <AccountBalanceWalletIcon key="wallet" fontSize="large" />,
    ]
  },
};

interface ThemedGrid extends GridProps {
  title: string;
}


const ThemedGrid = ({ title, onClick }: ThemedGrid) => {
  return (
    <>
      <Box
        onClick={onClick}
        sx={{
          width: 450,
          minHeight: 600,
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

        <Box />

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
          {categoryText[title].icons}
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
    <Box sx={{ width: '100%', backgroundColor: '#C8E1A0', overflow: 'hidden' }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ justifyContent: 'center', alignContent: 'center', mt: 6 }}>
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