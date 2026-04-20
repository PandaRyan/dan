import React from 'react';
import { Box, Typography, Button, Container, Card, CardContent } from '@mui/material';
import { ArrowRight, Zap, GlobeLock, Flag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import bgimageurl from '../assets/images/rampartcreek.jpg';
import umhackathonimageurl from '../assets/images/umhackathonlogo.png';
import zaiimageurl from '../assets/images/zailogo.svg';

const features = [
  {
    title: 'Always Updated',
    description: 'We track the latest government subsidies and updates in real time, so you never miss one!',
    icon: <Zap size={32} color="#6B7F49" />, 
  },
  {
    title: 'Privacy Enforced',
    description: 'Your data stays with you. We never store your conversations, guaranteed.',
    icon: <GlobeLock size={32} color="#6B7F49" />, 
  },
  {
    title: 'Malaysian Core',
    description: 'From MyKasih grocery credits to subsidized RON 95 petrol, get advice tailored to the Malaysian context.',
    icon: <Flag size={32} color="#6B7F49" />,
  },
];

export const LandingPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Box sx={{ bgcolor: '#F5F6F8', minHeight: '100vh', pb: 10, fontFamily: 'sans-serif' }}>
        
        <Box sx={{bgcolor: '#FFFFFF', position: 'relative', overflow: 'hidden'}}>
            <Box sx={{backgroundImage: `url(${bgimageurl})`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.9, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}} />
            
            <Container maxWidth="lg" sx={{ pt: { xs: 8, md: 12 }, pb: 8, textAlign: 'center', position: 'relative' }}>
                <Box sx={{ position: 'relative', zIndex: 1 }}>
                    <Typography variant="h2" sx={{ color: '#6B5441', fontWeight: 800, mb: 2, fontSize: { xs: '3rem', md: '5rem' }, letterSpacing: '-0.02em' }}>
                    Sikit-sikit, lama-lama jadi <br />
                        <Box component="span" sx={{ 
                            background: 'linear-gradient(to right, #A9CF93, #BC9A7D)', 
                            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' 
                        }}>
                            bukit
                        </Box>
                    </Typography>
                    
                    <br/>
                    <Typography variant="h6" sx={{ color: '#F5F6F8', opacity: 0.9, maxWidth: '800px', mx: 'auto', mb: 6, lineHeight: 1.7, fontWeight: 600 }}>
                        Gather all fragmented unclaimed subsidies introduced by the Government of Malaysia, making sure you don't miss out on any benefits!
                    </Typography>

                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 3, justifyContent: 'center', alignItems: 'center'}}>
                        <Button 
                            variant="contained" size="large" endIcon={<ArrowRight size={20} />}
                            sx={{ 
                            bgcolor: '#F5F6F8', color: '#6B7F49', px: 5, py: 2, borderRadius: '50px', fontSize: '1.1rem', textTransform: 'none', fontWeight: 'bold',
                            '&:hover': { bgcolor: '#EAECE6' }, width: { xs: '100%', sm: 'auto' }
                            }}
                            onClick = {() => navigate('/dashboard')}
                        >
                            Get Started
                        </Button>
                    </Box>
                </Box>
            </Container>
        </Box>

        <Box sx={{ py: 4, bgcolor: '#BC9A7D' }}>
            <Typography sx={{ textAlign: 'center', color: '#6B5441', textTransform: 'uppercase', letterSpacing: 2, fontSize: '0.875rem', mb: 3, fontWeight: 700 }}>
            Powered By
            </Typography>
            <Box sx={{ 
            display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: { xs: 4, md: 10 }, 
            color: '#6B5441', opacity: 0.85 
            }}>
                <Box 
                component="img"
                src={umhackathonimageurl}
                alt="UMHackathon Logo"
                sx={{ 
                    cursor: 'pointer',
                    height: { xs: 30, md: 40 }, 
                    filter: 'grayscale(100%) brightness(0.5)', 
                    opacity: 0.8,
                    '&:hover': { filter: 'none', opacity: 1 } 
                }}
                onClick={() => window.open('https://umhackathon.org/', '_blank')}
                />

                <Box 
                component="img"
                src={zaiimageurl}
                alt="Z.ai Logo"
                sx={{ 
                    cursor: 'pointer',
                    height: { xs: 30, md: 40 }, // Controls the size
                    filter: 'grayscale(100%) brightness(0.5)', // Makes it blend with the tan background
                    opacity: 0.6,
                    '&:hover': { filter: 'none', opacity: 1 } // Colors return on hover
                }}
                onClick={() => window.open('https://z.ai/', '_blank')}
                />
            </Box>
        </Box>

        <Container maxWidth="lg" sx={{ pt: 12, bgcolor: "#F9F7F5"}}>
            <Box sx={{ textAlign: { xs: 'center', md: 'left' }, mb: 8 }}>
            <Typography variant="h3" sx={{ color: '#6D553F', fontWeight: 800, mb: 2 }}>Built for the long climb.</Typography>
            <Typography variant="h6" sx={{ color: '#916533', fontWeight: 500 }}>Designed to provide you tailored support for your savings journey.</Typography>
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 4 }}>
            {features.map((feature, index) => (
                <Card key={index} sx={{ 
                bgcolor: '#ffffff', border: '1px solid rgba(169, 207, 147, 0.4)', borderRadius: '24px', height: '100%', boxShadow: 'none',
                transition: 'transform 0.2s, box-shadow 0.2s', 
                '&:hover': { transform: 'translateY(-5px)', boxShadow: '0 10px 30px rgba(107, 127, 73, 0.1)' }
                }}>
                    <CardContent sx={{ p: 5 }}>
                        <Box sx={{ bgcolor: 'rgba(107, 127, 73, 0.1)', width: 64, height: 64, borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
                            {feature.icon}
                        </Box>
                        <Typography variant="h5" sx={{ color: '#6D553F', fontWeight: 700, mb: 2 }}>
                            {feature.title}
                        </Typography>
                        <Typography sx={{ color: '#6D553F', opacity: 0.8, lineHeight: 1.7 }}>
                            {feature.description}
                        </Typography>
                    </CardContent>
                </Card>
            ))}
            </Box>
        </Container>
        
        </Box>
    );
};