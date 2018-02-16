import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getMigration, handleMigrationTaskComplete } from '../../actions/project_index';
import { Checkbox } from 'semantic-ui-react'
import CircularProgressbar from 'react-circular-progressbar';

class MigrationCard extends Component {
    componentDidMount() {
        this.props.getMigration(this.props.data)
    }

    handleChange = (e, { value }) => {
        this.props.handleMigrationTaskComplete(JSON.parse(value));
    }

    render() {
        const { migration } = this.props;
        console.log(migration);
        var tasks;
        var total = 0;
        var complete = 0;
        if (migration && migration.tasks) {
            tasks = migration.tasks.map((task, index) => {
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
                        value={JSON.stringify({ task: task._id, milestone: migration._id })}
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
                        MIGRATION
                    </div>
                    <div className="task-subtitle">
                        {this.props.legacyLms}
                    </div>
                    <div className="progress-container">
                        <CircularProgressbar percentage={percentage} className="migration-card-progress" />
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
        fetchingMigration: state.project.fetchingMigration,
        migration: state.project.migration
    }
}

export default connect(mapStateToProps, { getMigration, handleMigrationTaskComplete })(MigrationCard)