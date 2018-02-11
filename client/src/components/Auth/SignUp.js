import React, { Component } from 'react';
import Logo from '../../img/logo.png';
import SignUpForm from './SignUpForm'
import { connect } from 'react-redux';
// import axios from 'axios';
// import { API_URL } from '../../tools/api-config';
import { handleSignup, resetErrors } from '../../actions/signup_index';

class SignUpPage extends Component {

    handleFormSubmit = values => {
        this.props.handleSignup(values)
    }

    handleDismiss = () => {
        this.props.resetErrors();
    }

    render() {
        return (
            <div className='signup-page' style={{ minHeight: '100vh' }}>
                {this.props.error ?
                    <div className="page-error">{this.props.error}</div>
                    :
                    null
                }
                {this.props.fetching ?
                    <div>Hold up! Stuff is happening...</div>
                    :
                    <div className="signup-container">
                        <div className="signin-logo">
                            <img src={Logo} alt="" style={{ width: '100%' }} />
                        </div>
                        <SignUpForm onSubmit={this.handleFormSubmit} />
                    </div>
                }
            </div>
        );
    }
}

// export default SignUpPage;
function mapStateToProps(state) {
    return {
        error: state.signup.error,
        fetching: state.signup.fetching
    }
}

export default connect(mapStateToProps, { handleSignup, resetErrors })(SignUpPage)