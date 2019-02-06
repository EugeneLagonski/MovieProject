import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from "react-router-dom";
import {Switch} from "react-router";

import registerServiceWorker from './registerServiceWorker';

import App from './components/App';
import MyNavbar from './components/MyNavbar'
import MoviesContainer from "./components/MoviesList";
import MovieDetail from "./components/MovieContainer";
import ActorContainer from "./components/ActorContainer";
import DirectorDetail from "./components/DirectorDetail";
import ReRenderRoute from "./components/ReRenderRoute";

import './css/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';


ReactDOM.render(
    <Router>
        <div>
            <MyNavbar/>
            <Switch>
                <ReRenderRoute path="/movies/:page" component={MoviesContainer} RouteKey={true}/>
                <Route path="/movies/" component={MoviesContainer}/>}/>
                <Route path="/movie/:movieId" component={MovieDetail}/>
                <Route path="/actor/:actorId" component={ActorContainer}/>
                <Route path="/director/:directorId" component={DirectorDetail}/>
                <Route exact path="/" component={App}/>
            </Switch>
        </div>
    </Router>,
    document.getElementById('root'));
registerServiceWorker();
