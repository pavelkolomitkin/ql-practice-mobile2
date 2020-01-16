import {AsyncStorage} from 'react-native';

export default class LocalStorage {

    static LANGUAGES = 'LANGUAGES';

    static LANGUAGE_LEVELS = 'LANGUAGE_LEVELS';

    static SECURITY_TOKEN = 'SECURITY_TOKEN';

    static async getItem(name, defaultValue = null)
    {
        const value = await AsyncStorage.getItem(name);

        return (value !== null) ? value : defaultValue;
    }

    static async setItem(name, value)
    {
        await AsyncStorage.setItem(name, value);
    }

    static async removeItem(name)
    {
        await AsyncStorage.removeItem(name);
    }
}