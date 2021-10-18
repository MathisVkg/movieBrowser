import '../assets/scss/Home.css';
import '../assets/scss/Base.css';
import { BsFillPlayCircleFill } from 'react-icons/bs';
import { AiFillStar } from 'react-icons/ai';
import Carousel from 'react-elastic-carousel';
import Loader from '../components/Loader';
import NavBar from './NavBar';
import React, { useState, useEffect } from 'react';

const Home = (props) => {
    // const [idMovie, setIdMovie] = useState();
    const APIURLTRENDING = 'https://api.themoviedb.org/3/trending/movie/day?api_key=59d266ad02d1642bf64bc31fb887924c';
    const IMGPATH = 'https://image.tmdb.org/t/p/w1280';
    const [moviesTrending, setMoviesTrending] = useState([]);
  
    const fetchMoviesTrending = async () =>  {
        try {
        const response = await fetch(APIURLTRENDING);
        const moviesTrending = await response.json();
        setMoviesTrending(moviesTrending);
        } catch (error) {
        console.log(error);
        }
    }
    useEffect(() => {
        fetchMoviesTrending();
    }, []);


    let stockMovies = {...moviesTrending.results};
    console.log('stockMovies: ', stockMovies[1]);
    if (stockMovies.length !== 0) {
        return (
            <main>
                <h1 className="pageTitle">Movie<span className="titleColor">Browser</span></h1>
                <NavBar />
                {/* <RandomCard /> */}
                <TrandingCard />
            </main>
        )
    } else {
        return (
            <Loader />
        )
    }


    function RandomCard() {
        let randomMovie = Math.floor(Math.random() * 19);
        return (
            <>
                <a href="/detail" id={ stockMovies[randomMovie].id }
                // onClick= { (e) => IdMovie(e) }
                >
                    <div className="containerSpotlight" style=
                        {{
                            backgroundImage: `url('${ IMGPATH + stockMovies[randomMovie].poster_path }')`
                        }}
                    >
                        <div className="spotlightGroup">
                            <span className="playIcon"><BsFillPlayCircleFill /></span>
                            <div className="textDiv">
                                <p>Movie Spotlight</p>
                                <h2>{ stockMovies[randomMovie].title.substring(0, 27) }</h2>
                            </div>
                        </div>
                    </div>
                </a>
            </>
        );
    }

    function TrandingCard() {
        return (
            <>
                <h2 className="subTitle">Trending</h2>
                <Carousel
                    itemsToShow={1}
                    showArrows={false}
                    pagination={false}
                    // outerSpacing={50}
                    // itemPadding={[0, 155]}
                    className="movieList" >
                    {
                        Object.entries(stockMovies).map((movie, value) => {
                            return (
                                <a href="/detail" id={movie[1].id} key={movie[1].id}>
                                    <div className="card"
                                        style=
                                        {{
                                            backgroundImage: `url('${IMGPATH + movie[1].poster_path}')`
                                        }}
                                    >
                                        <div className="rateGroup">
                                            <span className="rateIcon"><AiFillStar /></span>
                                            <p className="rate">{movie[1].vote_average}</p>
                                        </div>
                                        <p className="title">{movie[1].title}</p>
                                    </div>
                                </a>
                            )
                        })
                    }
                </Carousel>
            </>
        );
    }

    // function IdMovie(e) {
    //     e.preventDefault();
    //     e.target.style.color = '#f57e2f';
    //     setIdMovie(e.target.id);
    //     console.log('IdMovie: ', idMovie);
    // }
}

export default Home
