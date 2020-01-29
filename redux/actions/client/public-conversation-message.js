import * as types from './types';

import TextMessageService from '../../../services/client/public-conversation-message/text-message.service';

export const create = (message) => {
    return (dispatch) => {

        dispatch(messageCreated(message));
    }
};


const messageCreated = (message) => {
    return {
        type: types.PUBLIC_CONVERSATION_MESSAGE_CREATED,
        message
    };
};