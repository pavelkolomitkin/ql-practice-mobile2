import * as types from '../types';
import {FacebookService} from '../../../services/security/facebook-service';
import LocalStorage from '../../../services/local-storage';
import {userLoginError, userLoginSuccess} from './security';

const service = new FacebookService();

export function login(credentials) {
    return (dispatch) => {

        return service
            .login(credentials)
            .then(async (data) => {
                const { token, user } = data;

                await LocalStorage.setItem(LocalStorage.SECURITY_TOKEN, token);

                dispatch(userLoginSuccess(token, user));
                return token;
            })
            .catch((errors) => {
                dispatch(userLoginError(errors));

                throw errors;
            });
    }
}