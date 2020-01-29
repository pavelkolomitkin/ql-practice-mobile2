import axios from '../../../axios';

import {BaseService} from '../base-service';

export default class TextMessageService extends BaseService{

    create(text, conversation)
    {
        return axios
            .post('client/public-conversation-message/text', {
                text,
                conversation: conversation.id
            })
            .then(response => response.data.message)
            .catch(errors => this.catchErrors(errors));
    }
}