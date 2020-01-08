import * as types from './types';

import LanguageService from '../../services/language-service';
import LocalStorage from '../../services/local-storage';

export const loadLanguages = () => {
    return async (dispatch) => {


        const languagesRaw = await LocalStorage.getItem(LocalStorage.LANGUAGES);
        if (!languagesRaw)
        {
            const service = new LanguageService();
            return service
                .getAll()
                .then(async (list) => {

                    dispatch(languageListLoadSuccess(list));

                    await LocalStorage.setItem(LocalStorage.LANGUAGES, JSON.stringify(list));

                    return list;
                })
                .catch((errors) => {
                    dispatch(languageListLoadError(errors));

                    throw errors;
                });
        }
        else
        {
            const list = JSON.parse(languagesRaw);
            dispatch(languageListLoadSuccess(list));

            return list;
        }
    }
};

const languageListLoadSuccess = (list) => {
    return {
        type: types.LANGUAGE_LOAD_ALL_SUCCESS,
        list
    };
};

const languageListLoadError = (error) => {
    return {
        type: types.LANGUAGE_LOAD_ALL_ERROR,
        error
    };
};