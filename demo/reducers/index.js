import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'
import charts from './charts'
import records from './records'
import formReducer from './formReducer'

const rootReducer = combineReducers({
    routing: routerReducer,
    charts,
    records,
    formReducer
});

export default rootReducer;
