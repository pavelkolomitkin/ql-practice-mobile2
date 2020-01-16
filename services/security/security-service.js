import axios from '../../axios'

export default class SecurityService
{
    register(email, fullName, password, passwordRepeat, nativeLanguage, practiceLanguage, practiceLanguageLevel)
    {
        const body = {
            email,
            fullName,
            password,
            passwordRepeat,
            nativeLanguage: nativeLanguage.id,
            practiceLanguage: practiceLanguage.id,
            practiceLanguageLevel: practiceLanguageLevel.id
        };

        return axios
            .post('/security/register', body)
            .catch(errors => {
                throw errors.response.data.errors || errors.response.data;
            });
    }

    getAgreement()
    {
        return axios
            .get('/security/agreement')
            .then(result => result.data.agreement);
    }

    restorePasswordRequest(email)
    {
        return axios
            .post('/security/restore-password-request', { email })
            .catch(errors => {
                throw errors.response.data.errors || errors.response.data;
            })
            ;
    }

    login(email, password)
    {
        return axios
            .post('/security/login', {
                email,
                password
            })
            .then(result =>{
                return {token: result.data.token, user: result.data.user};
            })
            .catch(errors => {
                throw errors.response.data.errors || errors.response.data;
            });
    }

    getUserInfo()
    {
        return axios
            .get('/security/profile')
            .then(result => result.data.user)
            ;
    }
}