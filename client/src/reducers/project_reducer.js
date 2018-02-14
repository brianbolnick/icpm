import {
    START_CREATE_PROJECT,
    END_CREATE_PROJECT,
    SET_PROJECT_ERRORS,
    GET_PROJECT_START,
    GET_PROJECT_END,
    FETCH_PROJECTS_START,
    FETCH_PROJECTS_END,
    CLEAR_STORE
} from '../actions/types';

const INITIAL_STATE = {
    fetching: false,
    error: null,
    projectDetails: {},
    projects: []
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case START_CREATE_PROJECT:
            return { ...state, fetching: true };
        case END_CREATE_PROJECT:
            return { ...state, fetching: false, projectDetails: action.payload };
        case GET_PROJECT_START:
            return { ...state, fetching: true };
        case GET_PROJECT_END:
            return { ...state, fetching: false, projectDetails: action.payload };
        case FETCH_PROJECTS_START:
            console.log("in reducer start")
            return { ...state, fetching: true };
        case FETCH_PROJECTS_END:
            console.log("in reducer end")
            return { ...state, fetching: false, projects: action.payload };
        case SET_PROJECT_ERRORS:
            console.log("setting error in reducer", action.payload)
            return { ...state, error: action.payload, fetching: false }
        case CLEAR_STORE:
            return INITIAL_STATE;
        default:
            return state;
    }
}