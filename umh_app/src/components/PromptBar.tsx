import { AppBar, Toolbar, TextField, Box, IconButton, Typography, } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import type { KeyboardEvent } from 'react';

interface PromptBarProps {
  value: string;
  onChange: (newValue: string) => void;
  onSend: () => void;
}

export const PromptBar = ({ value, onChange, onSend }: PromptBarProps) => {

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (value.trim()) {
        onSend();
      }
      
    }
  }

  return (
    <Box sx={{
      position: 'fixed',
      bottom: '5%',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '700px',
    }}>
      <AppBar
        position="static"
        sx={{
          borderRadius: 5,
          backgroundColor: '#BDA891',
          textAlign: 'center'
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
            placeholder="Try asking about fuel subsidies!"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
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
          <IconButton 
            sx={{ ml: 1 }}
            onClick={() => {
              if(value.trim()) onSend();
            }}
            disabled={!value.trim()}
          >
              <SendIcon />
          </IconButton>
        </Toolbar>

        <Typography variant="caption" sx={{color: "#6C513C"}}>
            Powered by Z.AI - Z.AI may make mistakes.
        </Typography>
      </AppBar>
    </Box>
  )
}
