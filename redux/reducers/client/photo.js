import * as types from '../../actions/client/types';

export const initialState = {
    startedUploadPhoto: null,
    lastUploadedPhoto: null,
    lastUploadError: null
};

export const reducer = (state = {}, action) => {

    switch (action.type) {

        case types.USER_UPLOAD_PHOTO_START:

            return {
                ...state,
                ...initialState,
                startedUploadPhoto: action.photo,
            };

        case types.USER_UPLOAD_PHOTO_SUCCESS:

            return {
                ...state,
                ...initialState,
                lastUploadedPhoto: action.photo
            };


        case types.USER_UPLOAD_PHOTO_ERROR:

            return {
                ...state,
                ...initialState,
                lastUploadError: action.error
            };

        default:

            return state;
    }

};