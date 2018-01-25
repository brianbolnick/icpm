import React, { Component } from 'react';
import { Sidebar, Segment, Button, Menu, Image, Icon, Header, Popup } from 'semantic-ui-react'
import { Link } from "react-router-dom";
import Logo from '../img/impl-logo.png'
import 'react-tippy/dist/tippy.css';
import { Tooltip } from 'react-tippy';
import HomeContent from './HomeContent'

class SidebarMenu extends Component {
  render() {
    const popupStyle = {
      borderRadius: '2px',
      opacity: 0.7
    }
    return (
      <Sidebar as={Menu} animation='push' width='thin' visible icon='labeled' vertical inverted>
        <Menu.Item name='home' style={{ marginBottom: '150px' }}>
          <Popup
            trigger={
              <Image as={Link} to='/' src={Logo} style={{ width: '35px' }} className="sidebar-logo" />
            }
            content='Home'
            position='right center'
            style={popupStyle}
            inverted
          />
        </Menu.Item>
        <Menu.Item name='dashboard'>
          <Popup
            trigger={
              <Icon name='dashboard' link className="sidebar-item" />
            }
            content='Dashboard'
            position='right center'
            style={popupStyle}
            inverted

          />
        </Menu.Item>
        <Menu.Item name='tasks'>
          <Popup
            trigger={
              <Icon name='tasks' link className="sidebar-item" />
            }
            content='Tasks'
            position='right center'
            style={popupStyle}
            inverted
          />
        </Menu.Item>
        <Menu.Item name='travel'>
          <Popup
            trigger={
              <Icon name='travel' link className="sidebar-item" />
            }
            content='Resources'
            position='right center'
            style={popupStyle}
            inverted
          />
        </Menu.Item>
      </Sidebar>
    )
  }
}

class HomePage extends Component {
  render() {
    return (
      <div className="home-layout">
        <div className="home-page" style={{ minHeight: '100%' }}>
          <Sidebar.Pushable as={Segment} style={{ background: 'none' }}>
            <SidebarMenu />
            <Sidebar.Pusher>
              <Segment basic>
                <HomeContent />
              </Segment>
            </Sidebar.Pusher>
          </Sidebar.Pushable>
        </div>
      </div>
    );
  }
}

export default HomePage;
