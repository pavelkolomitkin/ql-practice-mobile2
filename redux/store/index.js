
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from '../reducers/index';

let composeEnhancers = compose;
if (__DEV__)
{
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const configureStore = (initialState = {}) => {

    const result = createStore(
        rootReducer,
        initialState,
        composeEnhancers(
            applyMiddleware(thunk)
        )

    );

    return result;
};

const store = configureStore({});

export default store;