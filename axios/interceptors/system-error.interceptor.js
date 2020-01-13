import {BaseInterceptor} from './base.interceptor';
import store from '../../redux/store';
import {SYSTEM_ERROR_INTERNAL_SERVER_ERROR} from '../../redux/actions/types';

export default class SystemErrorInterceptor extends BaseInterceptor {
    apply(axios) {
        super.apply(axios);

        axios.interceptors.response.use(
            value => value,
            (error) => {

                    if (error.response.status >= 500)
                    {
                        store.dispatch({
                            type: SYSTEM_ERROR_INTERNAL_SERVER_ERROR,
                            message: 'The app is not available now. Try it later'
                        })
                    }

                    return Promise.reject(error);

                }
            );
    }
}