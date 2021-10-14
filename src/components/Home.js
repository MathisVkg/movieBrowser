import '../assets/scss/Home.css';
import '../assets/scss/NavBar.css';
import { BsFillPlayCircleFill } from 'react-icons/bs';
import CardHome from './CardHome';

const IMGPATH = 'https://image.tmdb.org/t/p/w1280';
const Home = (props) => {
    if(props.movies.length !== 0) { 
        let randomMovie = parseInt(Math.floor(Math.random() * 20));
        let stockMovies = { ...props.movies.results };
        console.log(stockMovies[0].title);
        return (
            <main>
                <h1 className="pageTitle">Movie<span className="titleColor">Browser</span></h1>
                <div className="containerSpotlight"
                style=
                {{
                    backgroundImage: `url('${IMGPATH + stockMovies[randomMovie].poster_path}')`
                }}
                >
                    <a href="/detail">
                        <div className="blur"></div>
                        <div className="spotlightGroup">
                            <span className="playIcon"><BsFillPlayCircleFill /></span>
                            <div className="textDiv">
                                <p>Movie Spotlight</p>
                                <h2>{ stockMovies[randomMovie].title.substring(0, 25) }</h2>
                            </div>
                        </div>
                    </a>
                </div>
                <h2 className="subTitle">Trending</h2>
                <div className="movieList">
                    <CardHome stockMovies={ stockMovies } />
                </div>
            </main>
        )
    } else {
        return( 
            <h2>Loading</h2>
        )
    }
}

export default Home
