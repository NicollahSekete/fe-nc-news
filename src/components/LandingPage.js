import { Button } from '@mui/material';
import { Link } from "react-router-dom"

const LandingPage = () => {
    return (
        <main className="landingPageMain">
            <header>
                <h1>
                    The Newsies
                </h1>

            </header>
            <h3>Your favourite site for latest news</h3>
            <Button size="large" variant="contained" 
            ><Link to='/Articles'>Latest Articles</Link></Button>

           
        </main>
    )
}

export default LandingPage