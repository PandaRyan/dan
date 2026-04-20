import React from 'react';
import { Snackbar, Alert } from '@mui/material';

interface ThemedSnackbarProps {
  open: boolean;        //visibility
  message: string;
  severity: 'success' | 'error' | 'warning' | 'info';       //error: red, success: green, warning: yellow, info:blue
  onClose: () => void;
}

export const ThemedSnackbar: React.FC<ThemedSnackbarProps> = ({ open, message, severity, onClose }) => {
  return (
    <Snackbar 
      open={open} 
      autoHideDuration={5000}             //auto hide after 5s
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}       //keep it on the right it looks better
    >
      <Alert 
        onClose={onClose} 
        severity={severity}         //for the correct icon
        variant="filled" 
        sx={{ 
          width: '100%',
          backgroundColor: severity === 'error' ? '#d32f2f' : '#74924A', 
          fontWeight: 'bold',
          borderRadius: '8px',
          boxShadow: '0px 8px 24px rgba(0,0,0,0.15)'
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};