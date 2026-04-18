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
                backgroundColor: '#FFFFFF',     //white background

                '& .MuiOutlinedInput-root': {       //box border
                    borderRadius: '8px',

                    '& fieldset': {
                        borderColor: '#C5AA8E',
                        borderWidth: '2px',
                    },

                    '&:hover fieldset': {       //hover state
                        borderColor: '#74924A',
                    },

                    '&.Mui-focused fieldset': {     //typing state
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