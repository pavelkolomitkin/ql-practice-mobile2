import axios from '../../axios';
import {BaseService} from './base-service';

export default class TopicTagService extends BaseService
{
    search (params)
    {
        return axios.get('client/topic-tag/search', {
            params
        })
            .then(response => response.data.tags)
            .catch(errors => this.catchErrors(errors));
    }
}