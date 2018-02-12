// eslint-disable-next-line
import { START_CREATE_PROJECT, END_CREATE_PROJECT, SET_CREATE_PROJECT_ERRORS } from './types';
// import axios from 'axios';
// import { API_URL } from '../tools/api-config';
// import { push } from 'react-router-redux'
// import Auth from '../tools/Auth';
// const config = { headers: { 'AUTHORIZATION': `Bearer ${Auth.getToken()}` } }

export const createProject = (values) => {
    return (dispatch, getState) => {
        dispatch({ type: START_CREATE_PROJECT })
        console.log("in reducer", values)
    }
}
