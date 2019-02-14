import axios from "axios";

import {API_URL} from "../constants";
import {
    LOGIN_SUCCESSFUL,
    AUTHENTICATION_ERROR,
    LOGIN_FAILED,
    LOGOUT_SUCCESSFUL,
    REGISTRATION_SUCCESSFUL, REGISTRATION_FAILED
} from "./types";

axios.defaults.headers.post["Content-Type"] = "application/json";


export const login = (username, password) => dispatch => {
    console.log('in login');

    axios.post(`${API_URL}/auth/login/`,
        JSON.stringify({username, password})
    ).then(res => {
        dispatch({type: LOGIN_SUCCESSFUL, data: res.data});
        return res.data;
    }).catch(error => {
        error = JSON.stringify(error);
        console.log('Request failed', error);
        if (error.status === 403 || error.status === 401) {
            dispatch({type: AUTHENTICATION_ERROR, data: error.data});
        } else {
            dispatch({type: LOGIN_FAILED, data: error.data});
        }
    })
};


export const logout = (token) => dispatch => {
    console.log('in logout');

    axios.post(`${API_URL}/auth/logout/`, {}, {
        headers: {
            'Authorization': 'Token ' + token
        }
    }).then(res => {
        dispatch({type: LOGOUT_SUCCESSFUL});
        return res.data;
    }).catch((error) => {
        error = JSON.stringify(error);
        console.log('Request failed', error);
        if (error.status === 403 || error.status === 401) {
            dispatch({type: AUTHENTICATION_ERROR, data: error.data});
        }
    });
};


export const register = (username, password) => dispatch => {
    axios.post(`${API_URL}/auth/register/`,
        JSON.stringify({username, password})
    ).then(res => {
        dispatch({type: REGISTRATION_SUCCESSFUL, data: res.data});
        return res.data;

    }).catch((error) => {
        error = JSON.stringify(error);
        console.log('Request failed', error);
        if (error.status === 403 || error.status === 401) {
            dispatch({type: AUTHENTICATION_ERROR, data: error.data});
        } else {
            dispatch({type: REGISTRATION_FAILED, data: error.data});
        }
    });
};
