import AuthTokenInterceptor from './auth-token.interceptor';
import RequestHeadersInterceptor from './request-headers.interceptor';
import SystemErrorInterceptor from './system-error.interceptor';
import {UnAuthUserInterceptor} from './unauth-user.interceptor';

const apply = (axios) => {

    const interceptors = [
        new RequestHeadersInterceptor(),
        new AuthTokenInterceptor(),
        new SystemErrorInterceptor(),
        new UnAuthUserInterceptor()
    ];

    interceptors.forEach(interceptor => interceptor.apply(axios))
};

export default apply;