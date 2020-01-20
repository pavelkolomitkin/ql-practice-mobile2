import * as types from '../../actions/client/types';

export const initialState = {
    lastUpdatedUser: null,
    lastUpdateUserErrors: {}
};

export const reducer = (state = {}, action) => {

    switch (action.type) {

        case types.USER_UPDATE_PROFILE_SUCCESS:

            return {
                ...state,
                ...initialState,
                lastUpdatedUser: action.user
            };

        case types.USER_UPDATE_PROFILE_ERROR:

            return {
                ...state,
                ...initialState,
                lastUpdateUserErrors: action.errors
            };

        default:

            return state;

    }

};