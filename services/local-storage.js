import AsyncStorage from '@react-native-community/async-storage';

export default class LocalStorage {

    static LANGUAGES = 'LANGUAGES';
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