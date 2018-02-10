import React from 'react'
import { Field, reduxForm } from 'redux-form'

const validate = values => {
    const errors = {}
    if (!values.first_name) {
        errors.first_name = 'Please enter your first name'
    }
    if (!values.last_name) {
        errors.last_name = 'Please enter your last name'
    }
    if (!values.email) {
        errors.email = 'Please enter an email address'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }
    if (!values.password) {
        errors.password = 'Please enter a password'
    } 
    if (!values.password_confirm) {
        errors.password_confirm = 'Please confirm your password'
    }
    if (values.password_confirm !== values.password) {
        errors.password_confirm = 'Passwords do not match'
    }
    return errors
}

const warn = values => {
    const warnings = {}
    if (values.password_confirm !== values.password) {
        warnings.password_confirm = 'Passwords do not match'
      }
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

const renderRowField = ({
    input,
    label,
    type,
    meta: { touched, error, warning }
}) => (
        <div className="form-group row-item">
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
        <div className="signin-form">
            <form onSubmit={handleSubmit} style={{ width: '85%' }}>
                <div className="form-row">
                    <Field
                        name="first_name"
                        type="text"
                        component={renderRowField}
                        label="First Name"
                    />
                    <Field
                        name="last_name"
                        type="text"
                        component={renderRowField}
                        label="Last Name"
                    />
                </div>
                <Field name="email" type="email" component={renderField} label="Email" />
                <div className="form-group">
                    <label htmlFor="team">Team</label>
                    <Field name="team" component="select">
                        <option />
                        <option value="higher_ed">Higher Ed</option>
                        <option value="k12">K12</option>
                        <option value="remote_admin">Remote Admin</option>
                    </Field>
                </div>
                <Field name="password" type="password" component={renderField} label="Password" />
                <Field name="password_confirm" type="password" component={renderField} label="Confirm" />
                <div>
                    <button type="submit" className="form-button" disabled={submitting}>
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}

export default reduxForm({
    form: 'signUpForm',
    validate,
    warn
})(SignupForm)
