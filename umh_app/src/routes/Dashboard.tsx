import { Box, Grid, type GridProps } from '@mui/material';

import EducationPicture from "../assets/images/Education-UMH.jpeg"
import GroceriesPicture from "../assets/images/Groceries-UMH.png"
import HealthcarePicture from "../assets/images/Healthcare-UMH.png"
import TransportationPicture from "../assets/images/Transportation-UMH.png"
import UtilitiesPicture from "../assets/images/Utilities-UMH.jpg"
import OthersPicture from "../assets/images/Others-UMH.jpg"
import BoltIcon from '@mui/icons-material/Bolt';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import SchoolIcon from '@mui/icons-material/School';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import TrainIcon from '@mui/icons-material/Train';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import MedicationIcon from '@mui/icons-material/Medication';
import HealingIcon from '@mui/icons-material/Healing';
import AccessibleIcon from '@mui/icons-material/Accessible';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import StorefrontIcon from '@mui/icons-material/Storefront';
import SetMealIcon from '@mui/icons-material/SetMeal';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import AddIcCallIcon from '@mui/icons-material/AddIcCall';
import { useNavigate } from 'react-router-dom';


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
    description: "Stop worrying about high utility bills. Our tool connects your profile with the latest government data to automatically see if you can lower your monthly expenses. We’ll help you check your eligibility for Rebat Elektrik and water subsidies through PADU so you can keep more money in your pocket for your family.",
    icons: [
      <BoltIcon key="bolt" fontSize="large" />, <WaterDropIcon key="bolt" fontSize="large" />, <EmojiObjectsIcon key="bolt" fontSize="large" />
    ]
  },
  Transportation: {
    header: "Transportation",
    description: "Get moving without the financial stress. We help you navigate monthly fuel assistance via BUDI MADANI and maximize your travel with unlimited transit passes like My50. For students, we make it easy to explore flight subsidies through FLYsiswa, ensuring you get the most out of every journey while keeping your transport costs low.",

    icons: [
      <DirectionsBusIcon key="bus" fontSize="large" />, <TrainIcon key="bus" fontSize="large" />, <LocalGasStationIcon key="bus" fontSize="large" />,
    ]
  },
  Healthcare: {
    header: "Healthcare",
    description: "Your health should never be a financial burden. We help you access fully subsidized medical care through Skim Perubatan Madani, ensuring you can visit private clinics for free when you're unwell. Our navigator also checks your eligibility for PEKA B40 health screenings and helps you understand the protection offered by mySalam, so you and your family can get the treatment you need with total peace of mind.",
    icons: [
      <MedicationIcon key="hospital" fontSize="large" />, <HealingIcon key="hospital" fontSize="large" />, <AccessibleIcon key="hospital" fontSize="large" />,
    ]
  },
  Education: {
    header: "Education",
    description: "Investing in your children’s future shouldn’t be a struggle. We help you secure the support your family needs, from immediate school expenses through Bantuan Awal Persekolahan (BAP) to digital book vouchers for students. Our tool also simplifies the path to higher education by helping you navigate PTPTN applications and repayment options, ensuring that every student has the tools and funding to succeed in their studies.",
    icons: [
      <SchoolIcon key="school" fontSize="large" />, <LocalLibraryIcon key="school" fontSize="large" />, <SquareFootIcon key="school" fontSize="large" />,
    ]
  },
  Groceries: {
    header: "Groceries",
    description: "Manage your daily expenses with confidence and ease. We help you track your Sumbangan Asas Rahmah (SARA) credits so you always know exactly how much you have for essential groceries. Our navigator also helps you locate the nearest Jualan Payung Rahmah, connecting you to the best local deals on household items and food, ensuring you get the most value for every Ringgit spent on your family’s needs.",
    icons: [
      <LocalGroceryStoreIcon key="grocery" fontSize="large" />, <StorefrontIcon key="school" fontSize="large" />, <SetMealIcon key="school" fontSize="large" />,
    ]
  },
  Others: {
    header: "Others",
    description: "Can't find exactly what you’re looking for? Don't worry—we’ve still got you covered. From tracking your Sumbangan Tunai Rahmah (STR) payments and e-Madani digital wallet credits to uncovering hidden income tax reliefs, our platform is built to catch every opportunity. Whether it’s a new government initiative or a niche grant we haven't listed yet, our AI stays updated in real-time to ensure you never miss a chance to strengthen your family's 'Ringgit Resilience'.",
    icons: [
      <AccountBalanceWalletIcon key="wallet" fontSize="large" />, <AddIcCallIcon key="school" fontSize="large" />, <FamilyRestroomIcon key="school" fontSize="large" />,
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
            mb: 1.5,
            color: '#573d28', // Your specific deep earthy brown
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
            fontSize: '1.05rem',
            lineHeight: 1.6, // Slightly more air to prevent the dark color from feeling heavy
            fontWeight: 500, // Medium weight: The "sweet spot" for modern descriptions
            letterSpacing: '-0.01em', // Subtle tightening for a clean, modern look
            opacity: 0.95, // Keeps it sharp but prevents it from feeling "harsh"
          }}
        >
          {categoryText[title].description}
        </Box>
      </Box>
    </>
  )
}

export const Dashboard = () => {
  const navigate = useNavigate();

  const handleCardClick = (category: string) => {   // Navigate to the chat page for the selected category
    navigate('/chat/' + category.toLowerCase());    // Convert category to lowercase
  };

  return (
    <Box sx={{ width: '100%', backgroundColor: '#C8E1A0', overflow: 'hidden' }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ justifyContent: 'center', alignContent: 'center', mt: 6 }}>
        <ThemedGrid
          title={'Utilities'}
          onClick={() => handleCardClick('Utilities')}
        />
        <ThemedGrid
          title={'Transportation'}
          onClick={() => handleCardClick('Transportation')}
        />
        <ThemedGrid
          title={'Healthcare'}
          onClick={() => handleCardClick('Healthcare')}
        />
        <ThemedGrid
          title={'Education'}
          onClick={() => handleCardClick('Education')}
        />
        <ThemedGrid
          title={'Groceries'}
          onClick={() => handleCardClick('Groceries')}
        />
        <ThemedGrid
          title={'Others'}
          onClick={() => handleCardClick('Others')}
        />
      </Grid>
    </Box>
  )
}