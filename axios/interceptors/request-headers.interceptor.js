import {BaseInterceptor} from './base.interceptor';

export default class RequestHeadersInterceptor extends BaseInterceptor
{
    apply(axios) {
        super.apply(axios);

        axios.interceptors.request.use((config) => {

            config.headers['Content-Type'] = 'application/json';

            return config;
        });
    }
}