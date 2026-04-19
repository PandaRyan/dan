import React, { useState } from 'react';
import { Box, Typography, Container, Link } from '@mui/material';
import { ThemedTextField } from '../ThemedTextField';
import Themedbutton from '../Themedbutton';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const SignIn: React.FC = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const { UserContextLogin } = useAuth();
    const navigate = useNavigate();
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try {
            const response = await fetch('http://localhost:5000/auth/signin', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })

            const data = await response.json();

            if (data.status === "success") {
                alert("login successful!")
                UserContextLogin({token: data.token, name: data.name})
                
                if (data.onboarding===false)
                    navigate('/signup/onboarding')
                else 
                    navigate ('/')
            }
            else {
                alert("incorrect username/password")
            }
        } catch (err) {
            alert(err)
        }
    };

    return (
        <Container component="main" maxWidth="sm">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    backgroundColor: '#FFFFFF',
                    padding: 4,
                    borderRadius: 2,
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)',
                }}
            >
                <Typography component="h1" variant="h5" sx={{ color: '#6B5441', fontWeight: 'bold', mb: 2 }}>
                    Welcome Back!
                </Typography>

                <Box component="form" sx={{ mt: 1, width: '100%' }}>
                    <ThemedTextField
                        name="email"
                        label="Email Address"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <ThemedTextField
                        name="password"
                        label="Password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                    />

                    <Box sx={{ mt: 4, mb: 2, display: 'flex', justifyContent: 'center' }}>
                        <Themedbutton
                            type="submit"
                            title="SIGN IN"
                            onClick={handleSubmit}
                            sx={{ width: '200px', padding: '8px', fontSize: '14px' }}
                        />
                    </Box>

                    <Box sx={{ textAlign: 'center', mt: 2 }}>
                        <Link href="/signup" variant="body2" sx={{ color: '#74924A', textDecoration: 'none', fontWeight: 'bold' }}>
                            {"Don't have an account? Sign Up"}
                        </Link>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};