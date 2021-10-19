import NavBar from './NavBar';
import '../assets/scss/User.css';
import React, { useEffect, useState } from 'react';
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
//59d266ad02d1642bf64bc31fb887924c

const User = () => {

    const percentage = 77;
    const [getToken, setGetToken] = useState([]);
    const [getUser, setGetUser] = useState([]);
    const APITOKEN = 'https://api.themoviedb.org/3/authentication/token/new?api_key=59d266ad02d1642bf64bc31fb887924c';
    const APIUSER = 'https://api.themoviedb.org/3/authentication/session/new?api_key=59d266ad02d1642bf64bc31fb887924c';

    const fetchToken = async () =>  {
        try {
        const response = await fetch(APITOKEN);
        const tokenData = await response.json();
        setGetToken(tokenData);
        } catch (error) {
        console.log(error);
        }
    }
    useEffect(() => {
        fetchToken();
    }, []);

    const fetchUser = async () =>  {
        try {
        const response = await fetch(APIUSER);
        const userData = await response.json();
        setGetUser(userData);
        } catch (error) {
        console.log(error);
        }
    }
    useEffect(() => {
        fetchUser();
    }, []);
    console.log('1', getToken);
    console.log('2', getUser);

    return (
        <>
            <BaseInfo />
            <FavMovie />
            <NavBar />
        </>
    )

    function BaseInfo() {
        return (
            <>
            <div className="container">
                <div>
                    <img src="https://github.com/MathisVkg/movieBrowser/blob/main/src/assets/avatar.png?raw=true" alt="avatar"></img>
                    <div>
                        <p className="name">Mathis</p>
                        <p className="lastname">Vankoekelberg</p>
                        <div className="circularGroup">
                            <CircularProgressbar
                                background
                                backgroundPadding={6}
                                value={percentage}
                                text={`${percentage}%`}
                                strokeWidth={6}
                            />
                            <p className="circularBarText">Average Movie Score</p>
                        </div>
                    </div>
                </div>
                <p className="desTitle">Description: </p>
                <p className="description">The legends remain in history, other stay in oblivion</p>
            </div>
            </>
        );
    }

    function FavMovie() {
        return (
            <>
            </>
        );
    }
}

export default User
