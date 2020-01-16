import axios from '../../axios'

export class FacebookService {

    /**
     * Facebook credentials
     * @param credentials
     */
    login(credentials)
    {
        return axios
            .post('/facebook-account/login', credentials)
            .then(result => result.data);
    }
}