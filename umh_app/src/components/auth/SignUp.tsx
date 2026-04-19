import React, { useState } from 'react';
import { Box, Typography, Container, Link, MenuItem } from '@mui/material';

import { ThemedTextField } from '../ThemedTextField';
import Themedbutton from '../Themedbutton';
import { useAuth } from '../context/AuthContext';

const incomeCategories = [
    { value: 'B40', label: 'B40 (Household Income < RM 5,250)' },
    { value: 'M40', label: 'M40 (Household Income RM 5,250 - RM 11,819)' },
    { value: 'T20', label: 'T20 (Household Income > RM 11,820)' },
];

const malaysianStates = [
    'Johor', 'Kedah', 'Kelantan', 'Melaka', 'Negeri Sembilan',
    'Pahang', 'Perak', 'Perlis', 'Penang', 'Sabah', 'Sarawak',
    'Selangor', 'Terengganu', 'W.P. Kuala Lumpur', 'W.P. Labuan', 'W.P. Putrajaya'
];

export const SignUp: React.FC = () => {
    const [step, setStep] = useState(1);    //track the state
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    const [birthYear, setBirthYear] = useState<string>('');
    const [state, setState] = useState<string>('');
    const [incomeCategory, setIncomeCategory] = useState<'B40' | 'M40' | 'T20' | ''>('');

    const [signUpFormData, setSignUpFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const [onboardingFormData, setOnboardingFormData] = useState({
        birthYear: '',
        state: '',
        incomeCategory: ''
    })

    const { UserContextLogin } = useAuth();

    const handleSignupValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target

        if (name === 'name') {
            setName(value);
        }
        else if (name === 'email') {
            setEmail(value);
        }
        else if (name === 'password') {
            setPassword(value);
        }
        else if (name === 'confirmPassword') {
            setConfirmPassword(value);
        }
    }

    const handleOnboardingValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target

        if (name === 'birthYear') {
            setBirthYear(value)
        }
        else if (name === 'state') {
            setState(value)
        }
    }

    const handleBack = () => setStep(1);

    const handleNext = async (event: React.FormEvent) => {
        event.preventDefault();
        
        try {
            signUpFormData.name = name
            signUpFormData.email = email
            
            if (password===confirmPassword)
                signUpFormData.password = password
            else {
                console.log("password mismatch")
                return
            }

            const response = await fetch('http://localhost:5000/auth/signup', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(signUpFormData)
            })

            const data = await response.json();

            if (data.status === "success") {
                alert("sign up successful!")
                await UserContextLogin({token: data.token, name: data.name})
                setStep(2)
            }
            else {
                alert("signup unsuccessful: "+data.message)
            }
        } catch (err) {
            alert(err)
        }
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const token = localStorage.getItem('token') || '';

        onboardingFormData.birthYear = birthYear
        onboardingFormData.incomeCategory = incomeCategory
        onboardingFormData.state = state

        if (token) {
            try {
                const response = await fetch('http://localhost:5000/auth/signup/onboarding', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    },
                    body: JSON.stringify(onboardingFormData)
                })
            } catch(err) {
                alert(err)
            }
        }
        else {
            //navigate to signin
        }
    }

    
    const [yearError, setYearError] = useState('');

    /*
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (name === 'birthYear') {
            const onlyNumbers = value.replace(/[^0-9]/g, '');      //remove anything thats not 0-9

            if (onlyNumbers.length <= 4) {      //only 4 digits ollowed
                setOnboardingFormData({ ...onboardingFormData, [name]: onlyNumbers });
            }
            return;
        }

        setSignUpFormData({
            ...signUpFormData,       //defaut for others
            [name]: value
        });
    };

    const handleNext = async (e: React.FormEvent) => {
        e.preventDefault();
        //signup api here
        setStep(2);
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const numericYear = parseInt(formData.birthYear, 10);       //conert to real number for math check

        if (numericYear < 1900 || numericYear > 2018) {
            setYearError('Please enter a valid year (between 1900 and 2008).');
            return;
        }

        setYearError('');
        console.log('Sending this ALL to the backend:', formData);
    };

    */

    return (
        <Container component="main" maxWidth="sm">
            <Box
                sx={{
                    marginTop: 8,
                    marginBottom: 8,
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
                    {step === 1 ? 'Create an Account' : 'Welcome! Tell us about yourself'}
                </Typography>

                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>

                    {step === 1 && (
                        <>
                            <ThemedTextField name="name" label="Full Name" value={name} onChange={handleSignupValueChange} />
                            <ThemedTextField name="email" label="Email Address" type="email" value={email} onChange={handleSignupValueChange} />
                            <ThemedTextField name="password" label="Password" type="password" value={password} onChange={handleSignupValueChange} />
                            <ThemedTextField name="confirmPassword" label="Confirm Password" type="password" value = {confirmPassword} onChange={handleSignupValueChange} />

                            <Box sx={{ mt: 4, mb: 2, display: 'flex', justifyContent: 'center' }}>
                                <Themedbutton
                                    type="button"
                                    title="CONTINUE"
                                    onClick = {handleNext}
                                    sx={{ width: '200px', padding: '8px', fontSize: '14px' }}
                                />
                            </Box>
                        </>
                    )}

                    {step === 2 && (
                        <>
                            <ThemedTextField
                                name="birthYear"
                                label="Birth Year (e.g. 1995)"
                                type="text"
                                inputMode="numeric"
                                value={birthYear}
                                onChange={handleOnboardingValueChange}
                                error={!!yearError}
                                helperText={yearError}
                            />
                            <ThemedTextField select name="state" label="State" value={state} onChange={handleOnboardingValueChange}>
                                {malaysianStates.map((state) => (
                                    <MenuItem key={state} value={state}>
                                        {state}
                                    </MenuItem>
                                ))}
                            </ThemedTextField>
                            <ThemedTextField
                                select
                                name="incomeCategory"
                                label="Income Category"
                                value={incomeCategory}
                                onChange={handleOnboardingValueChange}
                            >
                                {incomeCategories.map((category) => (
                                    <MenuItem key={category.value} value={category.value}>
                                        {category.label}
                                    </MenuItem>
                                ))}
                            </ThemedTextField>

                            <Box sx={{ mt: 4, mb: 2, display: 'flex', justifyContent: 'center', gap: 2 }}>
                                <div onClick={handleBack}>
                                    <Themedbutton
                                        type="button"
                                        title="⬅ BACK"
                                        sx={{ width: '100px', padding: '8px', fontSize: '12px' }}
                                    />
                                </div>
                                <div>
                                    <Themedbutton
                                        type="submit"
                                        title="COMPLETE SIGN UP"
                                        sx={{ width: '220px', padding: '8px', fontSize: '14px' }}
                                    />
                                </div>
                            </Box>
                        </>
                    )} 

                    <Box sx={{ textAlign: 'center', mt: 2 }}>
                        <Link href="/signin" variant="body2" sx={{ color: '#74924A', textDecoration: 'none', fontWeight: 'bold' }}>
                            {"Already have an account? Sign In"}
                        </Link>
                    </Box>

                </Box>
            </Box>
        </Container>
    );
};