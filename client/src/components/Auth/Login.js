import React, { Component } from 'react';
import Logo from '../../img/logo.png';
import LoginForm from './LoginForm'
import { connect } from 'react-redux';
import { handleLogin, resetErrors } from '../../actions/login_index';
import LoadIcon from '../../img/panda-load.gif'

class LoginPage extends Component {

    handleFormSubmit = values => {
        this.props.handleLogin(values)
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
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100vh',
                        flexFlow: 'column'
                    }}>
                        <img src={LoadIcon} alt="" />
                        <br />
                        Creating the project......
                        </div>
                    :
                    <div className="signup-container">
                        <div className="signin-logo">
                            <img src={Logo} alt="" style={{ width: '100%' }} />
                        </div>
                        <LoginForm onSubmit={this.handleFormSubmit} />
                    </div>
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        error: state.login.error,
        fetching: state.login.fetching
    }
}

export default connect(mapStateToProps, { handleLogin, resetErrors })(LoginPage)