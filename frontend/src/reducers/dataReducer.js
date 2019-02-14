import _ from "lodash"
import {FETCHING_DATA_FAIL, FETCHING_DATA_SUCCESS} from "../actions/types";


export const initialState = {
    movies: {},
    actors: {},
    directors: {},
    pagination: {
        currentPage: null,
        items: [],
        totalItems: null,
        totalPages: null
    }
};


export const dataReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCHING_DATA_SUCCESS:
            return _.defaultsDeep(action.data, state);

        case FETCHING_DATA_FAIL:
            return {...state};

        default:
            return state;
    }
};
