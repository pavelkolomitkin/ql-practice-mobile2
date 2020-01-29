import axios from 'axios';
import {LinkInfo} from './link-info';
import * as _ from 'lodash';

export default class MessageParser
{
    static WEB_LINK_PATTERN = new RegExp("(http|https)\\:\\/\\/(\\S)+", 'img');

    static YOUTUBE_PATTERN = new RegExp("(www|m)\\.youtube\\.com\\/watch\\?v=(\\S)+", 'i');

    async parse(text)
    {
        let result = [];

        const matches = text.match(MessageParser.WEB_LINK_PATTERN);

        if (matches !== null)
        {
            for (const item of matches) {
                const link = await this.identifyParsedLink(item);
                result.push(link);
            }
        }

        return _.uniqBy(result, 'url');
    }

    async identifyParsedLink(link)
    {
        if (this.isYoutubeLink(link)) {
            return new LinkInfo(link, LinkInfo.YOUTUBE_TYPE)
        }

        if (await this.isPictureLink(link))
        {
            return new LinkInfo(link, LinkInfo.PICTURE_TYPE);
        }

        return new LinkInfo(link, LinkInfo.REGULAR_TYPE);
    }

    isYoutubeLink(link)
    {
        return MessageParser.YOUTUBE_PATTERN.test(link);
    }

    async isPictureLink(link)
    {
        let result = false;

        try
        {
            const response = await axios.head(link);
            const contentType = response.headers['content-type'];

            if (contentType && (contentType.indexOf('image/') === 0))
            {
                result = true;
            }
        }
        catch (error) {
            //debugger
        }

        return result;
    }
}