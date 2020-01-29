import { combineReducers } from 'redux';

import { reducer as system } from './system';
import { reducer as security } from './security';
import { reducer as language } from './language';
import { reducer as photo } from './client/photo';
import { reducer as profile } from './client/profile';
import { reducer as languageSkill } from './client/language-skill';
import { reducer as publicConversation } from './client/public-conversations';
import { reducer as publicConversationMessage } from './client/public-conversation-message';

export const rootReducer = combineReducers({
    system,
    security,
    language,
    photo,
    profile,
    languageSkill,
    publicConversation,
    publicConversationMessage
});