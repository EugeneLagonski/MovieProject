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
        if (res.status === 200) {
            dispatch({type: LOGIN_SUCCESSFUL, data: res.data});
            return res.data;
        } else if (res.status === 403 || res.status === 401) {
            dispatch({type: AUTHENTICATION_ERROR, data: res.data});
            throw res.data;
        } else {
            dispatch({type: LOGIN_FAILED, data: res.data});
            throw res.data;
        }
    }).catch((error) => {
        console.log('Request failed', error);
    });
};


export const logout = (token) => dispatch => {
    console.log('in logout');

    axios.post(`${API_URL}/auth/logout/`, {}, {
        headers: {
            'Authorization': 'Token ' + token
        }
    }).then(res => {
        if (res.status === 204) {
            dispatch({type: LOGOUT_SUCCESSFUL});
            return res.data;
        } else if (res.status === 403 || res.status === 401) {
            dispatch({type: AUTHENTICATION_ERROR, data: res.data});
            throw res.data;
        }
    }).catch((error) => {
        console.log('Request failed', error);
    });
};


export const register = (username, password) => dispatch => {
    axios.post(`${API_URL}/auth/register/`,
        JSON.stringify({username, password})
    ).then(res => {
        if (res.status === 200) {
            dispatch({type: REGISTRATION_SUCCESSFUL, data: res.data});
            return res.data;
        } else if (res.status === 403 || res.status === 401) {
            dispatch({type: AUTHENTICATION_ERROR, data: res.data});
            throw res.data;
        } else {
            dispatch({type: REGISTRATION_FAILED, data: res.data});
            throw res.data;
        }
    }).catch((error) => {
        console.log('Request failed', error);
    });
};
