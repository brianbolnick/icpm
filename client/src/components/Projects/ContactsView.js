import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react'
import ContactForm from './NewContactForm';
import { connect } from 'react-redux';
import { createContact } from '../../actions/contact_index';

class ContactContent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            newFormActive: false,
        }
        this.handleAddClick = this.handleAddClick.bind(this)
    }

    handleAddClick() {
        this.setState({ newFormActive: true })
    }

    handleFormSubmit = values => {
        this.setState({ newFormActive: false })
        const project_id = this.props.data._id
        values = { ...values, project_id: project_id }
        console.log(values);
        // this.props.createProject(values);
    }

    render() {
        const { data, active } = this.props;

        return (

            <div className={active === "contacts" ? "contacts-container" : "project-hidden"}>
                <div className="new-contact" id='new-contact' onClick={this.handleAddClick}>
                    <Icon name='plus' />
                    Add New Contact
                    </div>
                {this.state.newFormActive ?
                    <div className="new-contact-form-container">
                        <ContactForm onSubmit={this.handleFormSubmit} />
                    </div>
                    :
                    null
                }
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        error: state.project.error,
        fetching: state.project.fetching,
        contacts: state.contacts
    }
}

export default connect(mapStateToProps, { createContact })(ContactContent)