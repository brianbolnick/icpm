import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import { Icon } from 'semantic-ui-react'
import IconInstructureLine from 'instructure-icons/lib/Line/IconInstructureLine'
import { Redirect } from 'react-router'
import 'react-quill/dist/quill.snow.css';

class NotesContent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            redirect: false,
            sisHtml: {
                html: '',
                status: '0'
            },
            authHtml: {
                html: '',
                status: '0'
            },
            brandingHtml: {
                html: '',
                status: '0'
            },
            migrationHtml: {
                html: '',
                status: '0'
            },
            supportHtml: {
                html: '',
                status: '0'
            },
            trainingHtml: {
                html: '',
                status: '0'
            },
            otherHtml: '',
            newItem: '',
            newItemTeam: 2,
            newItemActive: false,
            actionItems: []
        }
        this.handleSisChange = this.handleSisChange.bind(this)
        this.handleSisStatusChange = this.handleSisStatusChange.bind(this)
        this.handleAuthStatusChange = this.handleAuthStatusChange.bind(this)
        this.handleBrandingStatusChange = this.handleBrandingStatusChange.bind(this)
        this.handleMigrationStatusChange = this.handleMigrationStatusChange.bind(this)
        this.handleSupportStatusChange = this.handleSupportStatusChange.bind(this)
        this.handleTrainingStatusChange = this.handleTrainingStatusChange.bind(this)
        this.handleAuthChange = this.handleAuthChange.bind(this)
        this.handleBrandingChange = this.handleBrandingChange.bind(this)
        this.handleMigrationChange = this.handleMigrationChange.bind(this)
        this.handleSupportChange = this.handleSupportChange.bind(this)
        this.handleTrainingChange = this.handleTrainingChange.bind(this)
        this.handleOtherChange = this.handleOtherChange.bind(this)
        this.handleButtonClick = this.handleButtonClick.bind(this)
        this.handleAddItemClick = this.handleAddItemClick.bind(this)
        this.handleNewItemChange = this.handleNewItemChange.bind(this)
        this.handleNewItemSubmit = this.handleNewItemSubmit.bind(this)
        this.handleNewItemTeamChange = this.handleNewItemTeamChange.bind(this)
        this.handleDeleteClick = this.handleDeleteClick.bind(this)
    }

    handleSisChange(html) {
        this.setState({ sisHtml: { ...this.state.sisHtml, html: html } });
    }
    handleSisStatusChange(event) {
        this.setState({ sisHtml: { ...this.state.sisHtml, status: event.target.value } });
    }
    handleAuthChange(html) {
        this.setState({ authHtml: { ...this.state.authHtml, html: html } });
    }
    handleAuthStatusChange(event) {
        this.setState({ authHtml: { ...this.state.authHtml, status: event.target.value } });
    }
    handleBrandingChange(html) {
        this.setState({ brandingHtml: { ...this.state.brandingHtml, html: html } });
    }
    handleBrandingStatusChange(event) {
        this.setState({ brandingHtml: { ...this.state.brandingHtml, status: event.target.value } });
    }
    handleMigrationChange(html) {
        this.setState({ migrationHtml: { ...this.state.migrationHtml, html: html } });
    }
    handleMigrationStatusChange(event) {
        this.setState({ migrationHtml: { ...this.state.migrationHtml, status: event.target.value } });
    }
    handleSupportChange(html) {
        this.setState({ supportHtml: { ...this.state.supportHtml, html: html } });
    }
    handleSupportStatusChange(event) {
        this.setState({ supportHtml: { ...this.state.supportHtml, status: event.target.value } });
    }
    handleTrainingChange(html) {
        this.setState({ trainingHtml: { ...this.state.trainingHtml, html: html } });
    }
    handleTrainingStatusChange(event) {
        this.setState({ trainingHtml: { ...this.state.trainingHtml, status: event.target.value } });
    }
    handleOtherChange(html) {
        this.setState({ otherHtml: html });
    }

    handleButtonClick() {
        this.setState({ redirect: true })
    }

    handleAddItemClick() {
        this.setState({ newItemActive: true })
    }

    handleNewItemChange(event) {
        this.setState({ newItem: event.target.value })

    }
    handleNewItemTeamChange(event) {
        this.setState({ newItemTeam: event.target.value })
    }

    handleNewItemSubmit(event) {
        this.setState({
            newItemActive: false,
            actionItems: [
                ...this.state.actionItems,
                {
                    id: this.state.actionItems.length + 1,
                    description: this.state.newItem,
                    team: parseInt(this.state.newItemTeam, 10)
                }
            ],
            newItem: ''
        })

        event.preventDefault();
    }

    handleDeleteClick = (id) => e => {
        this.setState({
            actionItems: this.state.actionItems.filter((x) => x.id !== id)
        })
    }
    render() {
        const { data, active } = this.props;
        const modules = {
            toolbar: [
                ['bold', 'italic', 'underline'],
                [{ 'list': 'bullet' }],
                ['link']
            ],
        }

        const formats = [
            'bold', 'italic', 'underline',
            'list', 'bullet',
            'link'
        ]

        const actions = this.state.actionItems.map((item, index) => {
            const icon = item.team === 1 ? <IconInstructureLine className="inst-icon" /> : <Icon name='student' disabled />
            return (
                <div className="action-item" key={index}>
                    <div className="action-item-desc">
                        {icon} {item.description}
                    </div>
                    <div className="action-item-settings">
                        <div className="action-item-icon"><Icon name='edit' link /></div>
                        <div className="action-item-icon"><Icon id='remove-icon' name='remove' link onClick={this.handleDeleteClick(item.id)} /></div>
                    </div>
                </div>
            )
        })

        return (
            this.state.redirect ?
                <Redirect to={{
                    pathname: '/email_test',
                    state: {
                        referrer: this.state,
                        projectData: this.props.data
                    }
                }} />
                :
                <div className={active === "notes" ? "task-container" : "project-hidden"}>
                    <div className="notes-content">
                        <div className="notes-secondary">
                            <div className="action-items">
                                <div className="notes-box-title">ACTION ITEMS</div>
                                <div className="action-items-container">
                                    {actions}
                                </div>
                                {this.state.newItemActive ?
                                    <div className="action-item-form-container">
                                        <form className="action-item-form" onSubmit={this.handleNewItemSubmit}>
                                            <input type="text" value={this.state.newItem} onChange={this.handleNewItemChange} className="action-input" />
                                            <select value={this.state.newItemTeam} onChange={this.handleNewItemTeamChange} className="action-select">
                                                <option value={2}>CLIENT</option>
                                                <option value={1}>INST</option>
                                            </select>
                                            <input type="submit" value="Submit" className="action-item-btn" />
                                        </form>
                                    </div>
                                    :
                                    null
                                }
                                <div className="new-action-item" id='new-action-item' onClick={this.handleAddItemClick}>
                                    <Icon name='plus' /> Add Action Item
                                </div>
                            </div>
                            <div className="notes-other">
                                <div className="notes-box">
                                    <div className="notes-box-title">OTHER FOLLOW-UPS</div>
                                    <ReactQuill
                                        theme="snow"
                                        modules={modules}
                                        formats={formats}
                                        onChange={this.handleOtherChange}
                                        value={this.state.otherHtml}
                                        style={{ width: '100%' }}
                                    />
                                </div>
                            </div>
                        </div>
                        <hr className='vertical-divider hide-on-mobile' />
                        <div className="notes-main">
                            <div className="notes-box">
                                <div className="notes-box-title">
                                    SIS
                                    <select id="notes-status" value={this.state.sisHtml.status} onChange={this.handleSisStatusChange}>
                                        <option value="0">Not Started</option>
                                        <option value="1">In Progress</option>
                                        <option value="2">On Hold</option>
                                        <option value="3">Done</option>
                                    </select>
                                </div>
                                <ReactQuill
                                    theme="snow"
                                    modules={modules}
                                    formats={formats}
                                    onChange={this.handleSisChange}
                                    value={this.state.sisHtml.html}
                                />
                            </div>
                            <div className="notes-box">
                                <div className="notes-box-title">
                                    AUTHENTICATION
                                    <select id="notes-status" value={this.state.authHtml.status} onChange={this.handleAuthStatusChange}>
                                        <option value="0">Not Started</option>
                                        <option value="1">In Progress</option>
                                        <option value="2">On Hold</option>
                                        <option value="3">Done</option>
                                    </select>    
                                </div>
                                <ReactQuill
                                    theme="snow"
                                    modules={modules}
                                    formats={formats}
                                    onChange={this.handleAuthChange}
                                    value={this.state.authHtml.html}
                                />
                            </div>
                            <div className="notes-box">
                                <div className="notes-box-title">
                                    BRANDING
                                    <select id="notes-status" value={this.state.brandingHtml.status} onChange={this.handleBrandingStatusChange}>
                                        <option value="0">Not Started</option>
                                        <option value="1">In Progress</option>
                                        <option value="2">On Hold</option>
                                        <option value="3">Done</option>
                                    </select>
                                </div>
                                <ReactQuill
                                    theme="snow"
                                    modules={modules}
                                    formats={formats}
                                    onChange={this.handleBrandingChange}
                                    value={this.state.brandingHtml.html}
                                />
                            </div>
                            <div className="notes-box">
                                <div className="notes-box-title">
                                    MIGRATION
                                    <select id="notes-status" value={this.state.migrationHtml.status} onChange={this.handleMigrationStatusChange}>
                                        <option value="0">Not Started</option>
                                        <option value="1">In Progress</option>
                                        <option value="2">On Hold</option>
                                        <option value="3">Done</option>
                                    </select>
                                </div>
                                <ReactQuill
                                    theme="snow"
                                    modules={modules}
                                    formats={formats}
                                    onChange={this.handleMigrationChange}
                                    value={this.state.migrationHtml.html}
                                />
                            </div>
                            <div className="notes-box">
                                <div className="notes-box-title">
                                    SUPPORT
                                    <select id="notes-status" value={this.state.supportHtml.status} onChange={this.handleSupportStatusChange}>
                                        <option value="0">Not Started</option>
                                        <option value="1">In Progress</option>
                                        <option value="2">On Hold</option>
                                        <option value="3">Done</option>
                                    </select>
                                </div>
                                <ReactQuill
                                    theme="snow"
                                    modules={modules}
                                    formats={formats}
                                    onChange={this.handleSupportChange}
                                    value={this.state.supportHtml.html}
                                />
                            </div>
                            <div className="notes-box">
                                <div className="notes-box-title">
                                    TRAINING
                                    <select id="notes-status" value={this.state.trainingHtml.status} onChange={this.handleTrainingStatusChange}>
                                        <option value="0">Not Started</option>
                                        <option value="1">In Progress</option>
                                        <option value="2">On Hold</option>
                                        <option value="3">Done</option>
                                    </select>
                                </div>
                                <ReactQuill
                                    theme="snow"
                                    modules={modules}
                                    formats={formats}
                                    onChange={this.handleTrainingChange}
                                    value={this.state.trainingHtml.html}
                                />
                            </div>
                        </div>
                    </div>
                    <div style={{ width: '100%', textAlign: 'right', marginRight: '35px' }}>
                        <button id='notes-button' className="form-button" onClick={this.handleButtonClick}>Create Email</button>
                    </div>
                </div>
        );
    }
}

export default NotesContent;