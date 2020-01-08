import axios from '../axios/index'

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
}