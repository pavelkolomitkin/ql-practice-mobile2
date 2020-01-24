import * as types from '../../actions/client/types';

export const initialState = {
    lastCreated: null,
    lastCreateErrors: {},

    lastUpdated: null,
    lastUpdateErrors: {},

    lastArchiveStatusChanged: null
};

export const reducer = (state = {}, action) => {

    switch (action.type) {

        case types.PUBLIC_CONVERSATION_CREATE_SUCCESS:

            return {
                ...state,
                ...initialState,
                lastCreated: action.conversation
            };

        case types.PUBLIC_CONVERSATION_CREATE_ERROR:

            return {
                ...state,
                ...initialState,
                lastCreateErrors: action.errors
            };

        case types.PUBLIC_CONVERSATION_UPDATE_SUCCESS:

            return {
                ...state,
                ...initialState,
                lastUpdated: action.conversation,
            };

        case types.PUBLIC_CONVERSATION_UPDATE_ERROR:

            return {
                ...state,
                ...initialState,
                lastUpdateErrors: action.errors
            };

        case types.PUBLIC_CONVERSATION_ARCHIVE_STATUS_CHANGED:

            return {
                ...state,
                ...initialState,
                lastArchiveStatusChanged: action.conversation
            };

        default:

            return state;
    }
};