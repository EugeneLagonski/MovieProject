import {combineReducers} from 'redux';
import {authReducer} from './authReducer';
import {dataReducer} from './dataReducer'
import {reducer as formReducer} from 'redux-form'

import {initialState as dataState} from "./dataReducer";
import {initialState as authState} from "./authReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    data: dataReducer,
    form: formReducer,
});

export const initialState = {
    ...dataState,
    ...authState
};

export default rootReducer