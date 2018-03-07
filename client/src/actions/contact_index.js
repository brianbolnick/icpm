import {
    START_CREATE_CONTACT,
    END_CREATE_CONTACT,
    SET_CONTACT_ERRORS,
    FETCH_CONTACTS_END,
    FETCH_CONTACTS_START,
    CLEAR_STORE
} from './types';
import axios from 'axios';
import { API_URL } from '../tools/api-config';
import { push } from 'react-router-redux'
import Auth from '../tools/Auth';
const token = Auth.getToken();
const config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': `bearer ${token}` } }

export const createContact = (values) => {
    return (dispatch, getState) => {
        dispatch({ type: START_CREATE_CONTACT })
        axios.post(
            `${API_URL}/api/projects/${values.project_id}/contacts`,
            values,
            config
        ).then(response => {
            if (response.status === 200) {
                dispatch({
                    type: END_CREATE_CONTACT,
                    payload: response.data.contact
                })
            }
            else {
                dispatch({
                    type: SET_CONTACT_ERRORS,
                    payload: `There was an error creating the contact: ${response.body.message}`
                })
            }
        }).catch(error => {
            console.log(error)
            dispatch({
                type: SET_CONTACT_ERRORS,
                payload: `There was an error creating the project: ${error}`
            })
        })
    }
}

export const getAllContacts = (data) => {
    return (dispatch, getState) => {
        dispatch({ type: FETCH_CONTACTS_START })
        axios.get(`${API_URL}/api/projects/${data}/contacts`, config).then(response => {
            if (response.data.error) {
                console.log("found error getting contacts: ", response.data.error)
                dispatch({
                    type: SET_CONTACT_ERRORS,
                    message: "There was an issue fetching contacts."
                })
            } else {
                console.log(response.data);
                dispatch({
                    type: FETCH_CONTACTS_END,
                    payload: response.data.contacts
                })
            }
        }).catch(error => {
            console.log(error)
            dispatch({
                type: SET_CONTACT_ERRORS,
                message: "There was an issue fetching contacts."
            })
        })
    }
}



export const resetErrors = () => {
    return (dispatch, getState) => {
        dispatch({
            type: SET_CONTACT_ERRORS,
            payload: null
        })
    }
}

export const clearState = () => {
    return (dispatch, getState) => {
        dispatch({
            type: CLEAR_STORE
        })
    }
}
