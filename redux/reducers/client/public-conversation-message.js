import * as types from '../../actions/client/types';

export const initialState = {
    lastCreatedMessage: null
};

export const reducer = (state = {}, action) => {

    switch (action.type) {

        case types.PUBLIC_CONVERSATION_MESSAGE_CREATED:

            return {
                ...state,
                ...initialState,
                lastCreatedMessage: action.message
            };

        default:

            return state;

    }
};