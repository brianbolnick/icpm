import { START_SIGNUP, END_SIGNUP, SET_SIGNUP_ERRORS } from './types';
import axios from 'axios';
import { API_URL } from '../tools/api-config';
import { push } from 'react-router-redux'
// const token = localStorage.getItem('token');
// const config = { headers: { 'AUTHORIZATION': `Bearer ${token}` } }


export const handleSignup = (values) => {
    return (dispatch, getState) => {
        dispatch({ type: START_SIGNUP })
        axios.post(
            `${API_URL}/auth/signup`,
            values
        ).then(response => {
            if (response.status === 200) {
                dispatch({
                    type: END_SIGNUP,
                    payload: "Thank you for signing up!"
                })
                // dispatch(push('/dashboard'))
            }
            else {
                dispatch({
                    type: SET_SIGNUP_ERRORS,
                    payload: `There was an error signing up: ${response.body.message}`
                })
            }
        }).catch(error => {
            console.log(error)
            dispatch({
                type: SET_SIGNUP_ERRORS,
                payload: `There was an error signing up: ${error}`
            })
        })
    }
}

export const resetErrors = () => {
    return (dispatch, getState) => {
        dispatch({
            type: SET_SIGNUP_ERRORS,
            payload: null
        })
    }
}