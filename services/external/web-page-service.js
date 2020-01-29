import axios from 'axios';
import WebPage from '../model/message/web-page';

export default class WebPageService {

    async getPage(url)
    {
        try
        {
            const response = await axios.get(url);
            const contentType = response.headers['Content-Type'];

            if (contentType && (contentType.indexOf('text/html') === 0))
            {
                return new WebPage(response.data);
            }
        }
        catch (error) {

        }

        return null;
    }

}