import {
    START_CREATE_PROJECT,
    END_CREATE_PROJECT,
    SET_PROJECT_ERRORS,
    CLEAR_STORE,
    GET_PROJECT_START,
    GET_PROJECT_END,
    FETCH_PROJECTS_START,
    FETCH_PROJECTS_END
} from './types';
import axios from 'axios';
import { API_URL } from '../tools/api-config';
import { push } from 'react-router-redux'
import Auth from '../tools/Auth';
const token = Auth.getToken();
const config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': `bearer ${token}` } }

export const createProject = (values) => {
    return (dispatch, getState) => {
        dispatch({ type: START_CREATE_PROJECT })
        console.log(values);
        axios.post(
            `${API_URL}/api/projects`,
            values,
            config
        ).then(response => {
            if (response.status === 200) {
                dispatch({
                    type: END_CREATE_PROJECT,
                    payload: response.data
                })
                dispatch(push(`/projects/${response.data._id}`))
            }
            else {
                dispatch({
                    type: SET_PROJECT_ERRORS,
                    payload: `There was an error creating the project: ${response.body.message}`
                })
            }
        }).catch(error => {
            console.log(error)
            dispatch({
                type: SET_PROJECT_ERRORS,
                payload: `There was an error creating the project: ${error}`
            })
        })
    }
}


export const resetErrors = () => {
    return (dispatch, getState) => {
        dispatch({
            type: SET_PROJECT_ERRORS,
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

export const getProjectDetails = (data) => {
    return (dispatch, getState) => {
        dispatch({ type: GET_PROJECT_START })
        axios.get(`${API_URL}/api/projects/${data}`, config).then(response => {
            console.log(response.data);
            if (response.data.error) {
                console.log("found error getting project: ", response.data.error)
                dispatch({
                    type: SET_PROJECT_ERRORS,
                    message: "There was an issue fetching that project."
                })
            } else {
                dispatch({
                    type: GET_PROJECT_END,
                    payload: response.data
                })
            }
        }).catch(error => {
            console.log(error)
            dispatch({
                type: SET_PROJECT_ERRORS,
                message: "There was an issue fetching that project."
            })
        })
    }
}


export const getAllProjects = (data) => {
    return (dispatch, getState) => {
        dispatch({ type: FETCH_PROJECTS_START })
        axios.get(`${API_URL}/api/users/${data}/projects`, config).then(response => {
            console.log(response.data);
            if (response.data.error) {
                console.log("found error getting project: ", response.data.error)
                dispatch({
                    type: SET_PROJECT_ERRORS,
                    message: "There was an issue fetching projects."
                })
            } else {
                dispatch({
                    type: FETCH_PROJECTS_END,
                    payload: response.data.projects
                })
            }
        }).catch(error => {
            console.log(error)
            dispatch({
                type: SET_PROJECT_ERRORS,
                message: "There was an issue fetching projects."
            })
        })
    }
}