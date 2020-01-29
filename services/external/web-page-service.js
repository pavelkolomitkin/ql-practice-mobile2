import axios from 'axios';
import WebPage from '../model/message/web-page';

export default class WebPageService {

    async getPage(url)
    {
        try
        {
            const response = await axios.get(url, { maxRedirects: 2 });
            const contentType = response.headers['content-type'];

            if (contentType && (contentType.indexOf('text/html') === 0))
            {
                return new WebPage(response.data, url);
            }
        }
        catch (error) {
            debugger
        }

        return null;
    }

}