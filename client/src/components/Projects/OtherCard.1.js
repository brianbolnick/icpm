import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getOther, handleOtherTaskComplete } from '../../actions/project_index';
import { Checkbox } from 'semantic-ui-react'
import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

class OtherCard extends Component {
    componentDidMount() {
        this.props.getOther(this.props.data)
    }

    handleChange = (e, { value }) => {
        this.props.handleOtherTaskComplete(JSON.parse(value));
    }

    render() {
        const { other } = this.props;
        var tasks;
        var total = 0;
        var complete = 0;
        if (other && other.tasks) {
            tasks = other.tasks.map((task, index) => {
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
                        value={JSON.stringify({ task: task._id, milestone: other._id })}
                        className={status}
                    />
                )
            })
        }

        const percentage = Math.round(((complete / total)) * 100);

        return (
            <div className="project-task-card other">
                <div className="task-card-content other">
                    <div className="task-title other">
                        MISC
                    </div>
                    <div className="task-subtitle other">
                        SUPPORT | TRAINING | ADMIN TOOLS
                    </div>
                    <div className="other-task-container">
                        <div className="progress-container other">
                            <CircularProgressbar percentage={percentage} className="other-card-progress other" />
                        </div>
                        <div className="tasks-container other">
                            {tasks}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        error: state.project.error,
        fetchingOther: state.project.fetchingOther,
        other: state.project.other
    }
}

export default connect(mapStateToProps, { getOther, handleOtherTaskComplete })(OtherCard)