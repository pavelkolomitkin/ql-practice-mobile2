import * as navigation from '../../navigation/index';

let releaseSubscriber = null;

let currentUser = null;

const userLogoutHandler = async (store) => {

    const newUserValue = store.getState().security.user;
    if ((!!currentUser) && (newUserValue === null))
    {
        currentUser = null;

        await navigation.setSecurityView();
    }

    currentUser = newUserValue;
};

const config = (store) => {

    release();

    currentUser = store.getState().security.user;

    releaseSubscriber = store.subscribe(async () => await userLogoutHandler(store));

};

const release = () => {

    if (releaseSubscriber !== null)
    {
        releaseSubscriber();
    }
};

export {
    config,
    release
};