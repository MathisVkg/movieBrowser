import { NavLink } from 'react-router-dom';
import { AiFillHome } from 'react-icons/ai';
import { IoSearchCircle } from 'react-icons/io5';
import { FaUserAlt } from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';

const NavBar = () => {
    let icons = { className: 'icons' }
    let iconsSearch = { className: 'iconsSearch' }

    return (
        <header>
            <nav className="menu">
                <NavLink to='./home'>
                    <IconContext.Provider value={ icons }><AiFillHome /></IconContext.Provider>
                </NavLink>
                <NavLink to='./discover'>
                    <IconContext.Provider value={ iconsSearch }><IoSearchCircle /></IconContext.Provider>
                </NavLink>
                <NavLink to='./user'>
                    <IconContext.Provider value={ icons }><FaUserAlt /></IconContext.Provider>
                </NavLink>
            </nav>
        </header>
    )

}

export default NavBar

