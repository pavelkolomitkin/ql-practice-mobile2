

export default class LanguageService {

    getAll()
    {
        return new Promise((resolve, reject) => {

            resolve([
                {
                    id: 1,
                    title: 'English'
                },

                {
                    id: 2,
                    title: 'Russian'
                },
                {
                    id: 3,
                    title: 'German'
                },
                {
                    id: 4,
                    title: 'Chinese'
                }
            ]);

        });
    }

    getLevels()
    {
        return new Promise((resolve, reject) => {

            resolve([
                {
                    id: 1,
                    title: 'Beginner'
                },

                {
                    id: 2,
                    title: 'Elementary'
                },
                {
                    id: 3,
                    title: 'Intermediate'
                },
                {
                    id: 4,
                    title: 'Advanced'
                },
                {
                    id: 5,
                    title: 'Native'
                }
            ]);

        });
    }

}