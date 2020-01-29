
export class LinkInfo {

    static YOUTUBE_TYPE = 'youtube';

    static PICTURE_TYPE = 'picture';

    static REGULAR_TYPE = 'regular';


    url: string;

    type: string;

    constructor(link, type) {
        this.url = link;
        this.type = type;
    }

}