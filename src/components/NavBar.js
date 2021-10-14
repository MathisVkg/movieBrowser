import { Link } from 'react-router-dom';
import { AiFillHome } from 'react-icons/ai';
import { IoSearchCircleSharp } from 'react-icons/io5';
import { FaUserAlt } from 'react-icons/fa';

const NavBar = () => {
    return (
        <header>
            <nav>
                <Link to='./'><span className="homeBtn"><AiFillHome /></span></Link>
                <Link to='./detail'><span className="searchBtn"><IoSearchCircleSharp /></span></Link>
                <Link to='./discover'><span className="userBtn"><FaUserAlt /></span></Link>
            </nav>
        </header>
    )
}

export default NavBar

