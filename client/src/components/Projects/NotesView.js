import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import { Icon } from 'semantic-ui-react'
import IconInstructureLine from 'instructure-icons/lib/Line/IconInstructureLine'
import 'react-quill/dist/quill.snow.css';

class NotesContent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            sisHtml: '',
            authHtml: '',
            brandingHtml: '',
            migrationHtml: '',
            supportHtml: '',
            trainingHtml: '',
            otherHtml: '',
            newItem: '',
            newItemTeam: 2,
            newItemActive: false,
            actionItems: [
                {
                    id: 1,
                    description: "Compile project plan",
                    team: 1,
                },
                {
                    id: 2,
                    description: "Send list of training users",
                    team: 2,
                }
            ]
        }
        this.handleSisChange = this.handleSisChange.bind(this)
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
        this.setState({ sisHtml: html });
    }
    handleAuthChange(html) {
        this.setState({ authHtml: html });
    }
    handleBrandingChange(html) {
        this.setState({ brandingHtml: html });
    }
    handleMigrationChange(html) {
        this.setState({ migrationHtml: html });
    }
    handleSupportChange(html) {
        this.setState({ supportHtml: html });
    }
    handleTrainingChange(html) {
        this.setState({ trainingHtml: html });
    }
    handleOtherChange(html) {
        this.setState({ otherHtml: html });
    }

    handleButtonClick() {
        alert("This won't really do much right now, but check your console for all of the html!")
        console.table(this.state)
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
                        <div className="action-item-icon"><Icon id='remove-icon' name='remove' link onClick={this.handleDeleteClick(item.id)}/></div>
                    </div>
                </div>
            )
        })

        return (
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
                                        <input type="text" value={this.state.newItem} onChange={this.handleNewItemChange} className="action-input"/>
                                        <select value={this.state.newItemTeam} onChange={this.handleNewItemTeamChange} className="action-select">
                                            <option value={2}>Client</option>
                                            <option value={1}>INST</option>
                                        </select>
                                        <input type="submit" value="Submit" style={{ display: 'none' }} />
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
                            <div className="notes-box-title">SIS</div>
                            <ReactQuill
                                theme="snow"
                                modules={modules}
                                formats={formats}
                                onChange={this.handleSisChange}
                                value={this.state.sisHtml}
                            />
                        </div>
                        <div className="notes-box">
                            <div className="notes-box-title">AUTHENTICATION</div>
                            <ReactQuill
                                theme="snow"
                                modules={modules}
                                formats={formats}
                                onChange={this.handleAuthChange}
                                value={this.state.authHtml}
                            />
                        </div>
                        <div className="notes-box">
                            <div className="notes-box-title">BRANDING</div>
                            <ReactQuill
                                theme="snow"
                                modules={modules}
                                formats={formats}
                                onChange={this.handleBrandingChange}
                                value={this.state.brandingHtml}
                            />
                        </div>
                        <div className="notes-box">
                            <div className="notes-box-title">MIGRATION</div>
                            <ReactQuill
                                theme="snow"
                                modules={modules}
                                formats={formats}
                                onChange={this.handleMigrationChange}
                                value={this.state.migrationHtml}
                            />
                        </div>
                        <div className="notes-box">
                            <div className="notes-box-title">SUPPORT</div>
                            <ReactQuill
                                theme="snow"
                                modules={modules}
                                formats={formats}
                                onChange={this.handleSupportChange}
                                value={this.state.supportHtml}
                            />
                        </div>
                        <div className="notes-box">
                            <div className="notes-box-title">TRAINING</div>
                            <ReactQuill
                                theme="snow"
                                modules={modules}
                                formats={formats}
                                onChange={this.handleTrainingChange}
                                value={this.state.trainingHtml}
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