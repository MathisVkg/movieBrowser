// import './assets/scss/App.css';
// import Movies from './components/Movies';
import NavBar from './components/NavBar';
import Detail from './components/Detail';
import Discover from './components/Discover';
import Home from './components/Home';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router , Route, Switch } from "react-router-dom";

// const APIURL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=59d266ad02d1642bf64bc31fb887924c&page=';
const APIURLTRENDING = 'https://api.themoviedb.org/3/trending/movie/day?api_key=59d266ad02d1642bf64bc31fb887924c';
// const PAGENUMBER = 1;

export default function App() {

  // const [movies, setMovies] = useState([]);
  // const fetchMovies = async () =>  {
  //   try {
  //     const response = await fetch(APIURL + PAGENUMBER);
  //     const moviesData = await response.json();
  //     setMovies(moviesData);
  //     console.log('1',moviesData);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  // useEffect(() => {
  //   fetchMovies();
  // }, []);

  const [moviesTrending, setMoviesTrending] = useState([]);
  const fetchMoviesTrending = async () =>  {
    try {
      const response = await fetch(APIURLTRENDING);
      const moviesTrending= await response.json();
      setMoviesTrending(moviesTrending);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchMoviesTrending();
  }, []);
  

  return (
    <Router>

      <NavBar />
      <Switch>
        <Route path='/detail'>
          <Detail />
        </Route>
        <Route path='/discover'>
          <Discover />
        </Route>
        <Route path='/'>
          <Home movies={ moviesTrending }/>
        </Route>
      </Switch>

    </Router>
  )
}

