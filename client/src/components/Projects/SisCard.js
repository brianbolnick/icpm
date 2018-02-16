import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSIS, handleSisTaskComplete } from '../../actions/project_index';
import { Checkbox } from 'semantic-ui-react'
import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

class SisCard extends Component {
    componentDidMount() {
        this.props.getSIS(this.props.data)
    }

    handleChange = (e, { value }) => {
        this.props.handleSisTaskComplete(JSON.parse(value));
    }

    render() {
        const { sis } = this.props;
        var tasks;
        var total = 0;
        var complete = 0;
        if (sis && sis.tasks) {
            tasks = sis.tasks.map((task, index) => {
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
                        value={JSON.stringify({ task: task._id, milestone: sis._id })}
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
                        SIS
                    </div>
                    <div className="task-subtitle">
                        {this.props.sisType}
                    </div>
                    <div className="progress-container">
                        <CircularProgressbar percentage={percentage} className="sis-card-progress" />
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
        fetchingSIS: state.project.fetchingSIS,
        sis: state.project.sis
    }
}

export default connect(mapStateToProps, { getSIS, handleSisTaskComplete })(SisCard)