import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <header>
            <nav>
                <Link to='./'>home</Link>
                <Link to='./detail'>detail</Link>
                <Link to='./discover'>discover</Link>
            </nav>
        </header>
    )
}

export default NavBar

