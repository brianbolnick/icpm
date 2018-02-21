import React, { Component } from 'react';

class ContactContent extends Component {

    render() {
        const { data, active } = this.props;

        return (

            <div className={active === "contacts" ? "task-container" : "project-hidden"}>
                Contact stuff will be here!
            </div>
        );
    }
}

export default ContactContent;