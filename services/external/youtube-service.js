import axios from 'axios';

export default class YoutubeService {

    async getInfo(link)
    {
        const apiUrl = 'https://www.youtube.com/oembed?url=' + link + '&format=json';

        return axios.get(apiUrl).then(response => response.data);
    }
}