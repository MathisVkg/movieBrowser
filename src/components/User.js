import NavBar from './NavBar';
import '../assets/scss/User.css';
import React, { useEffect, useState } from 'react';
//59d266ad02d1642bf64bc31fb887924c

const User = () => {

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
            <NavBar />
        </>
    )

    function BaseInfo() {
        return (
            <>
            <div className="container">
                <div>
                    <p className="name">Mathis</p>
                    <p className="lastname">Vankoekelberg</p>
                    <img src="https://github.com/MathisVkg/movieBrowser/blob/main/src/assets/avatar.png?raw=true" alt="avatar"></img>
                </div>
                <p className="pseudo">Zeyros</p>
            </div>
            </>
        );
    }

}

export default User
