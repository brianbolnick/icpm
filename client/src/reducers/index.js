import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import LoginReducer from './login_reducer';
import SignupReducer from './signup_reducer';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
    routing: routerReducer,
    form: formReducer,
    signup: SignupReducer,
    login: LoginReducer,
});