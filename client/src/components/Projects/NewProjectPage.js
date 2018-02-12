import React, { Component } from 'react';
import Layout from '../Layout'
import NewProjectForm from './NewProjectForm'
import { connect } from 'react-redux';
import { createProject } from '../../actions/project_index';

class ProjectPage extends Component {

    handleFormSubmit = values => {
        // console.log(values);
        this.props.createProject(values);        
    }
    render() {
        return (
            <Layout bg="dashboard-layout">
                <div className="home-page" style={{ minHeight: '100vh', width: '75%' }}>
                    <div className="dashboard-title" >
                        <div className="projects-title">Create a New Project</div>
                    </div>
                    <NewProjectForm onSubmit={this.handleFormSubmit}/>
                </div>
            </Layout>
        );
    }
}

function mapStateToProps(state) {
    return {
        error: state.project.error,
        fetching: state.project.fetching
    }
}

export default connect(mapStateToProps, { createProject })(ProjectPage)