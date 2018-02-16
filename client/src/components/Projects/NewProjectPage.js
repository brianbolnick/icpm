import React, { Component } from 'react';
import Layout from '../Layout'
import NewProjectForm from './NewProjectForm'
import { connect } from 'react-redux';
import { createProject } from '../../actions/project_index';
import LoadIcon from '../../img/panda-load.gif'
import Auth from '../../tools/Auth';

const user = Auth.getUser();

class ProjectPage extends Component {

    handleFormSubmit = values => {
        const user_id = user !== null ? JSON.parse(user).id : null
        values = { ...values, user_id: user_id }
        this.props.createProject(values);
    }
    render() {
        return (
            <Layout bg="dashboard-layout">
                <div className="home-page" style={{ minHeight: '100vh', width: '75%' }}>
                    {this.props.error ?
                        <div className="page-error">{this.props.error}</div>
                        :
                        null
                    }
                    {this.props.fetching ?
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '100vh',
                            flexFlow: 'column'
                        }}>
                            <img src={LoadIcon} alt="" />
                            <br/>
                            Creating the project......
                        </div>
                        :
                        <div className="project-form-container">
                            <div className="form-title" >
                                <div className="projects-title">Create a New Project</div>
                            </div>
                            <NewProjectForm onSubmit={this.handleFormSubmit} />
                        </div>
                    }
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