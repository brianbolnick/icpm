import React from 'react'
import { Field, reduxForm } from 'redux-form'

const validate = values => {
    const errors = {}
    if (!values.name) {
        errors.name = 'Please enter a school name'
    }
    if (!values.csm) {
        errors.csm = 'Please enter a CSM'
    }
    if (!values.sis) {
        errors.sis = 'Please enter an SIS'
    }
    if (!values.legacy_lms) {
        errors.legacy_lms = 'Please enter an LMS'
    }
    if (!values.auth_type) {
        errors.auth_type = 'Please select Authentication'
    }
    if (!values.end_date) {
        errors.end_date = 'Please select a close date'
    }
    if (!values.package) {
        errors.package = 'Please select a Package'
    }
    if (!values.support) {
        errors.support = 'Please select a Support Tier'
    }
    if (!values.instance_url) {
        errors.instance_url = 'Please add the Canvas URL'
    }
    if (!values.drive_url) {
        errors.drive_url = 'Please add the Google Drive URL'
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
            <input {...input} type={type} style={{ background: 'transparent' }} />
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


const NewProjectForm = props => {
    const { handleSubmit, submitting } = props
    return (
        <div className="new-form">
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
                <div className="form-row">
                    <Field
                        name="sis"
                        type="text"
                        component={renderRowField}
                        label="SIS"
                    />
                    <Field
                        name="legacy_lms"
                        type="text"
                        component={renderRowField}
                        label="Legacy LMS"
                    />
                </div>
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
                        <label htmlFor="support_package">Support</label>
                        <Field name="support_package" component="select">
                            <option />
                            <option value="standard">Standard</option>
                            <option value="247">24/7</option>
                            <option value="tier_1">Tier 1</option>
                        </Field>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="imp_package">Package</label>
                    <Field name="imp_package" component="select">
                        <option />
                        <option value="pilot">Pilot</option>
                        <option value="standard">Standard</option>
                        <option value="enchanced">Enhanced</option>
                        <option value="premium">Premium</option>
                        <option value="catalog">Catalog :(</option>
                        <option value="other">Other</option>
                    </Field>
                </div>

                <Field
                    name="instance_url"
                    type="text"
                    component={renderField}
                    label="Instance URL"
                />

                <Field
                    name="drive_url"
                    type="text"
                    component={renderField}
                    label="Google Drive URL (Make sure it's public!)"
                />

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
    form: 'newProjectForm',
    validate,
    warn
})(NewProjectForm)



