import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from "react-router-dom";
import {Switch} from "react-router";

import registerServiceWorker from './registerServiceWorker';

import App from './components/App';
import MyNavbar from './components/MyNavbar'
import MoviesList from "./components/MoviesList";
import MovieDetail from "./components/MovieDetail";
import ActorDetail from "./components/ActorDetail";
import DirectorDetail from "./components/DirectorDetail";
import ReRenderRouter from "./components/ReRenderRouter";

import './css/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';


ReactDOM.render(
    <Router>
        <div>
            <MyNavbar/>
            <Switch>
                <ReRenderRouter path="/movies/:page" component={MoviesList} RouteKey={true}/>
                <Route path="/movies/" component={MoviesList}/>}/>
                <Route path="/movie/:movieId" component={MovieDetail}/>
                <Route path="/actor/:actorId" component={ActorDetail}/>
                <Route path="/director/:directorId" component={DirectorDetail}/>
                <Route exact path="/" component={App}/>
            </Switch>
        </div>
    </Router>,
    document.getElementById('root'));
registerServiceWorker();
