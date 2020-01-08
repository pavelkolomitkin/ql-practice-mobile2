import * as types from './types';

import SecurityService from '../../services/security-service';

export function login(email, password) {
    return (dispatch) => {

        const service = new SecurityService();

        return service
            .login(email, password)
            .then((data) => {
                dispatch(userLoginSuccess(data.token));
                return data;
            })
            .catch(errors => {
                dispatch(userLoginError(errors));

                throw errors;
            })
            ;
    }
}

export function getUserInfo() {
    return (dispatch) => {

        const service = new SecurityService();

        return service
            .getUserInfo()
            .then(async (user) => {
                if (user === null)
                {
                    dispatch(userInitializedError());
                }
                else
                {
                    dispatch(userInitializedSuccess(user));
                }

                return user;
            });
    };
}

export function logout() {
    return (dispatch) => {

        // Remove the token from the AsyncStorage

        // dispatch action
        dispatch(userLogout());
    };
}

const userLoginSuccess = (token) => {
    return {
        type: types.SECURITY_USER_LOGIN_SUCCESS,
        token
    }
};

const userLoginError = (errors) => {
    return { type: types.SECURITY_USER_LOGIN_ERROR, errors }
};

const userLogout = () => {
    return {
        type: types.SECURITY_USER_LOGOUT
    }
};

const userInitializedSuccess = (user) => {
    return {
        type: types.SECURITY_USER_INITIALIZED_SUCCESS,
        user
    };
};

const userInitializedError = () => {
    return {
        type: types.SECURITY_USER_INITIALIZED_ERROR
    };
};