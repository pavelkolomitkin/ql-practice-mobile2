import axios from '../../axios';
import {BaseService} from './base-service';

export default class PhotoService extends BaseService
{
    /**
     *
     * @param photo: { uri: string, type: string, name: string }
     * @param onProgress: Function
     */
    upload(photo, onProgress = null)
    {
        const data = new FormData();
        data.append('image', {
            uri: photo.uri,
            name: photo.fileName,
            type: photo.type
        });

        return axios.post('client/photo/upload', data, {
                headers: {
                    'Content-Type': 'multipart/form-data;'
                },
                onUploadProgress: (event) => {

                    if (onProgress)
                    {
                        const progress = Math.ceil(event.loaded * 100 / event.total);
                        onProgress(progress);
                    }
                }
            })
            .then((response) => {

                console.log('UPLOAD RESPONSE', response);

                return response.data;
            })
            .catch((errors) => {

                console.log('UPLOAD ERRORS', errors);

                throw errors;
            });
    }

    remove()
    {
        return axios
            .put('client/photo/remove')
            .then(response => response.data)
            ;
    }
}