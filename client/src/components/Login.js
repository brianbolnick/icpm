import React, { Component } from 'react';
import Logo from '../img/logo.png';
import LoginForm from './LoginForm'
// import { connect } from 'react-redux';
// import { handleSignup } from '../../actions/signup_index';
import axios from 'axios';
import { API_URL } from '../tools/api-config';

class LoginPage extends Component {

    handleFormSubmit = values => {
        console.log(values);
        axios.post(
            `${API_URL}/auth/login`,
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
                    <LoginForm onSubmit={this.handleFormSubmit} />
                </div>
            </div>
        );
    }
}

export default LoginPage;
