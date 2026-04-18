import React from 'react';
import TextField from '@mui/material/TextField';
import { type TextFieldProps } from '@mui/material';

type ThemedTextFieldProps = TextFieldProps & {
    name: string;
};

export const ThemedTextField: React.FC<ThemedTextFieldProps> = ({ name, ...props }) => {
    return (
        <TextField
            name={name}
            variant="outlined"
            fullWidth
            margin="normal"
            sx={{
                backgroundColor: '#FFFFFF',

                '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',

                    '& fieldset': {
                        borderColor: '#C5AA8E',
                        borderWidth: '2px',
                    },

                    '&:hover fieldset': {
                        borderColor: '#74924A',
                    },

                    '&.Mui-focused fieldset': {
                        borderColor: '#6B5441',
                    },
                },

                '& .MuiInputLabel-root': {
                    color: '#C5AA8E',

                    '&.Mui-focused': {
                        color: '#6B5441',
                    },
                },
            }}
            {...props}
        />
    );
};