import { FaSearch } from 'react-icons/fa';
import '../assets/scss/Discover.css';
import '../assets/scss/Base.css';
import Loader from '../components/Loader';
import React, { useEffect, useState } from 'react';
import Carousel from 'react-elastic-carousel';
import NavBar from './NavBar';

const APIGENRE = 'https://api.themoviedb.org/3/genre/movie/list?api_key=59d266ad02d1642bf64bc31fb887924c&language=en-US';


const Discover = () => {
    
    const [page, setPage] = useState(1);
    const [genre, setGenre] = useState(28);
    const IMGPATH = 'https://image.tmdb.org/t/p/w1280';
    const APIKEY = 'api_key=59d266ad02d1642bf64bc31fb887924c';
    const PARAMS = `&language=en-US&sort_by=popularity.desc&page=${page}&with_genres=`;
    const BASEURL = 'https://api.themoviedb.org/3/discover/movie?';
    const [movies, setMovies] = useState([]);
    const [moviesGenre, setMoviesGenre] = useState([]);


    const fetchMovies = async () =>  {
      try {
        const response = await fetch(BASEURL + APIKEY + PARAMS + genre);
        const movies = await response.json();
        setMovies(movies);
      } catch (error) {
        console.log(error);
      }
    }
    useEffect(() => {
      fetchMovies();
    }, [genre]);

    const fetchMoviesGenre = async () =>  {
        try {
        const response = await fetch(APIGENRE);
        const moviesGenre = await response.json();
        setMoviesGenre(moviesGenre);
        } catch (error) {
        console.log(error);
        }
    }
    useEffect(() => {
        fetchMoviesGenre();
    }, []);

    let stockMoviesGenre = {...moviesGenre.genres};
    let stockMovies = {...movies.results};

    if(stockMovies.length !== 0) { 
        return (
            <main>
                <NavBar />
                <Search />
                <Genre />
                <AllMovieCard />
            </main>
        )
    } else {
        return( 
            <Loader />
        )
    }

    function Search() {
        return (
            <>
            <h1 className="pageTitle">Movie<span className="titleColor">Browser</span></h1>
            <div className="searchBar">
                <span className="searchIcon"><FaSearch /></span>
                <input type="text" placeholder="Sherlock Holmes"></input>
            </div>
            </>
        );
    }

    function Genre() {
        return (
            <>
            <nav className="movieGenres" >
            {
                Object.entries(stockMoviesGenre).map((genre) => {
                    return (
                        <p 
                        className="genreLink" 
                        id= { genre[1].id }
                        onClick= { (e) => changeGenre(e) }
                        key={ genre[1].id }
                        >
                        { genre[1].name } 
                        </p>
                    )
                })
            }
            </nav>
            </>
        );
    }

    function changeGenre(e) {
        e.preventDefault();
        e.target.style.color = '#f57e2f';
        setGenre(e.target.id);
        console.log('setGenre: ', genre);
    }

    function AllMovieCard() {
        return(
            <>
            <div className="allMovie">
                {
                    Object.entries(stockMovies).map((movie) => {

                        return (
                            <a href="/detail" id={ movie[1].id } key={ movie[1].id }>
                                <div className="cardDiscover">
                                    <div className="widthImg"><img src={IMGPATH + movie[1].poster_path} alt={ IMGPATH + movie[1].title } /></div>
                                    <p className="titleDiscover">
                                        { movie[1].title }
                                        <span className="dateColor">({ movie[1].release_date.substring(0,4) })</span>
                                    </p>
                                </div>
                            </a>
                        )
                    })
                }
            </div>
            </>
        );
    }

}

export default Discover
