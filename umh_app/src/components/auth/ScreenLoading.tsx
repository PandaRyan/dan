import React from 'react';
import { Backdrop, CircularProgress } from '@mui/material';

interface ScreenLoader {
  open: boolean;
}

export const ScreenLoading = ({ open }: ScreenLoader) => {
  return (
    <Backdrop
      sx={{
        color: '#698B4B',       //dark olive
        backgroundColor: 'rgba(242, 244, 247, 0.8)',
        zIndex: (theme) => theme.zIndex.drawer + 1,                     //so its on top
      }}
      open={open}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};