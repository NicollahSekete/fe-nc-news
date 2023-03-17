import { Button, Box } from '@mui/material';
import { Link } from "react-router-dom"

const LandingPage = () => {
   
    return (
        <Box className="landingPageMain">

            <h2>You're number one source for news</h2>
            <Button size="large" variant="contained"
            >
                <Link className='links' to='/Articles'>Latest Articles</Link>
            </Button>

        </Box>
    )
}

export default LandingPage