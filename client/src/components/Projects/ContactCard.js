import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react'

export default class ContactCard extends Component {
    handleDeleteClick = (id) => e => {
        alert("Not quite yet :) Patience!");
        // this.setState({
        //     actionItems: this.state.actionItems.filter((x) => x.id !== id)
        // })
    }
    render() {
        const { contact } = this.props;
        return (
            <div className="contact-card">
                <div className="contact-card-img"></div>
                <div className="contact-card-info">
                    <div className="contact-name">
                        {contact.first_name} {" "} {contact.last_name}
                    </div>
                    <div className="contact-role" style={{marginBottom: '7px'}}>{contact.role}</div>

                    <div className="contact-email"> <span style={{ fontWeight: '400' }}>Email:</span> {contact.email}</div>
                    <div className="contact-phone"><span style={{ fontWeight: '400' }}>Phone:</span> {contact.phone}</div>
                </div>
                <div className="contact-card-options">
                    <div className="contact-icon"><Icon id='remove-icon' color='red' name='remove' link onClick={this.handleDeleteClick(contact._id)} /></div>
                    <div className="contact-icon"><Icon name='edit' link /></div>
                    <div className="contact-icon"><a href={`mailto:${contact.email}`} target="_blank"><Icon name='envelope' link /></a></div>
                </div>
            </div>
        )
    }
}