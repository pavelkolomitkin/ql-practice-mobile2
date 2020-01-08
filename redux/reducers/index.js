import { combineReducers } from 'redux';

import { reducer as security } from './security';
import { reducer as language } from './language';

export const rootReducer = combineReducers({
    security,
    language
});