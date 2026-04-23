import { AppBar, Toolbar, TextField, Box, IconButton, } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

export const PromptBar = () => {
  return (
    <Box sx={{
      position: 'fixed',
      bottom: '15%',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '700px',
    }}>
      <AppBar
        position="static"
        sx={{
          borderRadius: 5,
          backgroundColor: '#BDA891',
        }}
      >
        <Toolbar sx={{
          alignItems: 'flex-end', 
          pb: 2,                  
          pt: 2,

        }}
        >
          <TextField
            multiline
            size="small"
            placeholder="Enter prompt..."
            sx={{
              backgroundColor: '#BDA891',
              borderRadius: 1,
              flexGrow: 1,
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'transparent',
                },
                '&:hover fieldset': {
                  borderColor: '#6C513C',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#6C513C',
                },
              }
            }}
          />
          <IconButton sx={{ ml: 1 }}><SendIcon /></IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
