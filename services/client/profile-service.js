import axios from '../../axios';

export default class ProfileService {

    edit(user)
    {
        return axios.put('client/profile', {
                aboutMe: !!user.aboutMe ? user.aboutMe : '',
                fullName: user.fullName
            })
            .then(response => response.data)
            .catch(errors => {
                throw errors.response.data.errors || errors.response.data;
            });
    }

}