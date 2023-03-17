import { Link } from "react-router-dom"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Typography } from '@mui/material';

const Header = () => {
    return (
        <section>
            <Typography variant="h3" component="h4">
                <Link className='articlesTitle' to='/'> The frontend Chronicle</Link>
            </Typography>
            <nav>
                <ul className="topnav">
                    <li><Link className="activeNav links" to='/'>Home</Link></li>
                    <li><Link className='links' to='/Articles'>Articles</Link></li>
                    <li><Link className='links' to='/Topics'>Topics</Link></li>
                    <li className="right"><Link className='links' to=''><AccountCircleIcon /></Link></li>
                </ul>
            </nav>
        </section>
    )
}

export default Header