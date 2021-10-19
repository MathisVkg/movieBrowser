import { BsFillPlayFill } from 'react-icons/bs';
import { IconContext } from 'react-icons/lib';
import { BiArrowFromRight } from 'react-icons/bi';
import { BiTime } from 'react-icons/bi';
import { AiFillStar } from 'react-icons/ai';
import Loader from '../components/Loader';
import '../assets/scss/Detail.css';
import { useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

const Detail = () => {
    let iconsBack = { className: 'backBtn' };
    let icons = { className: 'playBtn' };
    const {movieId} = useParams();
    const [readMore, setReadMore] = useState(false);
    
    const APIDETAILS = 'https://api.themoviedb.org/3/movie/' + movieId + '?api_key=59d266ad02d1642bf64bc31fb887924c&language=en-US';
    const IMGPATH = 'https://image.tmdb.org/t/p/w1280';
    const [moviesDetails, setMoviesDetails] = useState([]);
  
    const fetchMoviesDetails = async () =>  {
        try {
        const response = await fetch(APIDETAILS);
        const moviesData = await response.json();
        setMoviesDetails(moviesData);
        } catch (error) {
        console.log(error);
        }
    }
    useEffect(() => {
        fetchMoviesDetails();
    }, []);
    console.log(moviesDetails);
    if(moviesDetails.length !== 0) { 
        return (
            <main>
                <Wallpaper />
                <BaseInfo />
                <MoreInfo />
                <Description />
                {/* <MoreMovie /> */}
            </main>
        )
    } else {
        return( 
            <Loader />
        )
    }

    function Wallpaper() {
        return (
            <>
            <div className="wallpaper"
            style=
            {{
                backgroundImage: `url('${IMGPATH + moviesDetails.poster_path}')`
            }}
            >
                <NavLink to="#"><IconContext.Provider value={ icons }><BsFillPlayFill /></IconContext.Provider></NavLink>
                <NavLink to="/home"><IconContext.Provider value={ iconsBack }><BiArrowFromRight /></IconContext.Provider></NavLink>
            </div>
            </>
        );
    }

    function BaseInfo() {
        return (
            <>
            <div className="infoGroup">
                <div className="firstInfo">
                    <h2>{ moviesDetails.title }</h2>
                    <p>4K</p>
                </div>
                <div className="secondInfo">
                    <div className="timeGroup">
                        <BiTime />
                        <h2>{ moviesDetails.runtime } minutes</h2>
                    </div>
                    <div className="rateGroup">
                        <AiFillStar />
                        <p>{ moviesDetails.vote_average } (IMDb)</p>
                    </div>
                </div>
            </div>
            <div className="underLine"></div>
            </>
        );
    }

    function MoreInfo() {
        return (
            <>
            <div className="dateContainer">
                <div className="dateGroup">
                    <p className="date">Release date</p>
                    <p className="dateText">
                        { switchMonth() }
                        { moviesDetails.release_date.substring(8, 10) }
                        <span className="dateSpace">, </span>
                        { moviesDetails.release_date.substring(0, 4) }
                    </p>
                </div>
                <div className="genreGroup">
                    <p className="genre">Genre</p>
                    <div className="genreBlur">
                        { getGenres() }
                    </div>
                </div>
            </div>
            <div className="underLine"></div>
            </>
        );
    }

    function getGenres() {
        for(let i = 0; i < moviesDetails.genres.length; i++){
            console.log('check')
            return (
                <>
                <p className="genreText">{ moviesDetails.genres[i].name }</p>
                </>
            );
        }
    }

    function switchMonth() {
        const date = moviesDetails.release_date.substring(5, 7);
        switch (date) {
            case '01':
                return 'January ';
              break;
            case '02':
                return 'February ';
                break;
            case '03':
                return 'March ';
              break;
            case '04':
                return 'April ';
              break;
            case '05':
                return 'May ';
              break;
            case '06':
                return 'June ';
              break;
            case '07':
                return 'July ';
              break;
            case '08':
                return 'August ';
              break;
            case '09':
                return 'September ';
              break;
            case '10':
                return 'October ';
              break;
            case '11':
                return 'November ';
              break;
            case '12':
                return 'December ';
              break;
            default:
              return 'missing date';
          }
    }

    function Description() {
        const overview = moviesDetails.overview;
        return (
            <>
            <div className="desGroup">
                <h2 className="desTitle">Synopsis</h2>
                <p className="desText">{ readMore ? overview: `${ overview.substring(0,200) }` }
                    <button 
                    className="readMoreBtn" 
                    onClick={ () => setReadMore(!readMore) }>{ readMore ? 'Show less' :'Readmore..' }
                    </button>
                </p>
            </div>
            </>
        );
    }
    function MoreMovie() {
        return (
            <>
            <div className="moreMovie">
                <p className="moreMovieTitle">Related Movies</p>
                    <div className="movieCard">
                        <img src={ checkCollection() } className="movieImg" />
                        <p className="movieTitle">{ moviesDetails.belongs_to_collection.name }</p>
                    </div>
            </div>
            </>
        );
    }

    function checkCollection() {
        if( moviesDetails.belongs_to_collection.poster_path == null) {
            return (
                <>
                <img src="" className="movieImg" />
                </>
            );
        } else {
            return (
                <>
                <img src={ IMGPATH + moviesDetails.belongs_to_collection.poster_path } className="movieImg" />
                </>
            );
        }
    }
}

export default Detail
