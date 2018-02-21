import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAuth, handleAuthTaskComplete } from '../../actions/project_index';
import { Checkbox } from 'semantic-ui-react'
import CircularProgressbar from 'react-circular-progressbar';

class AuthCard extends Component {
    componentDidMount() {
        this.props.getAuth(this.props.data)
    }

    handleChange = (e, { value }) => {
        this.props.handleAuthTaskComplete(JSON.parse(value));
    }

    render() {
        const { auth } = this.props;
        
        var tasks;
        var total = 0;
        var complete = 0;
        if (auth && auth.tasks) {
            tasks = auth.tasks.map((task, index) => {
                var status;
                var checked = false;
                switch (task.status) {
                    case "active":
                        total++;
                        status = "task-open"
                        break;
                    case "complete":
                        status = "task-complete"
                        checked = true;
                        complete++;
                        total++;
                        break;
                    case "removed":
                        status = "task-removed"
                        checked = true;
                        complete++;
                        total++;
                        break;
                    default:
                        break;
                }

                return (
                    <Checkbox
                        key={task._id}
                        defaultChecked={checked}
                        disabled={checked}
                        label={task.display_name}
                        onChange={this.handleChange}
                        value={JSON.stringify({ task: task._id, milestone: auth._id })}
                        className={status}
                    />
                )
            })
        }

        const percentage = Math.round(((complete / total)) * 100);

        return (
            <div className="project-task-card">
                <div className="task-card-content">
                    <div className="task-title">
                        AUTHENTICATION
                    </div>
                    <div className="task-subtitle">
                        {this.props.authType}
                    </div>
                    <div className="progress-container">
                        <CircularProgressbar percentage={percentage} className="auth-card-progress" />
                    </div>
                    <div className="tasks-container">
                        {tasks}
                    </div>
                </div>

            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        error: state.project.error,
        fetchingAuth: state.project.fetchingAuth,
        auth: state.project.auth
    }
}

export default connect(mapStateToProps, { getAuth, handleAuthTaskComplete })(AuthCard)