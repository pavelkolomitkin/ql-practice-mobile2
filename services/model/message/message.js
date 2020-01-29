export class Message {

    id: number;

    user: any;

    createdAt: string;

    constructor() {
        this.createdAt = (new Date()).toUTCString();
    }

    isNew()
    {
        return !this.id;
    }
}