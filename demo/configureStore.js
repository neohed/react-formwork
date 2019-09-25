import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import { routerMiddleware } from 'react-router-redux'
import { createLogger } from 'redux-logger'

import allReducers from './reducers/index'

const configureStore = history => {
    const middlewares = [
        routerMiddleware(history),
        thunk
    ];

    if (process.env.NODE_ENV !== 'dist') {
        middlewares.push(createLogger());
    }

    return createStore(
        allReducers,
        applyMiddleware(...middlewares)
    );
};

export default configureStore;
