import * as types from './types';

import ImagePicker from 'react-native-image-picker';
import config from '../../../app';
import PhotoService from '../../../services/client/photo-service';

const service = new PhotoService();


export const upload = (props: { title: string } = {}) => {

    const title = props.title || 'Select Photo(7Mb max)';

    return async (dispatch) => {

        return new Promise(async (resolve, reject) => {

            await ImagePicker.showImagePicker({
                title,
                mediaType: 'photo'
            }, async (response) => {

                if (response.didCancel)
                {
                    reject(null);
                    return;
                }

                if (response.fileSize > config.uploadPhotoMaxSize)
                {
                    const errorMessage = 'The photo exceeded 7Mb!';

                    dispatch(uploadPhotoError(errorMessage));
                    reject(errorMessage);

                    return;
                }

                dispatch(uploadPhotoStart(response));

                service.upload({
                        uri: response.uri,
                        fileName: response.fileName,
                        type: response.type
                    })
                    .then(user => {

                        dispatch(uploadPhotoComplete(user.photo));

                        resolve(user);
                        return user;
                    })
                    .catch(errors => {

                        //TODO pass there the appropriate data
                        dispatch(uploadPhotoError(errors));
                        reject(errors);
                    });
            });
        });
    }
};

export const remove = () => {
    return (dispatch) => {

        return service.remove();

    }
};


const uploadPhotoStart = (photo) => {
    return {
        type: types.USER_UPLOAD_PHOTO_START,
        photo
    };
};

const uploadPhotoComplete = (photo) => {
    return {
        type: types.USER_UPLOAD_PHOTO_SUCCESS,
        photo
    };
};

const uploadPhotoError = (error) => {

    return {
        type: types.USER_UPLOAD_PHOTO_ERROR,
        error
    };

};