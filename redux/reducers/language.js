import * as types from '../actions/types';

export const initialState = {
    languages: [],
    levels: []
};

export const reducer = (state = {}, action) => {

    switch (action.type) {

        case types.LANGUAGE_LOAD_ALL_SUCCESS:

            return {
                ...state,
                languages: action.list
            };


        case types.LANGUAGE_LEVEL_LOAD_ALL_SUCCESS:

            return {
                ...state,
                levels: action.list
            };

        default:

            return state;

    }
};
