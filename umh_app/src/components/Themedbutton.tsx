import { Button } from "@mui/material"

const Themedbutton = ({ title }: { title: string }) => {
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
    }}
    >
      {title}
    </Button>
    </>
  )
}

export default Themedbutton