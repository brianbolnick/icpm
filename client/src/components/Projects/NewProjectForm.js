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
            <input {...input} type={type} style={{ background: 'transparent' }}/>
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
            <input {...input} type={type} style={{ background: 'transparent' }}/>
            {touched &&
                ((error && <span className="form-error">{error}</span>) ||
                    (warning && <span className="form-warning">{warning}</span>))}
        </div>
    )

const renderRowField3 = ({
    input,
    label,
    type,
    meta: { touched, error, warning }
}) => (
        <div className="form-group row-item-3">
            <label>{label}</label>
            <input {...input} type={type} style={{ background: 'transparent' }} />
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
                        name="name"
                        type="text"
                        component={renderRowField}
                        label="Institution Name"
                    />
                    <Field
                        name="csm"
                        type="text"
                        component={renderRowField}
                        label="CSM Name"
                    />
                </div>
                <Field
                    name="sis"
                    type="text"
                    component={renderField}
                    label="SIS"
                />
                <Field
                    name="legacy_lms"
                    type="text"
                    component={renderField}
                    label="Legacy LMS"
                />
                <div className="form-row">
                    <div className="form-group row-item-3">
                        <label htmlFor="auth_type">Authentication</label>
                        <Field name="auth_type" component="select">
                            <option />
                            <option value="canvas">Canvas</option>
                            <option value="cas">CAS</option>
                            <option value="saml">SAML</option>
                            <option value="ldap">LDAP</option>
                            <option value="oauth">oAuth</option>
                            <option value="other">Other</option>
                        </Field>
                    </div>

                    <Field
                        name="end_date"
                        type="date"
                        component={renderRowField3}
                        label="End Date"
                    />
                    <div className="form-group row-item-3">
                        <label htmlFor="support">Support</label>
                        <Field name="support" component="select">
                            <option />
                            <option value="standard">Standard</option>
                            <option value="247">24/7</option>
                            <option value="tier_1">Tier 1</option>
                        </Field>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="package">Package</label>
                    <Field name="package" component="select">
                        <option />
                        <option value="pilot">Pilot</option>
                        <option value="standard">Standard</option>
                        <option value="enchanced">Enhanced</option>
                        <option value="premium">Premium</option>
                        <option value="catalog">Catalog :(</option>
                        <option value="other">Other</option>
                    </Field>
                </div>

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



