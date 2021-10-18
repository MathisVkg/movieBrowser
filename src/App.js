
import Detail from './components/Detail';
import Discover from './components/Discover';
import Home from './components/Home';
import User from './components/User';
import React, { } from 'react';
import { BrowserRouter as Router , Route, Switch } from "react-router-dom";

//59d266ad02d1642bf64bc31fb887924c
// const SEARCHMOVIE = 'https://api.themoviedb.org/3/search/movie?api_key=59d266ad02d1642bf64bc31fb887924c&language=en-US&query=' + NAMESEARCH + '&page=1&include_adult=false';
// const APIURLTRENDING = 'https://api.themoviedb.org/3/trending/movie/day?api_key=59d266ad02d1642bf64bc31fb887924c';


export default function App() {
  
  // const [idTarget, SetIdTarget] = useState();
  
  return (
    <Router>

      <Switch>
        <Route path='/detail'>
          <Detail />
        </Route>
        <Route path='/user'>
          <User />
        </Route>
        <Route path='/discover'>
          <Discover />
        </Route>
        <Route path='/'>
          <Home 
          // idTarget = { idTarget } 
          />
        </Route>
      </Switch>

    </Router>
  )
}

