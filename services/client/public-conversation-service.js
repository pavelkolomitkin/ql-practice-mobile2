import axios from '../../axios';
import {BaseService} from './base-service';

export default class PublicConversationService extends BaseService
{
    /**
     * @param lastDate string
     */
    getMyList(lastDate)
    {
        return axios
            .get('client/public-conversation/my-list', {
                params: {
                    lastCreatedAt: lastDate
                }
            })
            .then(response => response.data.list)
    }

    get(id)
    {
        return axios
            .get('client/public-conversation/' + id)
            .then(response => response.data.conversation);
    }

    /**
     * @param title string
     * @param language Object
     */
    create(title, language)
    {
        return axios
            .post('client/public-conversation', {
                title,
                language: language.id
            })
            .then(response => response.data.conversation)
            .catch(errors => this.catchErrors(errors))
            ;
    }

    update(conversation)
    {
        return axios
            .put('client/public-conversation/' + conversation.id, {
                title: conversation.title,
                language: conversation.language.id
            })
            .then(response => response.data.conversation)
            .catch(errors => this.catchErrors(errors))
            ;
    }

    setArchived(conversation, isArchived)
    {
        return axios
            .put('client/public-conversation/' + conversation.id + '/archive/' + (isArchived ? '1' : '0'))
            .then(response => response.data.conversation)
            .catch(errors => this.catchErrors(errors))
            ;
    }

    updateTopics(conversation, topics)
    {
        return axios
            .put('client/public-conversation/' + conversation.id + '/topics', {
                topics
            })
            .then(response => response.data.conversation)
            .catch(errors => this.catchErrors(errors))
            ;
    }

    setUserBanStatus(conversation, user, isBanned)
    {
        const url = 'client/public-conversation/'
            + conversation.id
            + '/user-ban-status/'
            + user.id
            + '/' + (isBanned ? '1' : '0');

        return axios
            .post(url)
            .then(response => response.data.conversation)
            .catch(errors => this.catchErrors(errors))
            ;
    }
}