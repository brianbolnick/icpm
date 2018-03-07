import React from 'react'
import { Field, reduxForm } from 'redux-form'

const validate = values => {
    const errors = {}
    if (!values.first_name) {
        errors.first_name = 'Please enter a first name'
    }
    if (!values.last_name) {
        errors.last_name = 'Please enter a last name'
    }
    if (!values.email) {
        errors.email = 'Please enter an email address'
    }
    if (!values.role) {
        errors.role = 'Please enter a role'
    }
    return errors
}

const warn = values => {
    const warnings = {}
    // if (values.password_confirm !== values.password) {
    //     warnings.password_confirm = 'Passwords do not match'
    // }
    return warnings
}

const renderRowField = ({
    input,
    label,
    type,
    meta: { touched, error, warning }
}) => (
        <div className="form-group row-item">
            <label>{label}</label>
            <input {...input} type={type} style={{ background: 'transparent' }} />
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


const NewContactForm = props => {
    const { handleSubmit, submitting } = props
    return (
        <div className="new-contact-form">
            <form onSubmit={handleSubmit} style={{ width: '85%' }}>
                <div className="form-row">
                    <Field
                        name="first_name"
                        type="text"
                        component={renderRowField3}
                        label="First Name"
                    />
                    <Field
                        name="last_name"
                        type="text"
                        component={renderRowField3}
                        label="Last Name"
                    />
                    <Field
                        name="role"
                        type="text"
                        component={renderRowField3}
                        label="Role"
                    />
                </div>
                <div className="form-row">
                    <Field
                        name="email"
                        type="text"
                        component={renderRowField}
                        label="Email"
                    />
                    <Field
                        name="phone"
                        type="text"
                        component={renderRowField}
                        label="Phone (Optional)"
                    />
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
    form: 'newContactForm',
    validate,
    warn
})(NewContactForm)



