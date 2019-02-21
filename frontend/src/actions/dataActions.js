import {api} from "../api";
import {detailMovieResponseToState, formValuesToRequest} from "../utils/dataUtils";
import {FETCHING_DATA_FAIL, FETCHING_DATA_SUCCESS, FINISH_EDIT, START_EDIT} from "./types";


export const fetchMoviePage = (page) => dispatch =>
    api.get(`/movies/?page=${page || 1}`)
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
    api.get(`/movies/${id}/`)
        .then(res => {
            console.log('Request success', res);
            dispatch({
                type: FETCHING_DATA_SUCCESS, data: detailMovieResponseToState(res.data)
            });
        })
        .catch((error) => {
            error = JSON.stringify(error);
            console.log('Request failed', error);
            dispatch({type: FETCHING_DATA_FAIL})
        });

export const fetchDetailActor = (id) => dispatch =>
    api.get(`/actors/${id}/`)
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
    api.get(`/directors/${id}/`)
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

export const startEdit = () => dispatch => dispatch({type: START_EDIT});

export const finishEdit = () => dispatch => dispatch({type: FINISH_EDIT});

export const updateMovie = (id, values) => dispatch => {
    const data = formValuesToRequest(id, values);
    console.log(data);
    console.log();
    return api.put(`/movies/${id}/`, data)
        .then(res => {
            console.log('Request success', res);
            dispatch({
                type: FETCHING_DATA_SUCCESS, data: detailMovieResponseToState(res.data), mode: 'NO_DEEP'
            });
        })
        .catch((error) => {
            error = JSON.stringify(error);
            console.log('Request failed', error);
            dispatch({type: FETCHING_DATA_FAIL})
        });
};
