import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react'
import { Link } from "react-router-dom";
import Logo from '../img/impl-logo-wt.png'
import Auth from '../tools/Auth';
import { TEAM_OPTIONS } from '../data/common_constants'

const u = Auth.getUser();
const user = JSON.parse(u);

class SidebarContent extends Component {
    handleLogout = () => {
        localStorage.removeItem('token');
    }
    render() {
        return (
            <div className="sidebar-content">
                <div className="sidebar-user-info">
                    <div className="sidebar-profile-image">
                        <img src={Logo} alt="" style={{ width: '75px' }} />
                    </div>
                    {Auth.isUserAuthenticated() ?
                        <div className="sidebar-user-details">
                            <div className="sidebar-user-name">
                                {user.first_name} {user.last_name}
                            </div>
                            <div className="sidebar-user-role">
                                {TEAM_OPTIONS[user.team]}
                            </div>
                        </div>
                        :
                        <div className="sidebar-user-details">
                            <div className="sidebar-user-name">
                                Welcome!
                            </div>
                            <div className="sidebar-user-role">
                                Please sign in.
                            </div>
                        </div>

                    }

                </div>
                <div className="sidebar-nav-links">
                    {Auth.isUserAuthenticated()
                        ?
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
                            <li className="sidebar-link">
                                <Link to="/" onClick={this.handleLogout}>
                                    <Icon name='log out' link className="sidebar-item" />
                                    <span className="sidebar-link-text">Logout</span>
                                </Link>
                            </li>
                        </ul>
                        :
                        <ul className="sidebar-links">
                            <li className="sidebar-link">
                                <Link to="/login">
                                    <Icon name='sign in' link className="sidebar-item" />
                                    <span className="sidebar-link-text">Login</span>
                                </Link>
                            </li>
                            <li className="sidebar-link">
                                <Link to="/signup">
                                    <Icon name='signup' link className="sidebar-item" />
                                    <span className="sidebar-link-text">Sign Up</span>
                                </Link>
                            </li>
                        </ul>
                    }
                </div>
                <div className="sidebar-footer">
                    {Auth.isUserAuthenticated()
                        ?
                        <Link to="/settings" className="sidebar-link">
                            <Icon name='settings' link className="sidebar-item" />
                            <span className="sidebar-link-text">Settings</span>
                        </Link>
                        :
                        null
                    }
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
