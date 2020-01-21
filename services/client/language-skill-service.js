import axios from '../../axios';
import {BaseService} from './base-service';

export default class LanguageSkillService extends BaseService{

    /**
     * @param language: Object
     * @param level: Object
     * @param tags: Array<string>
     * @returns {Promise<AxiosResponse<T> | void>}
     */
    create(language, level, tags)
    {
        return axios
            .post('client/language-skill', {
                language: language.id,
                level: level.id,
                tags
            })
            .then(response => response.data.skill)
            .catch(errors => this.catchErrors(errors))
            ;
    }

    /**
     *
     * @param skill: Object
     * @param level: Object
     * @param tags: Array<string>
     * @returns {Promise<AxiosResponse<T> | void>}
     */
    update(skill, level, tags)
    {
        return axios
            .put('client/language-skill/' + skill.id, {
                level: level.id,
                tags
            })
            .then(response => response.data.skill)
            .catch(errors => this.catchErrors(errors))
            ;
    }

    /**
     *
     * @param skill: Object
     * @returns {Promise<AxiosResponse<T> | void>}
     */
    remove(skill)
    {
        return axios
            .delete('client/language-skill/' + skill.id)
            .catch(errors => this.catchErrors(errors))
            ;
    }
}