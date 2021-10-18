import React from 'react';
import NavBar from './NavBar';
import '../assets/scss/User.css';

const User = () => {
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
                <img src="../assets/avatar.png" alt="avatar"></img>
                <p className="pseudo">Zeyros</p>
            </div>
            </>
        );
    }

}

export default User
