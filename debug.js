import Reactotron from 'reactotron-react-native'
import { AsyncStorage } from 'react-native';

const configureDebug = () => {
    if (__DEV__)
    {
        console.log('INITALIZE REACTRON');

        Reactotron
            .setAsyncStorageHandler(AsyncStorage)
            .configure()
            .useReactNative()
            .connect()
    }
};

export default configureDebug;