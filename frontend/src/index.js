import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from "react-router-dom";
import {Switch} from "react-router";
import {Provider} from "react-redux";
import {createBrowserHistory} from 'history';
import store from "./store"

import registerServiceWorker from './registerServiceWorker';

import App from './components/App';
import NavBar from './components/NavBar'
import MoviesContainer from "./components/MoviesPaginated";
import MovieDetail from "./components/MovieDetail";
import ActorDetail from "./components/ActorDetail";
import DirectorDetail from "./components/DirectorDetail";
import LoginComponent from "./components/LoginComponent";
import RegisterComponent from "./components/RegisterComponent";
import Error500Component from "./components/Error500Component";
import Error404Component from "./components/Error404Component";

import './css/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';


export const history = createBrowserHistory();

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <div>
                <NavBar/>
                <Switch>
                    <Route path="/error_404" component={Error404Component}/>
                    <Route path="/error_500" component={Error500Component}/>
                    <Route path="/movies/:page" component={MoviesContainer} RouteKey={true}/>
                    <Route path="/movies" component={MoviesContainer}/>}/>
                    <Route path="/movie/:movieId" component={MovieDetail}/>
                    <Route path="/actor/:actorId" component={ActorDetail}/>
                    <Route path="/director/:directorId" component={DirectorDetail}/>
                    <Route path="/login" component={LoginComponent}/>
                    <Route path="/register" component={RegisterComponent}/>
                    <Route exact path="/" component={App}/>
                </Switch>
            </div>
        </Router>
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();
