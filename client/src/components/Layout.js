import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react'
import { Link } from "react-router-dom";
import Logo from '../img/impl-logo-wt.png'

class SidebarContent extends Component {
    render() {
        return (
            <div className="sidebar-content">
                <div className="sidebar-user-info">
                    <div className="sidebar-profile-image">
                        <img src={Logo} alt="" style={{ width: '75px' }} />
                    </div>
                    <div className="sidebar-user-details">
                        <div className="sidebar-user-name">
                            Brian Bolnick
                            </div>
                        <div className="sidebar-user-role">
                            Higher Ed
                            </div>
                    </div>
                </div>
                <div className="sidebar-nav-links">
                    <ul className="sidebar-links">
                        <li className="sidebar-link">
                            <Link to="/">
                                <Icon name='dashboard' link className="sidebar-item" />
                                <span className="sidebar-link-text">Dashboard</span>
                            </Link>
                        </li>
                        <li className="sidebar-link">
                            <Link to="/projects">
                                <Icon name='block layout' link className="sidebar-item" />
                                <span className="sidebar-link-text">Projects</span>
                            </Link>
                        </li>
                        <li className="sidebar-link">
                            <Link to="/tasks">
                                <Icon name='tasks' link className="sidebar-item" />
                                <span className="sidebar-link-text">Tasks</span>
                            </Link>
                        </li>
                        <li className="sidebar-link">
                            <Link to="/resources">
                                <Icon name='travel' link className="sidebar-item" />
                                <span className="sidebar-link-text">Resources</span>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="sidebar-footer">
                    <Link to="/settings" className="sidebar-link">
                        <Icon name='settings' link className="sidebar-item" />
                        <span className="sidebar-link-text">Settings</span>
                    </Link>
                </div>
            </div>
        )
    }
}

class Layout extends Component {
    render() {
        return (
            <div className={this.props.bg} style={{ minHeight: '100%' }}>
                <div className="sidebar">
                    <SidebarContent />
                </div>
                <div className="main-content">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default Layout;
