import { Link } from 'react-router-dom';
import { AiFillHome } from 'react-icons/ai';
import { FaSearch } from 'react-icons/fa';
import { FaUserAlt } from 'react-icons/fa';

const NavBar = () => {

    return (
        <header>
            <nav className="menu">
                <Link to='./home'>
                    <span id="userBtn"><AiFillHome /></span>
                </Link>
                <Link to='./discover'>
                    <span id="userBtn"><FaSearch /></span>
                </Link>
                <Link to='./'>
                    <span id="userBtn"><FaUserAlt /></span>
                </Link>
            </nav>
        </header>
    )

}

export default NavBar

