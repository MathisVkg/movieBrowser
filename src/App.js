import './assets/scss/App.css';
import Loading from './components/Loading';
import Movies from './components/Movies';
import NavBar from './components/NavBar';
import Detail from './components/Detail';
import Discover from './components/Discover';
import Home from './components/Home';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router , Route, Switch } from "react-router-dom";

const APIURL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=59d266ad02d1642bf64bc31fb887924c&page=';
const PAGENUMBER = 1;
const IMGPATH = "https://image.tmdb.org/t/p/w1280";

function MovieApi() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);

  const fetchMovies = async () => {
    setLoading(true);

    try {
      const response = await fetch(APIURL + PAGENUMBER);
      const movies = await response.json();
      setLoading(false);
      setMovies(movies);
      console.log(movies);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }
  useEffect(() => {
    fetchMovies();
  }, []);


  if(loading) {
    return (
      <main>
        <Loading />
      </main>
    );
  }
}


export default function App() {
  MovieApi();
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
          <Home />
        </Route>
      </Switch>

    </Router>
  )
}

