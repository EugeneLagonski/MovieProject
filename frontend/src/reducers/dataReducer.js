import _ from "lodash"
import {FETCHING_DATA_FAIL, FETCHING_DATA_SUCCESS, FINISH_EDIT, START_EDIT} from "../actions/types";


export const initialState = {
    isEditing: false,
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

        case START_EDIT:
            return {...state, isEditing: true};

        case FINISH_EDIT:
            return {...state, isEditing: false};
        default:
            return state;
    }
};
