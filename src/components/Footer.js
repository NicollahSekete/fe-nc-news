import GitHubIcon from '@mui/icons-material/GitHub';
import { Link } from "react-router-dom"

const Footer = () => {
    return (
        <footer>
            <ul className="bottomNav">
                <li className="right"> <a className='links' href="https://github.com/NicollahSekete/fe-nc-news"><GitHubIcon/></a></li>
            </ul>

        </footer>
    )
}

export default Footer