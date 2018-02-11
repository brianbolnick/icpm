// eslint-disable-next-line
import { START_SIGNUP, END_SIGNUP, SET_SIGNUP_ERRORS } from '../actions/types';

const INITIAL_STATE = {
    fetching: false,
    error: null
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case START_SIGNUP:
            return { ...state, fetching: true };
        case END_SIGNUP:
            return { ...state, fetching: false };
        case SET_SIGNUP_ERRORS:
            console.log("setting error in reducer", action.payload)
            return { ...state, error: action.payload, fetching: false }    
        default:
            return state;
    }
}