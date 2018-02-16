import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getBranding, handleBrandingTaskComplete } from '../../actions/project_index';
import { Checkbox } from 'semantic-ui-react'
import CircularProgressbar from 'react-circular-progressbar';

class BrandingCard extends Component {
    componentDidMount() {
        this.props.getBranding(this.props.data)
    }

    handleChange = (e, { value }) => {
        this.props.handleBrandingTaskComplete(JSON.parse(value));
    }

    render() {
        const { branding } = this.props;
        console.log(branding);
        var tasks;
        var total = 0;
        var complete = 0;
        if (branding && branding.tasks) {
            tasks = branding.tasks.map((task, index) => {
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
                        value={JSON.stringify({ task: task._id, milestone: branding._id })}
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
                        BRANDING
                    </div>
                    <div className="task-subtitle">
                        Theme Editor
                    </div>
                    <div className="progress-container">
                        <CircularProgressbar percentage={percentage} className="branding-card-progress" />
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
        fetchingBranding: state.project.fetchingBranding,
        branding: state.project.branding
    }
}

export default connect(mapStateToProps, { getBranding, handleBrandingTaskComplete })(BrandingCard)