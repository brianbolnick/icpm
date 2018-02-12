import React, { Component } from 'react';
import Layout from '../Layout'
import NewProjectForm from './NewProjectForm'

class ProjectPage extends Component {
    render() {
        return (
            <Layout bg="dashboard-layout">
                <div className="home-page" style={{ minHeight: '100vh', width: '75%' }}>
                    <div className="dashboard-title" >
                        <div className="projects-title">Create a New Project</div>
                    </div>
                    <NewProjectForm />
                </div>
            </Layout>
        );
    }
}

export default ProjectPage;