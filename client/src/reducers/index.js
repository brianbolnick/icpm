import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
// import ProfileReducer from './profile_reducer';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
    routing: routerReducer,
    form: formReducer
});