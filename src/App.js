import './assets/scss/App.css';
import Loading from './components/Loading';
import React, { useState, useEffect } from 'react';

const APIURL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=59d266ad02d1642bf64bc31fb887924c&page=';
const PAGENUMBER = 1;
const IMGPATH = "https://image.tmdb.org/t/p/w1280";

function App() {
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
  return (
    <main>
      <h2>test</h2>
    </main>
  )
}

export default App;
