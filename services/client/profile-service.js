import axios from '../../axios';
import {BaseService} from './base-service';

export default class ProfileService extends BaseService {

    edit(user)
    {
        return axios.put('client/profile', {
                aboutMe: !!user.aboutMe ? user.aboutMe : '',
                fullName: user.fullName
            })
            .then(response => response.data)
            .catch(errors => this.catchErrors(errors));
    }

}