import React, { Component } from 'react';
import { Sidebar, Segment, Button, Menu, Image, Icon, Header, Popup } from 'semantic-ui-react'
import { Link } from "react-router-dom";
import Logo from '../img/impl-logo.png'
import 'react-tippy/dist/tippy.css';
import { Tooltip } from 'react-tippy';
import Layout from './Layout'
import HomeContent from './HomeContent'

class DashboardPage extends Component {
  render() {
    return (
      <Layout bg="dashboard-layout">
          <div className="home-page" style={{ minHeight: '100%' }}>            
              <HomeContent />
          </div>       
        </Layout>
    );
  }
}

export default DashboardPage;
