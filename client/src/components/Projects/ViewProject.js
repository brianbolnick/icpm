import React, { Component } from 'react';
import Layout from '../Layout'
import { connect } from 'react-redux';
import { getProjectDetails, resetErrors, clearState } from '../../actions/project_index';
import moment from 'moment';
import MilestoneView from './MilestoneView';
import ContactView from './ContactsView';
import NotesView from './NotesView';

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
    constructor(props) {
        super(props);
        this.state = {
            value: 'tasks'
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

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

                <div className="view-select">                    
                    <select id="project-view" value={this.state.value} onChange={this.handleChange}>
                        <option value="tasks">Tasks</option>
                        <option value="contacts">Contacts</option>
                        <option value="notes">Notes</option>
                    </select>
                </div>
                <div className="main-container">
                    <MilestoneView data={data} active={this.state.value} />
                    <ContactView data={data} active={this.state.value} />
                    <NotesView data={data} active={this.state.value} />
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