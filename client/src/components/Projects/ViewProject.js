import React, { Component } from 'react';
import Layout from '../Layout'
import DashboardCard from '../Dashboard/DashboardCard'
import { Icon } from 'semantic-ui-react'
import { Link } from "react-router-dom";
import 'react-tippy/dist/tippy.css';
import { Tooltip } from 'react-tippy';
import { connect } from 'react-redux';
import { getProjectDetails, resetErrors, clearState } from '../../actions/project_index';

class ProjectPage extends Component {
    componentDidMount() {
        this.props.resetErrors();      
        if (Object.keys(this.props.projectDetails).length === 0) {
            this.props.getProjectDetails(this.props.match.params.project_id);
        }
    }

    componentWillUnmount() {
        this.props.clearState();
    }

    render() {
        return (
            <Layout bg="dashboard-layout">
                <div className="home-page" style={{ minHeight: '100vh', width: '75%' }}>
                    <ProjectContent data={this.props.projectDetails} />
                </div>
            </Layout>
        );
    }
}


class ProjectContent extends Component {

    render() {
        const { data } = this.props;
        return (
            <div>
                <div className="project-overview">
                    <div className="dashboard-title" >
                        <div className="projects-title">{data.name}</div>
                        <div className="projects-subtitle">{data.imp_package}</div>
                    </div>
                </div>

                <div className="main-container">
                    <ul>
                        <li>auth: {data.auth_type}</li>
                        <li>sis: {data.sis}</li>
                        <li>lms: {data.legacy_lms}</li>
                        <li>support: {data.support_package}</li>
                        <li>csm: {data.csm}</li>
                        <li>status: {data.status}</li>
                    </ul>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        error: state.project.error,
        fetching: state.project.fetching,
        projectDetails: state.project.projectDetails
    }
}

export default connect(mapStateToProps, { getProjectDetails, resetErrors, clearState })(ProjectPage)