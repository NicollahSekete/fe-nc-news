import { Link } from "react-router-dom"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Header = () => {
    return (
        <section>
            <h1>The Newsies</h1>
            <nav>
                <ul className="topnav">
                    <li><Link className="activeNav" to='/'>Home</Link></li>
                    <li><Link to='/Articles'>Articles</Link></li>
                    <li><Link to='/Topics'>Topics</Link></li>
                    <li className="right"><Link to=''><AccountCircleIcon /></Link></li>
                </ul>
            </nav>
        </section>
    )
}

export default Header