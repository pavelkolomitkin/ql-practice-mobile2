export default class WebPage
{
    static PROPERTY_META_TITLE = 'og:title';

    static PROPERTY_META_DESCRIPTION = 'og:description';

    static PROPERTY_META_IMAGE = 'og:image';

    meta: any = null;

    content: string;

    constructor(content) {
        this.content = content;
    }

    getMeta()
    {
        if (this.meta !== null)
        {
            this.meta = {};

            [
                WebPage.PROPERTY_META_TITLE,
                WebPage.PROPERTY_META_DESCRIPTION,
                WebPage.PROPERTY_META_IMAGE
            ].forEach(property => {
                this.meta[property] = this.getMetaProperty(property);
            });
        }

        return this.meta;
    }

    getMetaProperty(propertyName)
    {
        const tagRegex = new RegExp('<meta(\s)*property="og\:"' + propertyName + '"[^>]*>', 'img');

        const tag = tagRegex.exec(this.content);
        if (!!tag && tag[0])
        {
            return this.getTagContent(tag[0]);
        }

        return null;
    }

    getTagContent(tag)
    {
        const regExp = new RegExp('content="([^"]*)"', 'im');
        const result = regExp.exec(tag);

        if (!!result && result[1])
        {
            return result[1];
        }

        return null;
    }
}