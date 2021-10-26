import NavBar from './NavBar';
import '../assets/css/User.css';
import React, { useEffect, useState } from 'react';
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
//59d266ad02d1642bf64bc31fb887924c

const User = () => {

    const percentage = 77;

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
