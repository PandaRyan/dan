import { Button, type ButtonProps } from "@mui/material"

interface ThemedButtonProps extends ButtonProps {
  title: string;
}


const ThemedButton = ({ title, sx}: ThemedButtonProps) => {
  return (
    <>
    <Button 
    variant="contained"
    disableRipple
    disableElevation
    sx={{
      backgroundColor: '#6f874b',
      fontSize: "10px",
      fontWeight: "bold",
      "&:hover" : {

        backgroundColor: '#7d9e4b'
      },
      "&:active" : {
        backgroundColor: '#6f874b'
      },
      ...sx,
    }}
    {...props}
    >
      {title}
    </Button>
    </>
  )
}

export default ThemedButton