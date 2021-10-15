import { NavLink } from 'react-router-dom';
import { AiFillHome } from 'react-icons/ai';
import { FaSearch } from 'react-icons/fa';
import { FaUserAlt } from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';

const NavBar = () => {
    let icons = { className: 'icons' }

    return (
        <header>
            <nav className="menu">
                <NavLink to='./home'>
                    <IconContext.Provider value={ icons }><AiFillHome /></IconContext.Provider>
                </NavLink>
                <NavLink to='./discover'>
                    <IconContext.Provider value={ icons }><FaSearch /></IconContext.Provider>
                </NavLink>
                <NavLink to='./user'>
                    <IconContext.Provider value={ icons }><FaUserAlt /></IconContext.Provider>
                </NavLink>
            </nav>
        </header>
    )

}

export default NavBar

