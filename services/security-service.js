import axios from '../axios/index'
import LocalStorage from './local-storage';

export default class SecurityService
{
    login(email, password)
    {
        return new Promise((resolve, reject) => {

            setTimeout(() => {


                resolve({
                    token: 'secret'
                });

                // reject({
                //     login: [
                //         'Invalid email'
                //     ],
                // });

            }, 1000)

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