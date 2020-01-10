import * as types from './types';

import LanguageService from '../../services/language-service';
import LocalStorage from '../../services/local-storage';

const service = new LanguageService();

export const loadLanguages = () => {
    return async (dispatch) => {

        const languagesRaw = await LocalStorage.getItem(LocalStorage.LANGUAGES);
        if (!languagesRaw)
        {
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

export const loadLanguageLevels = () => {
    return async (dispatch) => {


        const languageLevelsRaw = await LocalStorage.getItem(LocalStorage.LANGUAGE_LEVELS);
        if (!languageLevelsRaw)
        {
            return service
                .getLevels()
                .then(async (list) => {
                    dispatch(languageLevelListLoadSuccess(list));

                    await LocalStorage.setItem(LocalStorage.LANGUAGE_LEVELS, JSON.stringify(list));

                    return list;
                })
                .catch(errors => {
                    dispatch(languageLevelListLoadError(errors));

                    throw errors;
                })
                ;
        }
        else
        {
            const list = JSON.parse(languageLevelsRaw);
            dispatch(languageLevelListLoadSuccess(list));

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

const languageLevelListLoadSuccess = (list) => {
    return {
        type: types.LANGUAGE_LEVEL_LOAD_ALL_SUCCESS,
        list
    };
};

const languageLevelListLoadError = (error) => {
    return {
        type: types.LANGUAGE_LEVEL_LOAD_ALL_ERROR,
        error
    };
};