import * as types from './types';

import PublicConversationService from '../../../services/client/public-conversation-service';

const service = new PublicConversationService();

export const create = (title, language) => {
    return (dispatch) => {

        return service
            .create(title, language)
            .then(conversation => {

                dispatch(conversationCreateSuccess(conversation));

                return conversation;
            })
            .catch(errors => {

                dispatch(conversationCreateError(errors));

                throw errors;
            });
    }
};

export const update = (conversation) => {
    return (dispatch) => {

        return service
            .update(conversation)
            .then(updated => {
                dispatch(conversationUpdateSuccess(updated));

                return updated;
            })
            .catch(errors => {

                dispatch(conversationUpdateError(errors));

                throw errors;
            });
    }
};

export const setArchived = (conversation, isArchived) => {
    return (dispatch) => {

        return this
            .service
            .setArchived(conversation, isArchived)
            .then(updated => {

                dispatch(conversationUpdateArchived(updated));

                return updated;
            })
            ;
    }
};


const conversationCreateSuccess = (conversation) => {
    return {
        type: types.PUBLIC_CONVERSATION_CREATE_SUCCESS,
        conversation
    };
};

const conversationCreateError = (errors) => {
    return {
        type: types.PUBLIC_CONVERSATION_CREATE_ERROR,
        errors
    };
};

const conversationUpdateSuccess = (conversation) => {
    return {
        type: types.PUBLIC_CONVERSATION_UPDATE_SUCCESS,
        conversation
    };
};

const conversationUpdateError = (errors) => {
    return {
        type: types.PUBLIC_CONVERSATION_UPDATE_ERROR,
        errors
    }
};

const conversationUpdateArchived = (conversation) => {
    return {
        type: types.PUBLIC_CONVERSATION_ARCHIVE_STATUS_CHANGED,
        conversation
    };
};