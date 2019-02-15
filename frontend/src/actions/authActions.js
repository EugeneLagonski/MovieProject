import {api} from "../api";

import {
    LOGIN_SUCCESSFUL,
    LOGOUT_FAILED,
    LOGIN_FAILED,
    LOGOUT_SUCCESSFUL,
    REGISTRATION_SUCCESSFUL, REGISTRATION_FAILED
} from "./types";


export const login = (username, password) => dispatch => {
    console.log('in login');

    api.post('/auth/login/',
        JSON.stringify({username, password})
    ).then(res => {
        dispatch({type: LOGIN_SUCCESSFUL, data: res.data});
        return res.data;
    }).catch(error => {
        dispatch({type: LOGIN_FAILED, data: error.data});
    })
};


export const logout = () => dispatch => {
    console.log('in logout');

    api.post('/auth/logout/').then(res => {
        dispatch({type: LOGOUT_SUCCESSFUL});
        return res.data;
    }).catch((error) => {
        dispatch({type: LOGOUT_FAILED, data: error.data});
    });
};


export const register = (username, password) => dispatch => {
    api.post('/auth/register/',
        JSON.stringify({username, password})
    ).then(res => {
        dispatch({type: REGISTRATION_SUCCESSFUL, data: res.data});
        return res.data;

    }).catch((error) => {
        dispatch({type: REGISTRATION_FAILED, data: error.data});
    });
};
