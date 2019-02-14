import axios from "axios";

import {API_URL} from "../constants";
import {FETCHING_DATA_FAIL, FETCHING_DATA_SUCCESS} from "./types";


export const fetchMoviePage = (page) => dispatch =>
    axios.get(`${API_URL}/movies/?page=${page || 1}`)
        .then(res => {
            page = page || 1;
            console.log('Request success', res);
            const pagination = {
                currentPage: parseInt(page),
                items: [],
                totalItems: res.data.count,
            };
            const movies = res.data.results.reduce((obj, movie) => {
                pagination.items.push(movie.id);
                return {...obj, [movie.id]: {title: movie.title}}
            }, {});

            dispatch({
                type: FETCHING_DATA_SUCCESS, data: {
                    movies: movies,
                    pagination: pagination
                }
            });
        })
        .catch((error) => {
            error = JSON.stringify(error);
            console.log('Request failed', error);
            dispatch({type: FETCHING_DATA_FAIL})
        });

export const fetchDetailMovie = (id) => dispatch =>
    axios.get(`${API_URL}/movies/${id}`)
        .then(res => {
            console.log('Request success', res);

            const movie = res.data;
            const actors = {};
            const directors = {[movie.director]: {name: movie.director_name}};

            const _actors = movie.actors.reduce((obj, actor) => {
                actors[actor.actor_id] = {name: actor.name};
                obj[actor.actor_id] = {
                    character_name: actor.character_name,
                    is_primary: actor.is_primary
                };
                return obj;
            }, {});

            const movies = {
                [movie.id]: {
                    title: movie.title,
                    director: movie.director,
                    actors: _actors
                }
            };

            dispatch({
                type: FETCHING_DATA_SUCCESS, data: {
                    movies: movies,
                    actors: actors,
                    directors: directors
                }
            });

        })
        .catch((error) => {
            error = JSON.stringify(error);
            console.log('Request failed', error);
            dispatch({type: FETCHING_DATA_FAIL})
        });

export const fetchDetailActor = (id) => dispatch =>
    axios.get(`${API_URL}/actors/${id}`)
        .then(res => {
            console.log('Request success', res);

            const actor = res.data;

            const actors = {
                [actor.id]: {name: actor.name}
            };

            dispatch({
                type: FETCHING_DATA_SUCCESS, data: {
                    actors: actors,
                }
            });

        })
        .catch((error) => {
            error = JSON.stringify(error);
            console.log('Request failed', error);
            dispatch({type: FETCHING_DATA_FAIL})
        });

export const fetchDetailDirector = (id) => dispatch =>
    axios.get(`${API_URL}/directors/${id}`)
        .then(res => {
            console.log('Request success', res);

            const director = res.data;

            const directors = {
                [director.id]: {name: director.name}
            };

            dispatch({
                type: FETCHING_DATA_SUCCESS, data: {
                    actors: directors,
                }
            });
        })
        .catch((error) => {
            error = JSON.stringify(error);
            console.log('Request failed', error);
            dispatch({type: FETCHING_DATA_FAIL})
        });
