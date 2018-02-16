import {
    START_CREATE_PROJECT,
    END_CREATE_PROJECT,
    SET_PROJECT_ERRORS,
    CLEAR_STORE,
    GET_PROJECT_START,
    GET_PROJECT_END,
    FETCH_PROJECTS_START,
    FETCH_PROJECTS_END,
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

export const getSIS = (data) => {
    return (dispatch, getState) => {
        dispatch({ type: FETCH_SIS_START })
        axios.get(`${API_URL}/api/milestones/${data}`, config).then(response => {
            console.log(response.data);
            if (response.data.error) {
                console.log("found error getting sis data: ", response.data.error)
                dispatch({
                    type: SET_PROJECT_ERRORS,
                    message: "There was an issue fetching sis data."
                })
            } else {
                dispatch({
                    type: FETCH_SIS_END,
                    payload: response.data
                })
            }
        }).catch(error => {
            console.log(error)
            dispatch({
                type: SET_PROJECT_ERRORS,
                message: "There was an issue fetching sis data."
            })
        })
    }
}

export const handleSisTaskComplete = (data) => {
    return (dispatch, getState) => {
        dispatch({ type: FETCH_SIS_START })
        axios.put(`${API_URL}/api/tasks/${data.task}`, { status: 'complete',  milestone_id: data.milestone }, config).then(response => {
            if (response.data.error) {
                console.log("found error updating sis data: ", response.data.error)
                dispatch({
                    type: SET_PROJECT_ERRORS,
                    message: "There was an issue updating sis data."
                })
            } else {
                dispatch({
                    type: FETCH_SIS_END,
                    payload: response.data
                })
            }
        }).catch(error => {
            console.log(error)
            dispatch({
                type: SET_PROJECT_ERRORS,
                message: "There was an issue updating sis data."
            })
        })
    }
}

export const handleAuthTaskComplete = (data) => {
    return (dispatch, getState) => {
        dispatch({ type: FETCH_AUTH_START })
        axios.put(`${API_URL}/api/tasks/${data.task}`, { status: 'complete',  milestone_id: data.milestone }, config).then(response => {
            if (response.data.error) {
                console.log("found error updating auth data: ", response.data.error)
                dispatch({
                    type: SET_PROJECT_ERRORS,
                    message: "There was an issue updating auth data."
                })
            } else {
                dispatch({
                    type: FETCH_AUTH_END,
                    payload: response.data
                })
            }
        }).catch(error => {
            console.log(error)
            dispatch({
                type: SET_PROJECT_ERRORS,
                message: "There was an issue updating auth data."
            })
        })
    }
}

export const handleBrandingTaskComplete = (data) => {
    return (dispatch, getState) => {
        dispatch({ type: FETCH_BRANDING_START })
        axios.put(`${API_URL}/api/tasks/${data.task}`, { status: 'complete',  milestone_id: data.milestone }, config).then(response => {
            if (response.data.error) {
                console.log("found error updating branding data: ", response.data.error)
                dispatch({
                    type: SET_PROJECT_ERRORS,
                    message: "There was an issue updating branding data."
                })
            } else {
                dispatch({
                    type: FETCH_BRANDING_END,
                    payload: response.data
                })
            }
        }).catch(error => {
            console.log(error)
            dispatch({
                type: SET_PROJECT_ERRORS,
                message: "There was an issue updating branding data."
            })
        })
    }
}

export const handleMigrationTaskComplete = (data) => {
    return (dispatch, getState) => {
        dispatch({ type: FETCH_MIGRATION_START })
        axios.put(`${API_URL}/api/tasks/${data.task}`, { status: 'complete',  milestone_id: data.milestone }, config).then(response => {
            if (response.data.error) {
                console.log("found error updating migration data: ", response.data.error)
                dispatch({
                    type: SET_PROJECT_ERRORS,
                    message: "There was an issue updating migration data."
                })
            } else {
                dispatch({
                    type: FETCH_MIGRATION_END,
                    payload: response.data
                })
            }
        }).catch(error => {
            console.log(error)
            dispatch({
                type: SET_PROJECT_ERRORS,
                message: "There was an issue updating branding data."
            })
        })
    }
}

export const handleOtherTaskComplete = (data) => {
    return (dispatch, getState) => {
        dispatch({ type: FETCH_OTHERS_START })
        axios.put(`${API_URL}/api/tasks/${data.task}`, { status: 'complete',  milestone_id: data.milestone }, config).then(response => {
            if (response.data.error) {
                console.log("found error updating other data: ", response.data.error)
                dispatch({
                    type: SET_PROJECT_ERRORS,
                    message: "There was an issue updating other data."
                })
            } else {
                dispatch({
                    type: FETCH_OTHERS_END,
                    payload: response.data
                })
            }
        }).catch(error => {
            console.log(error)
            dispatch({
                type: SET_PROJECT_ERRORS,
                message: "There was an issue updating other data."
            })
        })
    }
}

export const getMigration = (data) => {
    return (dispatch, getState) => {
        dispatch({ type: FETCH_MIGRATION_START })
        axios.get(`${API_URL}/api/milestones/${data}`, config).then(response => {
            if (response.data.error) {
                console.log("found error getting migration data: ", response.data.error)
                dispatch({
                    type: SET_PROJECT_ERRORS,
                    message: "There was an issue fetching migration data."
                })
            } else {
                dispatch({
                    type: FETCH_MIGRATION_END,
                    payload: response.data
                })
            }
        }).catch(error => {
            console.log(error)
            dispatch({
                type: SET_PROJECT_ERRORS,
                message: "There was an issue fetching migration data."
            })
        })
    }
}

export const getAuth = (data) => {
    return (dispatch, getState) => {
        dispatch({ type: FETCH_AUTH_START })
        axios.get(`${API_URL}/api/milestones/${data}`, config).then(response => {
            if (response.data.error) {
                console.log("found error getting authentication data: ", response.data.error)
                dispatch({
                    type: SET_PROJECT_ERRORS,
                    message: "There was an issue fetching authentication data."
                })
            } else {
                dispatch({
                    type: FETCH_AUTH_END,
                    payload: response.data
                })
            }
        }).catch(error => {
            console.log(error)
            dispatch({
                type: SET_PROJECT_ERRORS,
                message: "There was an issue fetching authentication data."
            })
        })
    }
}

export const getBranding = (data) => {
    return (dispatch, getState) => {
        dispatch({ type: FETCH_BRANDING_START })
        axios.get(`${API_URL}/api/milestones/${data}`, config).then(response => {
            if (response.data.error) {
                console.log("found error getting branding data: ", response.data.error)
                dispatch({
                    type: SET_PROJECT_ERRORS,
                    message: "There was an issue fetching branding data."
                })
            } else {
                dispatch({
                    type: FETCH_BRANDING_END,
                    payload: response.data
                })
            }
        }).catch(error => {
            console.log(error)
            dispatch({
                type: SET_PROJECT_ERRORS,
                message: "There was an issue fetching branding data."
            })
        })
    }
}

export const getOther = (data) => {
    return (dispatch, getState) => {
        dispatch({ type: FETCH_OTHERS_START })
        axios.get(`${API_URL}/api/milestones/${data}`, config).then(response => {
            if (response.data.error) {
                console.log("found error getting other data: ", response.data.error)
                dispatch({
                    type: SET_PROJECT_ERRORS,
                    message: "There was an issue fetching other data."
                })
            } else {
                dispatch({
                    type: FETCH_OTHERS_END,
                    payload: response.data
                })
            }
        }).catch(error => {
            console.log(error)
            dispatch({
                type: SET_PROJECT_ERRORS,
                message: "There was an issue fetching others data."
            })
        })
    }
}