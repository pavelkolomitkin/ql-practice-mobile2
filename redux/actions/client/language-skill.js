import * as types from './types';
import LanguageSkillService from '../../../services/client/language-skill-service';

const service = new LanguageSkillService();

export const create = (language, level, tags) => {
    return (dispatch) => {

        return service
            .create(language, level, tags)
            .then(skill => {
                dispatch(createSuccess(skill));

                return skill;
            })
            .catch(errors => {
                dispatch(createError(errors));

                throw errors;
            })
            ;

    };
};

export const update = (skill, level, tags) => {
    return (dispatch) => {

        return service
            .update(skill, level, tags)
            .then(skill => {
                dispatch(updateSuccess(skill));

                return skill;
            })
            .catch(errors => {
                dispatch(updateError(errors));

                throw errors;
            })
            ;
    }
};

export const remove = (skill) => {
    return (dispatch) => {

        return service
            .remove(skill)
            .then(() => {
                dispatch(removeSuccess(skill));

                return skill;
            })
            .catch(errors => {
                dispatch(removeError(errors));

                throw errors;
            });
    }
};

const createSuccess = (skill) => {

    return {
        type: types.USER_LANGUAGE_SKILL_CREATE_SUCCESS,
        skill
    };
};

const createError = (errors) => {

    return {
        type: types.USER_LANGUAGE_SKILL_CREATE_ERROR,
        errors
    };
};


const updateSuccess = (skill) => {

    return {
        type: types.USER_LANGUAGE_SKILL_UPDATE_SUCCESS,
        skill
    };
};

const updateError = (errors) => {

    return {
        type: types.USER_LANGUAGE_SKILL_UPDATE_ERROR,
        errors
    };
};


export const removeSuccess = (skill) => {
    return {
        type: types.USER_LANGUAGE_SKILL_REMOVE_SUCCESS,
        skill
    };
};

export const removeError = (errors) => {
    return {
        type: types.USER_LANGUAGE_SKILL_REMOVE_ERROR,
        errors
    }
};