import axios from 'axios';

import coning from '../config/index';

axios.defaults.baseURL = coning.serverBaseUrl;

export default axios;