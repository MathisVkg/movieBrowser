import '../assets/scss/Home.css';
import '../assets/scss/NavBar.css';
import { BsFillPlayCircleFill } from 'react-icons/bs';

const IMGPATH = 'https://image.tmdb.org/t/p/w1280';
const Home = (props) => {
    if(props.movies.length !== 0) { 
        let randomMovie = parseInt(Math.floor(Math.random() * 20)); 
        return (
            <main>
                <h1 className="pageTitle">Movie<span className="titleColor">Browser</span></h1>
                <div className="containerSpotlight"
                style=
                {{
                    backgroundImage: `url('${IMGPATH + props.movies.results[randomMovie].poster_path}')`
                }}
                >   
                    <div className="blur"></div>
                    <div className="spotlightGroup">
                        <span className="playIcon"><BsFillPlayCircleFill /></span>
                        <div className="textDiv">
                            <p>Movie Spotlight</p>
                            <h2>{ props.movies.results[randomMovie].title.substring(0, 25) }</h2>
                        </div>
                    </div>
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
