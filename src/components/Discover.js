import { FaSearch } from 'react-icons/fa';
import '../assets/scss/Discover.css';
import '../assets/scss/NavBar.css';

const IMGPATH = 'https://image.tmdb.org/t/p/w1280';
const Discover = (props) => {
    if(props.movies.length !== 0) { 
        let stockMovies = {...props.movies.results};
        let randomNumber = Math.floor(Math.random() * 50) + 150;
        console.log('randomNumber: ', randomNumber);

        function Search() {
            return (
                <div>
                <h1 className="pageTitle">Movie<span className="titleColor">Browser</span></h1>
                <div className="searchBar">
                    <span className="searchIcon"><FaSearch /></span>
                    <input type="text" placeholder="Sherlock Holmes"></input>
                </div>
                </div>
            );
        }

        function Genre() {
            return (
                <div>
                <nav className="genre">
                    <a className="genreLink" href="#">Fantasy</a>
                    <a className="genreLink" href="#">Horror</a>
                    <a className="genreLink" href="#">Science Fiction</a>
                    <a className="genreLink" href="#">Documentary</a>
                </nav>
                </div>
            );
        }

        function AllMovieCard() {
            return(
                <div>
                <div className="allMovie">
                    {
                        Object.entries(stockMovies).map((key, value) => {
                            return (
                                <a href="/detail">
                                    <div className="cardDiscover">
                                        <img src={IMGPATH + key[1].poster_path} alt={ IMGPATH + key[1].title }
                                        style={{ height: `${ randomNumber }` }}
                                        />
                                        <p className="titleDiscover">
                                            { key[1].title }
                                            <span className="dateColor">({ key[1].release_date.substring(0,4) })</span>
                                        </p>
                                    </div>
                                </a>
                            )
                        })
                    }
                </div>
                </div>
            );
        }

        return (
            <main>
                <Search />
                <Genre />
                <AllMovieCard />
            </main>
        )
    } else {
        return( 
            <h2>Loading</h2>
        )
    }
}

export default Discover
