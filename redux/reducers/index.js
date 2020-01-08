import { combineReducers } from 'redux';

import { reducer as security } from './security';

export const rootReducer = combineReducers({
    security
});