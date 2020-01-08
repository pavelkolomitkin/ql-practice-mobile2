import * as types from '../actions/types';

export const initialState = {
    languages: []
};

export const reducer = (state = {}, action) => {

    switch (action.type) {

        case types.LANGUAGE_LOAD_ALL_SUCCESS:

            return {
                ...state,
                languages: action.list
            };

        default:

            return state;

    }
};
