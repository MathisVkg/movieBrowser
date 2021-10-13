import './assets/scss/App.css';
// import Movies from './components/Movies';
import NavBar from './components/NavBar';
import Detail from './components/Detail';
import Discover from './components/Discover';
import Home from './components/Home';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router , Route, Switch } from "react-router-dom";

const APIURL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=59d266ad02d1642bf64bc31fb887924c&page=';
const PAGENUMBER = 1;
// const IMGPATH = "https://image.tmdb.org/t/p/w1280";

export default function App() {

  const [movies, setMovies] = useState([]);
  const fetchMovies = async () =>  {
    try {
      const response = await fetch(APIURL + PAGENUMBER);
      const moviesData = await response.json();
      setMovies(moviesData);
      // console.log(moviesData);
      // console.log(moviesData.results[0].title);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchMovies();
  }, []);
  
  
  return (
    <Router>

      <div>
        <NavBar />
      </div>

      <Switch>
        <Route path='/detail'>
          <Detail />
        </Route>
        <Route path='/discover'>
          <Discover />
        </Route>
        <Route path='/'>
            <Home movies={ movies }/>
        </Route>
      </Switch>

    </Router>
  )
}

