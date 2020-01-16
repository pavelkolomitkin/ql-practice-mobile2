import axios from '../axios/index';

export default class LanguageService {

    getAll()
    {
        return axios
            .get('/language/list')
            .then(result => result.data);
    }

    getLevels()
    {

        return axios
            .get('/language-level/list')
            .then(result => result.data);

        // return new Promise((resolve, reject) => {
        //
        //     resolve([
        //         {
        //             id: 1,
        //             title: 'Beginner'
        //         },
        //
        //         {
        //             id: 2,
        //             title: 'Elementary'
        //         },
        //         {
        //             id: 3,
        //             title: 'Intermediate'
        //         },
        //         {
        //             id: 4,
        //             title: 'Advanced'
        //         },
        //         {
        //             id: 5,
        //             title: 'Native'
        //         }
        //     ]);
        //
        // });
    }

}