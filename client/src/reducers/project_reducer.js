import { START_CREATE_PROJECT, END_CREATE_PROJECT, SET_CREATE_PROJECT_ERRORS } from '../actions/types';

const INITIAL_STATE = {
    fetching: false,
    error: null
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case START_CREATE_PROJECT:
            console.log("in reducer start")
            return { ...state, fetching: true };
        case END_CREATE_PROJECT:
            console.log("in reducer end")
            return { ...state, fetching: false };
        case SET_CREATE_PROJECT_ERRORS:
            console.log("setting error in reducer", action.payload)
            return { ...state, error: action.payload, fetching: false }    
        default:
            return state;
    }
}