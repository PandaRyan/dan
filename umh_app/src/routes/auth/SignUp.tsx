import React, { useEffect, useState } from 'react';
import { Box, Typography, Container, Link, MenuItem } from '@mui/material';
import { ThemedTextField } from '../../components/ThemedTextField';
import Themedbutton from '../../components/Themedbutton';
import { ThemedSnackbar } from '../../components/ThemedSnackBar';
import { useAuth } from '../../components/context/AuthContext';
import { useNavigate } from 'react-router-dom';

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

    const [signUpFormData, setSignUpFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const [snackbarConfig, setSnackbarConfig] = useState<{open: boolean, msg: string, sev: "error" | "success" | "warning"}>({
        open: false,
        msg: '',
        sev: 'success'
    });
    
    const triggerLocalSnackbar = (msg: string, sev: "error" | "success" | "warning") => {
        setSnackbarConfig({open: true, msg, sev});
    };

    const handleClose = () => {
        setSnackbarConfig((prev) => ({...prev, open:false}));
    }


    const { UserContextLogin, triggerSnackbar } = useAuth();
    const navigate = useNavigate();

    const handleSignupValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target

        if (name === 'name') {
            setName(value)
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

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    }


    const handleNext = async (event: React.FormEvent) => {
        event.preventDefault();

        try {                            
            if (name === '') {
                triggerLocalSnackbar("Name cannot be empty", "error")
                return;
            } else {
                signUpFormData.name = name;
            }

            if (!validateEmail(email)) {
                triggerLocalSnackbar("Invalid email", "error")
                return;
            } else {
                signUpFormData.email = email;
            }

            if (password === confirmPassword) {
                signUpFormData.password = password;
            } else {
                triggerLocalSnackbar("Password mismatch", "error")
                return;
            }

            const response = await fetch('http://localhost:5000/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(signUpFormData)
            });

            const data = await response.json();

            if (data.status === "success") {
                triggerSnackbar("Signup successful!", "success")
                await UserContextLogin({ token: data.token, name: data.name });
                navigate('/signup/onboarding');
            } else {
                triggerLocalSnackbar("Signup unsuccessful: "+data.message, "error")
            }
        } catch (err) {
            triggerLocalSnackbar("Signup unsuccessful: "+err, "error")
        }
    }

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
                    Create an Account
                </Typography>


                <>
                    <ThemedTextField name="name" label="Full Name" value={name} onChange={handleSignupValueChange} />
                    <ThemedTextField name="email" label="Email Address" type="email" value={email} onChange={handleSignupValueChange} />
                    <ThemedTextField name="password" label="Password" type="password" value={password} onChange={handleSignupValueChange} />
                    <ThemedTextField name="confirmPassword" label="Confirm Password" type="password" value={confirmPassword} onChange={handleSignupValueChange} />

                    <Box sx={{ mt: 4, mb: 2, display: 'flex', justifyContent: 'center' }}>
                        <Themedbutton
                            type="button"
                            title="CONTINUE"
                            onClick={handleNext}
                            sx={{ width: '200px', padding: '8px', fontSize: '14px' }}
                        />
                    </Box>
                </>

                <Box sx={{ textAlign: 'center', mt: 2 }}>
                    <Link href="/signin" variant="body2" sx={{ color: '#74924A', textDecoration: 'none', fontWeight: 'bold' }}>
                        {"Already have an account? Sign In"}
                    </Link>
                </Box>
            </Box>
            <ThemedSnackbar
                open={snackbarConfig.open}
                message={snackbarConfig.msg}
                severity={snackbarConfig.sev}
                onClose={handleClose}
            />
        </Container>
    );
};

export const Onboarding: React.FC = () => {
    const [birthYear, setBirthYear] = useState<string>('');
    const [state, setState] = useState<string>('');
    const [incomeCategory, setIncomeCategory] = useState<string>('');

    const [onboardingFormData, setOnboardingFormData] = useState({
        birthYear: '',
        state: '',
        incomeCategory: '',
    });

    const { authUser, triggerSnackbar } = useAuth();
    const navigate = useNavigate();
    const [yearError, setYearError] = useState(false);

    const [snackbarConfig, setSnackbarConfig] = useState<{open: boolean, msg: string, sev: "error" | "success" | "warning"}>({
        open: false,
        msg: '',
        sev: 'success'
    });
    
    const triggerLocalSnackbar = (msg: string, sev: "error" | "success" | "warning") => {
        setSnackbarConfig({open: true, msg, sev});
    };

    const handleClose = () => {
        setSnackbarConfig((prev) => ({...prev, open:false}));
    }

    const handleOnboardingValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target

        if (name === 'birthYear') {
            setBirthYear(value)
        }
        else if (name === 'state') {
            setState(value)
        }
        else if (name === 'incomeCategory') {
            setIncomeCategory(value)
        }
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const token = localStorage.getItem('token') || '';

        if (Number(birthYear) <= 2008 && Number(birthYear) > 1900) {
            onboardingFormData.birthYear = birthYear;
        } else {
            setYearError(true);
            triggerLocalSnackbar("Invalid birth year", "error")
            return;
        }

        onboardingFormData.incomeCategory = incomeCategory;
        onboardingFormData.state = state;

        if (authUser) {
            try {
                const response = await fetch('http://localhost:5000/auth/signup/onboarding', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': authUser.token
                    },
                    body: JSON.stringify(onboardingFormData)
                });

                if (response.status === 201) {
                    triggerSnackbar("Onboarding completed!", "success")
                    setTimeout(() => {
                        navigate('/');
                    }, 1000);       //1 second so they see the green mesage
                } else {
                    const errorData = await response.json();
                    triggerLocalSnackbar("Onboarding failed: "+errorData.error, "error")
                }

            } catch (err) {
                triggerLocalSnackbar("Server error: "+err, "error")
            }
        } else {
            navigate('/signin');
        }
    }
    return (
        <>
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
                        Welcome! Tell us about yourself
                    </Typography>


                    <ThemedTextField
                        name="birthYear"
                        label="Birth Year (e.g. 1995, minimum 18 years old)"
                        type="text"
                        inputMode="numeric"
                        value={birthYear}
                        onChange={handleOnboardingValueChange}
                        error={yearError}
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
                        <div>
                            <Themedbutton
                                type="submit"
                                title="COMPLETE SIGN UP"
                                sx={{ width: '220px', padding: '8px', fontSize: '14px' }}
                                onClick={handleSubmit}
                            />
                        </div>
                    </Box>
                </Box>
                <ThemedSnackbar
                    open={snackbarConfig.open}
                    message={snackbarConfig.msg}
                    severity={snackbarConfig.sev}
                    onClose={handleClose}
                />
            </Container>
        </>
    );
};