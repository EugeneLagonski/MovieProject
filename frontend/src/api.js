import axios from 'axios'
import {auth} from './actions'
import {history} from "./index";

export const ROUTE_404 = '/error_404';
export const ROUTE_500 = '/error_500';

export const api = axios.create({
    baseURL: 'http://api.localexample.com/',
    method: 'get',
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    config.headers.Authorization = token ? `Token ${token}` : '';
    return config;
});

api.interceptors.response.use(response => {
        return response;
    },
    error => {
        switch (error.response.status) {
            case 401:
                auth.logout();
                break;
            case 403:
                //reload user info
                break;
            case 404:
                history.push(ROUTE_404);
                break;
            case 500:
                history.push(ROUTE_500);
                break;
        }

        return Promise.reject(error);
    });
