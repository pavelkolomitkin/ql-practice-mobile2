import axios from 'axios';
import coning from '../config/index';
import apply from './interceptors';

axios.defaults.baseURL = coning.serverBaseUrl;

apply(axios);

export default axios;