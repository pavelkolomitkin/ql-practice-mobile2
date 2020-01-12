import {BaseInterceptor} from './base.interceptor';
import LocalStorage from '../../services/local-storage';
//import store from '../../redux/store';

export default class AuthTokenInterceptor extends BaseInterceptor
{
    apply(axios) {
        super.apply(axios);

        axios.interceptors.request.use(async (config) => {

            // const state = store.getState();
            // const token = state.security.token;
            const token = await LocalStorage.getItem(LocalStorage.SECURITY_TOKEN);

            if (!!token)
            {
                config.headers.Authorization = `Bearer ${token}`;
            }

            return config;
        });
    }
}