import * as types from '../actions/types';

export const initialState = {
    token: null,
    loginErrors: {}
};


export const reducer = (state = {}, action) => {

    switch (action.type) {

        case types.SECURITY_USER_LOGIN_SUCCESS:

            return {
                ...state,
                token: action.token,
                loginErrors: {}
            };

        case types.SECURITY_USER_LOGIN_ERROR:

            return {
                ...state,
                loginErrors: action.errors
            };

        case types.SECURITY_USER_LOGOUT:

            return {
                ...state,
                ...initialState
            };

        default:

            return state;

    }
};