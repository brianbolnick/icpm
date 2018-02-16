import React, { Component } from 'react';
import Layout from '../Layout'
import { connect } from 'react-redux';
import { getProjectDetails, resetErrors, clearState } from '../../actions/project_index';
import SisCard from './SisCard';
import AuthCard from './AuthCard';
import BrandingCard from './BrandingCard';
import MigrationCard from './MigrationCard';
import OtherCard from './OtherCard';
import moment from 'moment';

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
                    <div className="project-options">
                        <div className="projects-subtitle"><b>CSM:</b>{data.csm}</div>
                        <div className="projects-subtitle"><b>End Date: </b>{moment(data.end_date).format('MM-DD-YY')}</div>
                    </div>
                </div>

                <div className="main-container">
                    <div className="task-container">
                        {/* {data && data.milestones ? <OtherCard data={data.milestones.other} /> : null}                        */}
                        {data && data.milestones ? <SisCard data={data.milestones.sis} sisType={data.sis}/> : null}
                        {data && data.milestones ? <BrandingCard data={data.milestones.branding}/> : null}
                        {data && data.milestones ? <AuthCard data={data.milestones.authentication} authType={data.auth_type}/> : null}                       
                        {data && data.milestones ? <MigrationCard data={data.milestones.migration} legacyLms={data.legacy_lms}/> : null}                       
                        {data && data.milestones ? <OtherCard data={data.milestones.other} /> : null}                       
                    </div>                    
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