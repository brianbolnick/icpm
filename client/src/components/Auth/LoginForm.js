import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { Link } from "react-router-dom";


const validate = values => {
    const errors = {}
    if (!values.first_name) {
        if (!values.email) {
            errors.email = 'Please enter an email address'
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Invalid email address'
        }
        if (!values.password) {
            errors.password = 'Please enter a password'
        }
        return errors
    }
}

const warn = values => {
    const warnings = {}
    return warnings
}

const renderField = ({
    input,
    label,
    type,
    meta: { touched, error, warning }
}) => (
        <div className="form-group">
            <label>{label}</label>
            <input {...input} type={type} />
            {touched &&
                ((error && <span className="form-error">{error}</span>) ||
                    (warning && <span className="form-warning">{warning}</span>))}
        </div>
    )


const SignupForm = props => {
    const { handleSubmit, submitting } = props
    return (
        <div style={{textAlign: 'center'}}>
            <div className="signin-form">
                <form onSubmit={handleSubmit} style={{ width: '85%' }}>

                    <Field name="email" type="email" component={renderField} label="Email" />

                    <Field name="password" type="password" component={renderField} label="Password" />
                    <div>
                        <button type="submit" className="form-button" disabled={submitting}>
                            Login
                    </button>
                    </div>
                </form>
            </div>
            <Link to='/signup' className="register-link"> Need an account? Click here to sign up! </Link>
        </div>
    )
}

export default reduxForm({
    form: 'LoginForm',
    validate,
    warn
})(SignupForm)
