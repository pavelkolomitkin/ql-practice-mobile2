import * as types from './types';

import SecurityService from '../../services/security-service';

const service = new SecurityService();

export function register(email, fullName, password, passwordRepeat, nativeLanguage, practiceLanguage, practiceLanguageLevel) {
    return (dispatch) => {

        return service.register(
            email,
            fullName,
            password,
            passwordRepeat,
            nativeLanguage,
            practiceLanguage,
            practiceLanguageLevel
        )
            .then(() => {
                dispatch(userRegisterSuccess());
            })
            .catch(errors => {

                dispatch(userRegisterError(errors));

                throw errors;
            });
    }
}

export function login(email, password) {
    return (dispatch) => {

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

export function getAgreement() {
    return (dispatch) => {

        return service
            .getAgreement()
            .then(result => {
                dispatch(userAgreementLoaded(result));

                return result;
            })
            ;
    }
}

export function getUserInfo() {
    return (dispatch) => {

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

const userRegisterSuccess = () => {
    return {
        type: types.SECURITY_USER_REGISTER_SUCCESS
    };
};

const userRegisterError = (errors) => {
    return {
        type: types.SECURITY_USER_REGISTER_ERROR,
        errors
    }
};

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

const userAgreementLoaded = (text) => {
    return {
        type: types.SECURITY_AGREEMENT_LOADED,
        text
    };
};