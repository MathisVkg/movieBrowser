import { FaSearch } from 'react-icons/fa';
import '../assets/css/Discover.css';
import '../assets/css/Base.css';
import Loader from '../components/Loader';
import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import { NavLink } from 'react-router-dom';
import { BsArrowUpShort } from 'react-icons/bs';

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
    const [IsTrue, setIsTrue] = useState(false);

    const [searchWord, setSearchWord] = useState();
    const BASESEARCH = 'https://api.themoviedb.org/3/search/movie?api_key=59d266ad02d1642bf64bc31fb887924c&language=en-US&query=';
    const SEARCHPARAMS = '&page=1&include_adult=false'
    const [inputValue, setInputValue] = useState('');
    // console.log('inputValue: ', inputValue);


    const fetchMovies = async () =>  {
      try {
        const response = await fetch(BASEURL + APIKEY + PARAMS + genre);
        const moviesData = await response.json();
        setMovies(prevState => [...prevState, ...moviesData.results]);
      } catch (error) {
        console.log(error);
      }
    }
    useEffect(() => {
      setMovies([]);
      setPage(1);
      fetchMovies();
    }, [genre]);

    const fetchMoviesGenre = async () =>  {
        try {
        const response = await fetch(APIGENRE);
        const moviesGenre = await response.json();
        setMoviesGenre(moviesGenre.genres);
        } catch (error) {
        console.log(error);
        }
    }
    useEffect(() => {
        fetchMoviesGenre();
    }, []);

    const fetchMovieSearch = async () => {
        try {
        const response = await fetch(BASESEARCH + searchWord.replace(/\s/g, '%20') + SEARCHPARAMS);
        const movieData = await response.json();
        } catch (error) {
            console.log(error);
        }
    }


    window.onscroll = function(ev) {
        if ((window.innerHeight + window.scrollY) > document.body.offsetHeight) {
            setIsTrue(true);
            if(IsTrue === true) {
                setPage(page + 1)
                fetchMovies();
                setIsTrue(false);
            }
        }
    };


    if(movies.length !== 0) { 
        return (
            <main>
                <NavBar />
                <Search />
                <Genre />
                <AllMovieCard />
                <BackToTop />
            </main>
        )
    } else {
        return( 
            <Loader />
        )
    }


    function BackToTop() {
        return (
            <>
            <a href="#top" className="backToTop"><BsArrowUpShort /></a>
            </>
        );
    }

    function Search() {
        return (
            <>
            <h1 className="pageTitle">Movie<span className="titleColor" id="top">Browser</span></h1>
            <div className="searchBar">
                <span className="searchIcon"><FaSearch /></span>
                <input type="text" placeholder="Sherlock Holmes" onChange=
                { 
                    event => setInputValue(event.target.value)
                }
                value={ inputValue }
                ></input>
            </div>
            </>
        );
    }

    function Genre() {
        return (
            <>
            <nav className="movieGenres">
            {
                moviesGenre.map((genre) => {
                    return (
                        <p 
                        className="genreLink" 
                        id= { genre.id }
                        onClick= { (e) => changeGenre(e) }
                        key={ genre.id }
                        >
                        { genre.name } 
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
    }

    function AllMovieCard() {
        return(
            <>
            <div className="allMovie">
                {
                    movies.map((movie) => {
                        return (
                            <NavLink to={`/detail/${ movie.id }`} id={ movie.id } key={ movie.id }>
                                <div className="cardDiscover">
                                    <div className="widthImg"><img src={IMGPATH + movie.poster_path} alt={ IMGPATH + movie.title } /></div>
                                    <p className="titleDiscover">
                                        { movie.title }
                                        <span className="dateColor">({ movie.release_date.substring(0,4) })</span>
                                    </p>
                                </div>
                            </NavLink>
                        )
                    })
                }
            </div>
            </>
        );
    }

}

export default Discover
