import * as types from './types';
import ProfileService from '../../../services/client/profile-service';

const service = new ProfileService();

export const edit = (user) => {

    return (dispatch) => {

        return service
            .edit(user)
            .then(user => {

                dispatch(profileEditSuccess(user));

                return user;
            })
            .catch(errors => {

                dispatch(profileEditError(errors));

                throw errors;
            })
            ;
    }
};

const profileEditSuccess = (user) => {
    return {
        type: types.USER_UPDATE_PROFILE_SUCCESS,
        user
    };
};

const profileEditError = (errors) => {
    return {
        type: types.USER_UPDATE_PROFILE_ERROR,
        errors
    };
};