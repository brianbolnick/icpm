import React, { Component } from 'react';
import Layout from '../Layout'
import HomeContent from './HomeContent'
import NoAuth from './NoAuth'
import Auth from '../../tools/Auth';


class HomePage extends Component {
  render() {
    return (
      <Layout bg="home-layout">
        <div className="home-page" style={{ minHeight: '100vh', width: '75%' }}>
          {Auth.isUserAuthenticated()
            ?
            <HomeContent />
            :
            <NoAuth />
          }
        </div>
      </Layout>
    );
  }
}

export default HomePage;
