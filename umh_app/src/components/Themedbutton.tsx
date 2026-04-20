import { Button, type ButtonProps } from "@mui/material"

interface ThemedButtonProps extends ButtonProps {
  title: string;
}


const ThemedButton = ({ title, sx, onClick, onMouseEnter, ...props }: ThemedButtonProps) => {
  return (
    <>
    <Button 
    {...props}
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
    onClick = {onClick}
    onMouseEnter = {onMouseEnter}
    >
      {title}
    </Button>
    </>
  )
}

export default ThemedButton