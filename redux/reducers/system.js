import * as types from '../actions/types';

export const initialState = {
    networkErrorMessage: null,
};

export const reducer = (state = {}, action) => {

    switch (action.type) {

        case types.SYSTEM_ERROR_INTERNAL_SERVER_ERROR:

            return {
                ...state,
                networkErrorMessage: action.message
            };

        case types.SYSTEM_ERROR_INTERNAL_SERVER_ERROR_RESET:

            return {
                ...state,
                networkErrorMessage: null
            };

        default:

            return state;
    }

};