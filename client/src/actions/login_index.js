import { START_LOGIN, END_LOGIN, SET_LOGIN_ERRORS } from './types';
import axios from 'axios';
import { API_URL } from '../tools/api-config';
import { push } from 'react-router-redux'
import Auth from '../tools/Auth';

export const handleLogin = (values) => {
    return (dispatch, getState) => {
        dispatch({ type: START_LOGIN })
        axios.post(
            `${API_URL}/auth/login`,
            values
        ).then(response => {
            if (response.status === 200) {
                Auth.authenticateUser(response.data.token);
                dispatch({
                    type: END_LOGIN,
                    payload: "You are now logged in."
                })
                setTimeout(() => {
                    dispatch(push('/dashboard'))                    
                }, 2000);
            }
            else {
                dispatch({
                    type: SET_LOGIN_ERRORS,
                    payload: `There was an error logging in: ${response.data.message}`
                })
            }
        }).catch(error => {
            console.log(error)
            dispatch({
                type: SET_LOGIN_ERRORS,
                payload: `There was an error logging in: ${error}`
            })
        })



    }
}

export const resetErrors = () => {
    return (dispatch, getState) => {
        dispatch({
            type: SET_LOGIN_ERRORS,
            payload: null
        })
    }
}