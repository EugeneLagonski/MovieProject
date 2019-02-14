import {combineReducers} from 'redux';
import {authReducer} from './authReducer';
import {dataReducer} from './dataReducer'

import {initialState as dataState} from "./dataReducer";
import {initialState as authState} from "./authReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    data: dataReducer
});

export const initialState = {
    ...dataState,
    ...authState
};

export default rootReducer