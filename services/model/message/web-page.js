export default class WebPage
{
    static PROPERTY_META_TITLE = 'title';

    static PROPERTY_META_DESCRIPTION = 'description';

    static PROPERTY_META_IMAGE = 'image';

    meta: any = null;

    content: string;

    url: string;

    constructor(content, url) {
        this.content = content;
        this.url = url;
    }

    getMeta()
    {
        if (this.meta === null)
        {
            this.meta = {
                [WebPage.PROPERTY_META_TITLE]: this.getMetaTitle(),
                [WebPage.PROPERTY_META_DESCRIPTION]: this.getCommonMeta(WebPage.PROPERTY_META_DESCRIPTION),
                [WebPage.PROPERTY_META_IMAGE]: this.getMetaImage()
            };
        }

        return this.meta;
    }

    getCommonMeta(propertyName)
    {
        //debugger
        let matches = this.content.match(new RegExp('<meta(\\s)+property="(og\\:)?' + propertyName + '"[^>]*', 'ig'));
        if (!matches)
        {
            matches = this.content.match(new RegExp('<meta(\\s)+name="(og\\:)?' + propertyName + '"[^>]*', 'ig'));
        }

        if (!!matches)
        {
            //debugger
            //let content = matches[0].match(/content="([^"]*)"/ig);
            let content = /content="([^"]*)"/i.exec(matches[0]);
            if (!!content && (content[1]))
            {
                return content[1];
            }
        }

        return null;
    }

    getMetaTitle()
    {
        //debugger
        let result = this.getCommonMeta('title');
        if (!!result)
        {
            return result;
        }

        const matches = /<title>([^<]*)<\/title>/ig.exec(this.content);
        if (!!matches && !!matches[1])
        {
            return matches[1];
        }

        return null;
    }

    getBaseUrl()
    {
        const baseUrlRegEx = new RegExp("(http|https)\:\/\/[^\/]*\/",'i');
        const groups = baseUrlRegEx.exec(this.url);

        return groups[0];
    }

    getMetaImage()
    {
        let result = this.getCommonMeta(WebPage.PROPERTY_META_IMAGE);
        if (!!result)
        {
            if (result.indexOf('http') === -1)
            {
                result += this.getBaseUrl() + result;
            }
        }

        return result;
    }
}