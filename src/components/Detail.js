import { BsFillPlayFill } from 'react-icons/bs';
import { IconContext } from 'react-icons/lib';
import { BiArrowFromRight } from 'react-icons/bi';
import { BiTime } from 'react-icons/bi';
import { AiFillStar } from 'react-icons/ai';
import Loader from '../components/Loader';
import '../assets/css/Detail.css';
import { useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Carousel from 'react-elastic-carousel';

const Detail = () => {
    let iconsBack = { className: 'backBtn' };
    let icons = { className: 'playBtn' };
    const {movieId} = useParams();
    const [readMore, setReadMore] = useState(false);
    const [collectionId, setCollectionId] = useState();
    const [itemToShowCarou, setItemToShowCarou] = useState(2);
    const APIDETAILS = 'https://api.themoviedb.org/3/movie/' + movieId + '?api_key=59d266ad02d1642bf64bc31fb887924c&language=en-US';
    const IMGPATH = 'https://image.tmdb.org/t/p/w1280';
    const BASEURL = 'https://api.themoviedb.org/3/collection/';
    const APIKEY = '?api_key=59d266ad02d1642bf64bc31fb887924c&language=en-US';
    const [moviesDetails, setMoviesDetails] = useState([]);
    const [movieCollection, setMovieCollection] = useState([]);
    
    function checkResize() {
        if(window.innerWidth >= 760) {
            setItemToShowCarou(3);
        }
    }

    window.addEventListener('resize', () => {
        checkResize();
    })
  
    const fetchMoviesDetails = async () =>  {
        try {
        const response = await fetch(APIDETAILS);
        const moviesData = await response.json();
        setMoviesDetails(moviesData);
        setCollectionId(moviesData.belongs_to_collection.id);
        } catch (error) {
        console.log(error);
        }
    }

    const getchMovieCollection = async () =>  {
        try {
        const response = await fetch(BASEURL + collectionId + APIKEY);
        const moviesData = await response.json();
        setMovieCollection(moviesData);
        } catch (error) {
        console.log(error);
        }
    }
    useEffect(async() => {
        await fetchMoviesDetails();
        checkResize()
    }, []);

    useEffect(async() => {
        await getchMovieCollection();
    }, [collectionId]);

    if(moviesDetails.length !== 0) { 
        return (
            <main>
                <Wallpaper />
                <BaseInfo />
                <MoreInfo />
                <Description />
                <MoreMovie />
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
                backgroundImage: `url('${IMGPATH + moviesDetails.backdrop_path}')`
            }}
            >
                <IconContext.Provider value={ icons }><BsFillPlayFill /></IconContext.Provider>
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
                        {
                            moviesDetails.genres.map((genre) => {
                                return (
                                    <p className="genreText" key={ genre.id }>{ genre.name }</p> 
                                );
                            })
                        }
                    </div>
                </div>
            </div>
            <div className="underLine"></div>
            </>
        );
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
                <p className="desText">{ readMore ? overview : `${ overview.substring(0,200) }` }
                { buttonReadmore(overview) }
                </p>
            </div>
            </>
        );
    }

    function buttonReadmore(overview) {
        if(overview.length > 200) {
            return (
                <button 
                className="readMoreBtn" 
                onClick={ () => setReadMore(!readMore) }>{ readMore ? 'Show less' :'Readmore..' }
                </button>
            )
        } else {
            return;
        }
    }

    function MoreMovie() {
        return (
            <>
            <>{ RelatedCarousel() }</>
            </>
        );
    }

    function RelatedCarousel() {
        if(movieCollection.success == false) {
            return;
        } else {
            return (
                <>
                <p className="moreMovieTitle">Related Movies</p>
                <Carousel
                    itemsToShow={itemToShowCarou}
                    showArrows={false}
                    pagination={false}
                    // outerSpacing={50}
                    // itemPadding={[0, 150]}
                    className="movieMoreList" >
                            {
                                movieCollection.parts?.map((movieMore) => {
                                    return (
                                        <div className="movieMoreCard" key={ movieMore.id }>
                                            <div>
                                                <img className="movieImg" src={ IMGPATH + movieMore.poster_path }/>
                                            </div>
                                            <p className="movieTitle">{ movieMore.title }</p>
                                        </div>
                                    );
                                })
                            }
                    </Carousel>
                </>
            );
        }
    }
}

export default Detail
