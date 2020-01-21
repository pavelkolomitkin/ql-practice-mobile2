import * as types from '../../actions/client/types';

export const initialState = {
    lastCreated: null,
    lastCreateErrors: {},

    lastUpdated: null,
    lastUpdateErrors: {},

    lastDeleted: null,
    lastDeleteErrors: {}
};

export const reducer = (state = {}, action) => {

    switch (action.type) {

        case types.USER_LANGUAGE_SKILL_CREATE_SUCCESS:

            return {
                ...state,
                ...initialState,
                lastCreated: action.skill
            };

        case types.USER_LANGUAGE_SKILL_CREATE_ERROR:

            return {
                ...state,
                ...initialState,
                lastCreateErrors: action.errors
            };

        case types.USER_LANGUAGE_SKILL_UPDATE_SUCCESS:

            return {
                ...state,
                ...initialState,
                lastUpdated: action.skill
            };

        case types.USER_LANGUAGE_SKILL_UPDATE_ERROR:

            return {
                ...state,
                ...initialState,
                lastUpdateErrors: action.errors
            };

        case types.USER_LANGUAGE_SKILL_REMOVE_SUCCESS:

            return {
                ...state,
                ...initialState,
                lastDeleted: action.skill
            };

        case types.USER_LANGUAGE_SKILL_REMOVE_ERROR:

            return {
                ...state,
                ...initialState,
                lastDeleteErrors: action.errors
            };

        default:

            return state;
    }

};