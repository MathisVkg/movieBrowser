import '../assets/scss/Home.css';
import '../assets/scss/NavBar.css';
import { BsFillPlayCircleFill } from 'react-icons/bs';
import { AiFillStar } from 'react-icons/ai';
import Carousel from 'react-elastic-carousel'

const IMGPATH = 'https://image.tmdb.org/t/p/w1280';
const Home = (props) => {
    if(props.movies.length !== 0) { 
        let randomMovie = parseInt(Math.floor(Math.random() * 20));
        let stockMovies = { ...props.movies.results };
        // console.log(stockMovies);
        function RandomCard() {
            return (
                <div>
                <h1 className="pageTitle">Movie<span className="titleColor">Browser</span></h1>
                <div className="containerSpotlight"
                style=
                {{
                    backgroundImage: `url('${IMGPATH + stockMovies[randomMovie].poster_path}')`
                }}
                >
                    <a href="/detail">
                        <div className="spotlightGroup">
                            <span className="playIcon"><BsFillPlayCircleFill /></span>
                            <div className="textDiv">
                                <p>Movie Spotlight</p>
                                <h2>{ stockMovies[randomMovie].title.substring(0, 27) }</h2>
                            </div>
                        </div>
                    </a>
                </div> 
                </div>
            );
        }

        function TrandingCard() {
            return (
                <div>
                <h2 className="subTitle">Trending</h2>
                <Carousel itemsToShow={1} showArrows={false}  pagination={false} className="movieList" >
                {
                    Object.entries(stockMovies).map((key, value) => {
                        return (
                            <a href="/detail">
                                <div className="card"
                                style=
                                {{
                                    backgroundImage: `url('${ IMGPATH + key[1].poster_path }')`
                                }}
                                >
                                    <div className="rateGroup">
                                        <span className="rateIcon"><AiFillStar /></span>
                                        <p className="rate">{ key[1].vote_average }</p>
                                    </div>
                                    <p className="title">{ key[1].title }</p>
                                </div>
                            </a>
                        )
                    })
                }
                </Carousel>
                </div>
            );
        }

        return (
            <main>
                <RandomCard />
                <TrandingCard />
            </main>
        )
    } else {
        return( 
            <h2>Loading</h2>
        )
    }
}

export default Home
