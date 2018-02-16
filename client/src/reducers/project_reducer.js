import {
    START_CREATE_PROJECT,
    END_CREATE_PROJECT,
    SET_PROJECT_ERRORS,
    GET_PROJECT_START,
    GET_PROJECT_END,
    FETCH_PROJECTS_START,
    FETCH_PROJECTS_END,
    CLEAR_STORE,
    FETCH_SIS_START,
    FETCH_SIS_END,
    FETCH_BRANDING_START,
    FETCH_BRANDING_END,
    FETCH_MIGRATION_START,
    FETCH_MIGRATION_END,
    FETCH_AUTH_START,
    FETCH_AUTH_END,
    FETCH_OTHERS_START,
    FETCH_OTHERS_END
} from '../actions/types';

const INITIAL_STATE = {
    fetching: false,
    error: null,
    projectDetails: {},
    projects: [],
    sis: {},
    auth: {},
    branding: {},
    migration: {},
    other: {},
    fetchingSIS: false,
    fetchingAuth: false,
    fetchingBranding: false,
    fetchingMigraton: false,
    fetchingOther: false
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
        case FETCH_SIS_START:
            console.log("in reducer start")
            return { ...state, fetchingSIS: true };
        case FETCH_SIS_END:
            console.log("in reducer end")
            return { ...state, fetchingSIS: false, sis: action.payload };
        case FETCH_AUTH_START:
            console.log("in reducer start")
            return { ...state, fetchingAuth: true };
        case FETCH_AUTH_END:
            console.log("in reducer end")
            return { ...state, fetchingAuth: false, auth: action.payload };
        case FETCH_BRANDING_START:
            console.log("in reducer start")
            return { ...state, fetchingBranding: true };
        case FETCH_BRANDING_END:
            console.log("in reducer end")
            return { ...state, fetchingBranding: false, branding: action.payload };
        case FETCH_MIGRATION_START:
            console.log("in reducer start")
            return { ...state, fetchingMigration: true };
        case FETCH_MIGRATION_END:
            console.log("in reducer end")
            return { ...state, fetchingMigration: false, migration: action.payload };
        case FETCH_OTHERS_START:
            console.log("in reducer start")
            return { ...state, fetchingOther: true };
        case FETCH_OTHERS_END:
            console.log("in reducer end")
            return { ...state, fetchingOther: false, other: action.payload };
        case SET_PROJECT_ERRORS:
            console.log("setting error in reducer", action.payload)
            return { ...state, error: action.payload, fetching: false }
        case CLEAR_STORE:
            return INITIAL_STATE;
        default:
            return state;
    }
}