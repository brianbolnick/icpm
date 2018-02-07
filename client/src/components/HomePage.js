import React, { Component } from 'react';
import Layout from './Layout'
import HomeContent from './HomeContent'


class HomePage extends Component {
  render() {
    return (
      <Layout bg="home-layout">
          <div className="home-page" style={{ minHeight: '100%', width: '75%' }}>            
              <HomeContent />
          </div>       
        </Layout>
    );
  }
}

export default HomePage;
