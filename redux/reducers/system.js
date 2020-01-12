import * as types from '../actions/types';

export const reducer = (state = {}, action) => {

    switch (action.type) {

        case types.SYSTEM_ERROR_INTERNAL_SERVER_ERROR:

            return {
                ...state,
                errorMessage: action.message
            };

        default:

            return state;
    }

};