import {BaseInterceptor} from './base.interceptor';
import * as securityActions from '../../redux/actions/security/security';

export class UnAuthUserInterceptor extends BaseInterceptor
{
    static UNAUTHORIZED_STATUS_CODE = 401;

    apply(axios) {
        super.apply(axios);

        axios.interceptors.response.use(
                value => value,
                async error => {

                            if (error.response.status === UnAuthUserInterceptor.UNAUTHORIZED_STATUS_CODE)
                            {
                               await securityActions.logout();
                            }

                            throw error;
                        }
            );
    }
}