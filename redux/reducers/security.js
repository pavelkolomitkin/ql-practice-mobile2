import * as types from '../actions/types';

export const initialState = {
    token: null,
    user: null,
    loginErrors: {},
    registerErrors: {},
};


export const reducer = (state = {}, action) => {

    switch (action.type) {

        case types.SECURITY_USER_REGISTER_ERROR:

            return {
                ...state,
                registerErrors: action.errors
            };

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

        case types.SECURITY_USER_INITIALIZED_SUCCESS:

            return {
                ...state,
                user: action.user
            };

        case types.SECURITY_USER_INITIALIZED_ERROR:

            return {
                token: null,
                user: null
            };

        default:

            return state;

    }
};