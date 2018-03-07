import {
    START_CREATE_CONTACT,
    END_CREATE_CONTACT,
    SET_CONTACT_ERRORS,
    FETCH_CONTACTS_END,
    FETCH_CONTACTS_START,
    CLEAR_STORE
} from '../actions/types';

const INITIAL_STATE = {
    fetching: false,
    error: null,
    contacts: []
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case START_CREATE_CONTACT:
            return { ...state, fetching: true };
        case END_CREATE_CONTACT:
            return { ...state, fetching: false, contacts: [ ...state.contacts, action.payload ] };
        case SET_CONTACT_ERRORS:
            console.log("setting error in reducer", action.payload)
            return { ...state, error: action.payload, fetching: false }
        case FETCH_CONTACTS_START:
            return { ...state, fetching: true };
        case FETCH_CONTACTS_END:
            return { ...state, fetching: false, contacts: action.payload };
        case CLEAR_STORE:
            return INITIAL_STATE;
        default:
            return state;
    }
}