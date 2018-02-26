import React, { Component } from 'react';
import CanvasLogo from '../../img/canvas-logo-small.png'
import SmallLogo from '../../img/canvas-logo-extra.png'
import moment from 'moment'

class EmailContainer extends Component {
    componentDidMount() {


    }

    render() {
        return (
            <div className="email-container" id="email-template">
                <EmailTemplate data={this.props.location.state.referrer} project={this.props.location.state.projectData} />
            </div>
        )
    }
}

class Status extends Component {
    render() {
        var text;
        var style;
        switch (this.props.data) {
            case '0':
                text = "Not Started"
                style = { color: "#EB3425", fontWeight: "600" }
                break;
            case '1':
                text = "In Progress"
                style = { color: "#588CC5", fontWeight: "600" }
                break;
            case '2':
                text = "On Hold"
                style = { color: "#ED9145", fontWeight: "600" }
                break;
            case '3':
                text = "Done"
                style = { color: "#78A55A", fontWeight: "600" }
                break;
            default:
                text = ""
                style = { color: "#78A55A", fontWeight: "600" }
                break;
        }
        return (
            <span style={style}>{text}</span>
        )

    }
}

class EmailTemplate extends Component {


    render() {
        const { data, project } = this.props;
        const client = data.actionItems.filter(x => x.team !== 1)
        const inst = data.actionItems.filter(x => x.team === 1)
        const clientActions = client.map((item, index) => {
            return (
                <li key={`client-${item.id}`}>{item.description}</li>
            )
        })
        const instActions = inst.map((item, index) => {
            return (
                <li key={`inst-${item.id}`}>{item.description}</li>
            )
        })
        return (

            <div style={{ width: '800px' }}>
                <div className="email-main-header">
                    <div className="main-header-text">Weekly Status Call</div>
                    <div className="main-header-logo"><img style={{ height: '35px' }} src={CanvasLogo} alt="" /></div>
                </div>
                <div className="welcome-text">
                    <p>Hi Everyone,</p>
                    <br />
                    <p> It was great meeting with you!  Let's keep up the momentum and make sure your Canvas implementation goes smoothly.
                        Below is a summary of the overall implementation project status, as well as any action or follow-up items we discussed
                        on our call.
                    </p>
                </div>

                <br />

                <div className="email-sub-header">
                    <div className="main-sub-text">Action Items</div>
                    <div className="main-sub-logo"><img style={{ height: '25px' }} src={SmallLogo} alt="" /></div>
                </div>
                <div className="action-items-container">
                    <span style={{ fontWeight: '600' }}>Client Action Items</span>
                    <ul>
                        {clientActions}
                    </ul>
                    <span style={{ fontWeight: '600' }}>Instructure Action Items</span>
                    <ul>
                        {instActions}
                    </ul>
                </div>

                <br />
                <div className="project-info">
                    <div className="project-info-date">Target End Date:<b> {moment(project.end_date).format('MM/DD/YYYY')}</b></div>
                    <div className="project-info-drive">Shared Project Folder: <a href="https://google.com"><b style={{ textDecoration: 'underline', color: 'blue' }}>CLICK HERE</b></a></div>
                </div>

                <div className="email-sub-header" style={{ background: '#73C6E3' }}>
                    <div className="main-sub-text">Implementation Items</div>
                    <div className="main-sub-logo"><img style={{ height: '25px' }} src={SmallLogo} alt="" /></div>
                </div>

                <p>Tasks to be completed during the implementation phase:</p> <br />
                <table className='email-table'>
                    <tbody>
                        <tr>
                            <td>SIS</td>
                            <td>
                                <Status data={data.sisHtml.status} />
                            </td>
                            <td>
                                <div>
                                    <span style={{ fontWeight: '600' }}>Type: </span>
                                    {project.sis}
                                </div>
                                <br />
                                <div>
                                    <span style={{ fontWeight: '600' }}>Notes: </span>
                                </div>
                                <div dangerouslySetInnerHTML={{ __html: data.sisHtml.html }} />
                            </td>
                        </tr>
                        <tr>
                            <td>Authentication</td>
                            <td><Status data={data.authHtml.status} /></td>
                            <td>
                                <div>
                                    <span style={{ fontWeight: '600' }}>Type: </span>
                                    <span style={{ textTransform: 'uppercase' }}>{project.auth_type}</span>
                                </div>
                                <br />
                                <div>
                                    <span style={{ fontWeight: '600' }}>Notes: </span>
                                </div>
                                <div dangerouslySetInnerHTML={{ __html: data.authHtml.html }} />
                            </td>
                        </tr>
                        <tr>
                            <td>Branding</td>
                            <td><Status data={data.brandingHtml.status} /></td>
                            <td>
                                <div>
                                    <span style={{ fontWeight: '600' }}>Notes: </span>
                                </div>
                                <div dangerouslySetInnerHTML={{ __html: data.brandingHtml.html }} />
                            </td>
                        </tr>
                        <tr>
                            <td>Migration</td>
                            <td><Status data={data.migrationHtml.status} /></td>
                            <td>
                                <div>
                                    <span style={{ fontWeight: '600' }}>Legacy LMS: </span>
                                    {project.legacy_lms}
                                </div>
                                <br />
                                <div>
                                    <span style={{ fontWeight: '600' }}>Notes: </span>
                                </div>
                                <div dangerouslySetInnerHTML={{ __html: data.migrationHtml.html }} />
                            </td>
                        </tr>
                        <tr>
                            <td>Support</td>
                            <td><Status data={data.supportHtml.status} /></td>
                            <td>
                                <div>
                                    <span style={{ fontWeight: '600' }}>Type: </span>
                                    {project.support_package}
                                </div>
                                <br />
                                <div>
                                    <span style={{ fontWeight: '600' }}>Notes: </span>
                                </div>
                                <div dangerouslySetInnerHTML={{ __html: data.supportHtml.html }} />
                            </td>
                        </tr>
                        <tr>
                            <td>Training</td>
                            <td><Status data={data.trainingHtml.status} /></td>
                            <td>
                                <div dangerouslySetInnerHTML={{ __html: data.trainingHtml.html }} />
                            </td>
                        </tr>
                    </tbody>
                </table>

                <br />

                <div className="email-sub-header" style={{ background: '#47535E' }}>
                    <div className="main-sub-text">Follow-Up Items</div>
                    <div className="main-sub-logo"><img style={{ height: '25px' }} src={CanvasLogo} alt="" /></div>
                </div>
                <p>Here are some additional items we discussed on the call:</p>

                <div dangerouslySetInnerHTML={{ __html: data.otherHtml }} />

                <p>Please let me know if there is anything you feel should be added or that we have missed. Have a great day!</p>

            </div>
        );
    }
}

export default EmailContainer;