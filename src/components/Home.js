import '../assets/css/Home.css';
import '../assets/css/Base.css';
import { BsFillPlayCircleFill } from 'react-icons/bs';
import { AiFillStar } from 'react-icons/ai';
import Carousel from 'react-elastic-carousel';
import Loader from '../components/Loader';
import NavBar from './NavBar';
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const Home = (props) => {

    const APIURLTRENDING = 'https://api.themoviedb.org/3/trending/movie/day?api_key=59d266ad02d1642bf64bc31fb887924c';
    const IMGPATH = 'https://image.tmdb.org/t/p/w1280';
    const [moviesTrending, setMoviesTrending] = useState([]);
    const [itemToShowCarou, setItemToShowCarou] = useState(1);
    let randomMovie;
    
    const fetchMoviesTrending = async () =>  {
        try {
        const response = await fetch(APIURLTRENDING);
        const moviesTrending = await response.json();
        setMoviesTrending(moviesTrending.results);
        } catch (error) {
        console.log(error);
        }
    }
    useEffect(() => {
        fetchMoviesTrending();
        checkResize();
    }, []);

    function checkResize() {
        if(window.innerWidth >= 760) {
            setItemToShowCarou(3);
        }
    }

    window.addEventListener('resize', () => {
        checkResize();
    })

    if (moviesTrending.length !== 0) {
        return (
            <main>
                <h1 className="pageTitle">Movie<span className="titleColor">Browser</span></h1>
                <NavBar />
                <RandomCard />
                <TrandingCard />
            </main>
        )
    } else {
        return (
            <Loader />
        )
    }


    function RandomCard() {
        randomMovie = Math.floor(Math.random() * 20);
        return (
            <>
                <NavLink to={`/detail/${ moviesTrending[randomMovie].id }`}>
                    <div className="containerSpotlight"
                    id={ moviesTrending[randomMovie].id }
                    style=
                        {{
                            backgroundImage: `url('${ IMGPATH + moviesTrending[randomMovie].backdrop_path }')`
                        }}
                    >
                        <div className="spotlightGroup">
                            <span className="playIcon"><BsFillPlayCircleFill /></span>
                            <div className="textDiv">
                                <p>Movie Spotlight</p>
                                <h2>{ moviesTrending[randomMovie].title.substring(0, 27) }</h2>
                            </div>
                        </div>
                    </div>
                </NavLink>
            </>
        );
    }

    function TrandingCard() {
        return (
            <>
                <h2 className="subTitle">Trending</h2>
                <Carousel
                    itemsToShow={itemToShowCarou}
                    showArrows={false}
                    pagination={false}
                    // outerSpacing={50}
                    // itemPadding={[0, 150]}
                    className="movieList" >
                    {
                        moviesTrending.filter(movie => movie.id !== moviesTrending[randomMovie].id).map((movie) => {
                            return (
                                <NavLink to={`/detail/${ movie.id }`} key={movie.id}>
                                    <div className="card"
                                        id={movie.id}
                                        style=
                                        {{
                                            backgroundImage: `url('${IMGPATH + movie.poster_path}')`
                                        }}
                                    >
                                        <div className="rateGroup">
                                            <span className="rateIcon"><AiFillStar /></span>
                                            <p className="rate">{movie.vote_average}</p>
                                        </div>
                                        <p className="title">{movie.title}</p>
                                    </div>
                                </NavLink>
                            )
                        })
                    }
                </Carousel>
            </>
        );
    }
}

export default Home
