import React, { Component } from 'react';
import { Link } from "react-router-dom";
import moment from 'moment';
import axios from 'axios';
import { API_URL } from '../../tools/api-config';
import Auth from '../../tools/Auth';
const token = Auth.getToken();
const config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': `bearer ${token}` } }

class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sisProg: 0,
            authProg: 0,
            brandingProg: 0,
            migrationProg: 0,
            otherProg: 0
        };
    }

    componentWillMount() {
        axios.get(`${API_URL}/api/milestones/${this.props.data.milestones.sis}`, config).then(response => {
            var total = 0;
            var complete = 0;

            response.data.tasks.map((task, index) => {
                switch (task.status) {
                    case "active":
                        total++;
                        break;
                    case "complete":
                        complete++;
                        total++;
                        break;
                    case "removed":
                        complete++;
                        total++;
                        break;
                    default:
                        break;
                }
                return null;
            })
            const percentage = Math.round(((complete / total)) * 100);
            this.setState({ sisProg: percentage });
        }).catch(error => { console.log(error) })
        axios.get(`${API_URL}/api/milestones/${this.props.data.milestones.authentication}`, config).then(response => {
            var total = 0;
            var complete = 0;
            response.data.tasks.map((task, index) => {
                switch (task.status) {
                    case "active":
                        total++;
                        break;
                    case "complete":
                        complete++;
                        total++;
                        break;
                    case "removed":
                        complete++;
                        total++;
                        break;
                    default:
                        break;
                }
                return null;
            })
            const percentage = Math.round(((complete / total)) * 100);
            this.setState({ authProg: percentage });
        }).catch(error => { console.log(error) })
        axios.get(`${API_URL}/api/milestones/${this.props.data.milestones.branding}`, config).then(response => {
            var total = 0;
            var complete = 0;

            response.data.tasks.map((task, index) => {
                switch (task.status) {
                    case "active":
                        total++;
                        break;
                    case "complete":
                        complete++;
                        total++;
                        break;
                    case "removed":
                        complete++;
                        total++;
                        break;
                    default:
                        break;
                }
                return null;
            })
            const percentage = Math.round(((complete / total)) * 100);
            this.setState({ brandingProg: percentage });
        }).catch(error => { console.log(error) })
        axios.get(`${API_URL}/api/milestones/${this.props.data.milestones.migration}`, config).then(response => {
            var total = 0;
            var complete = 0;

            response.data.tasks.map((task, index) => {
                switch (task.status) {
                    case "active":
                        total++;
                        break;
                    case "complete":
                        complete++;
                        total++;
                        break;
                    case "removed":
                        complete++;
                        total++;
                        break;
                    default:
                        break;
                }
                return null;
            })
            const percentage = Math.round(((complete / total)) * 100);
            this.setState({ migrationProg: percentage });
        }).catch(error => { console.log(error) })
        axios.get(`${API_URL}/api/milestones/${this.props.data.milestones.other}`, config).then(response => {
            var total = 0;
            var complete = 0;

            response.data.tasks.map((task, index) => {
                switch (task.status) {
                    case "active":
                        total++;
                        break;
                    case "complete":
                        complete++;
                        total++;
                        break;
                    case "removed":
                        complete++;
                        total++;
                        break;
                    default:
                        break;
                }
                return null;
            })
            const percentage = Math.round(((complete / total)) * 100);
            this.setState({ otherProg: percentage });
        }).catch(error => { console.log(error) })
    }

    render() {
        const { data } = this.props;
        return (
            <div className="dashboard-card" >
                <Link to={`/projects/${data._id}`} >
                    <div className="card-content">
                        <div className="card-heading">
                            <div className="card-title">{data.name}</div>
                            <div className="card-subtitle">{data.imp_package}</div>
                        </div>
                        <hr className="card-divider" />
                        <div className="card-main">
                            <div className="csm-info">
                                <span>CSM:</span>
                                <div className="csm-name">{data.csm}</div>
                            </div>
                            <div className="date-info">
                                <span>Target Close Date:</span>
                                <div className="csm-name">{moment(data.end_date).format('MM-DD-YY')}</div>
                            </div>
                            <div className="card-stats">
                                <div className="card-sis">
                                    <span className="card-task-title">SIS</span>
                                    <div className="progress-bar">
                                        <div className="progress-sis" style={{ width: `${this.state.sisProg}%` }}>
                                            {this.state.sisProg}%
                                        </div>
                                    </div>
                                </div>
                                <div className="card-branding">
                                    <span className="card-task-title">Branding</span>
                                    <div className="progress-bar">
                                        <div className="progress-branding" style={{ width: `${this.state.brandingProg}%` }}>
                                            {this.state.brandingProg}%
                                        </div>
                                    </div>
                                </div>
                                <div className="card-auth">
                                    <span className="card-task-title">Auth</span>
                                    <div className="progress-bar">
                                        <div className="progress-auth" style={{ width: `${this.state.authProg}%` }}>
                                            {this.state.authProg}%
                                    </div>
                                    </div>
                                </div>
                                <div className="card-migration">
                                    <span className="card-task-title">Migration</span>
                                    <div className="progress-bar">
                                        <div className="progress-migration" style={{ width: `${this.state.migrationProg}%` }}>
                                            {this.state.migrationProg}%
                                    </div>
                                    </div>
                                </div>
                                <div className="card-other">
                                    <span className="card-task-title">Other</span>
                                    <div className="progress-bar">
                                        <div className="progress-other" style={{ width: `${this.state.otherProg}%` }}>
                                            {this.state.otherProg}%
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        )
    }
}

export default Card