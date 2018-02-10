import React, { Component } from 'react';
import Logo from '../img/logo.png';
import SignUpForm from './SignUpForm'
// import { connect } from 'react-redux';
import axios from 'axios';
import { API_URL } from '../tools/api-config';

// import { handleSignup } from '../../actions/signup_index';

class SignUpPage extends Component {

    handleFormSubmit = values => {
        console.log(values);
        axios.post(
            `${API_URL}/auth/signup`, 
            values
        ).then(response => {
            console.log("response", response.data);
        }).catch(error => {
            console.log(error)            
        })
        // window.location.replace('/');
        // this.props.handleSignup(values)
    }

    render() {
        return (
            <div className='signup-page' style={{ minHeight: '100vh' }}>
                <div className="signup-container">
                    <div className="signin-logo">
                        <img src={Logo} alt="" style={{ width: '100%' }} />
                    </div>
                    <SignUpForm onSubmit={this.handleFormSubmit} />
                </div>
            </div>
        );
    }
}

export default SignUpPage;
