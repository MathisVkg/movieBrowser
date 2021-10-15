import { BsFillPlayFill } from 'react-icons/bs';
import { IconContext } from 'react-icons/lib';
import { IoChevronBackOutline } from 'react-icons/io5';
import { BiTime } from 'react-icons/bi';
import { AiFillStar } from 'react-icons/ai';
import React, { useState } from 'react';
import Loader from '../components/Loader';
import '../assets/scss/Detail.css';

const IMGPATH = 'https://image.tmdb.org/t/p/w1280';
const Detail = (props) => {
    let icons = { className: 'playBtn' };
    let iconsBack = { className: 'backBtn' };
    const[readMore, setReadMore] = useState(false);
    const textTest = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur finibus nisi vitae tellus molestie convallis. Duis et diam at sapien condimentum efficitur. Mauris maximus purus justo, fermentum ullamcorper ante ultricies nec. Ut nec massa sit amet sem bibendum semper. Pellentesque ultrices justo lacinia pulvinar varius. Phasellus non leo sit amet tellus auctor aliquam ut at arcu. Suspendisse molestie, dolor id pharetra iaculis, mi magna ultricies justo, in rutrum enim ante non dolor. Mauris posuere felis sit amet nulla rhoncus, sit amet pharetra tellus commodo. Duis id elementum ex. Ut volutpat vestibulum quam sed consequat.';
    let stockMovies = {...props.movies.results};
    console.log('stockMovies: ', stockMovies);

    if(props.movies.length !== 0) { 
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
                backgroundImage: `url('${IMGPATH + stockMovies[0].poster_path}')`
            }}
            >
                <a href="#"><IconContext.Provider value={ icons }><BsFillPlayFill /></IconContext.Provider></a>
                <a href="./home"><IconContext.Provider value={ iconsBack }><IoChevronBackOutline /></IconContext.Provider></a>
            </div>
            </>
        );
    }

    function BaseInfo() {
        return (
            <>
            <div className="infoGroup">
                <div className="firstInfo">
                    <h2>{ stockMovies[0].title }</h2>
                    <p>4K</p>
                </div>
                <div className="secondInfo">
                    <div className="timeGroup">
                        <BiTime />
                        <h2>152 minutes</h2>
                    </div>
                    <div className="rateGroup">
                        <AiFillStar />
                        <p>7.0 (IMDb)</p>
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
                    <p className="dateText">December 9,2017</p>
                </div>
                <div className="genreGroup">
                    <p className="genre">Genre</p>
                    <div className="genreBlur">
                        <p className="genreText">action</p>
                        <p className="genreText">Sci-Fi</p>
                    </div>
                </div>
            </div>
            <div className="underLine"></div>
            </>
        );
    }

    function Description() {
        return (
            <>
            <h2 className="desTitle">Synopsis</h2>
            <p className="desText">{ readMore ? textTest : `${ textTest.substring(0,200) }` }
                <button 
                className="readMoreBtn" 
                onClick={ () => setReadMore(!readMore) }>{ readMore ? 'Show less' :'Readmore..' }
                </button>
            </p>
            </>
        );
    }

    function MoreMovie() {
        return (
            <>
            <div className="moreMovie">
                <div className="movieCard">
                    {/* <img>img</img> */}
                    <p className="movieTitle">movie title</p>
                </div>
            </div>
            </>
        );
    }
}

export default Detail
