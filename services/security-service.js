import axios from '../axios/index'
import LocalStorage from './local-storage';

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

    login(email, password)
    {
        return axios
            .post('/security/login', {
                email,
                password
            })
            .then(result => result.data.token)
            .catch(errors => {
                throw errors.response.data.errors || errors.response.data;
            });
    }

    async getUserInfo()
    {
        const token = await LocalStorage.getItem(LocalStorage.SECURITY_TOKEN);
        if (!token)
        {
            return null;
        }

        // TODO In the case when the token is not valid
            // remove it from the local storage
        return new Promise((resolve, reject) => {
            setTimeout(() => {

                resolve({
                    id: 1,
                    name: 'Ivan Petrov',
                    email: 'ivan.petrov@gmail.com',
                    nativeLanguages: [
                        {
                            id: 2,
                            title: 'Russian'
                        }
                    ],
                    practiceLanguages: [
                        {
                            id: 1,
                            title: 'English'
                        },
                        {
                            id: 3,
                            title: 'German'
                        },
                    ],
                    isActive: true
                })

            }, 100);
        });
    }
}