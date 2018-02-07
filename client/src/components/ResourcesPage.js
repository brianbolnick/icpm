import React, { Component } from 'react';
import Layout from './Layout'
import HomeContent from './HomeContent'

class ResourcesPage extends Component {
  render() {
    return (
      <Layout bg="resources-layout">
          <div className="home-page" style={{ minHeight: '100%' }}>            
              <HomeContent />
          </div>       
        </Layout>
    );
  }
}

export default ResourcesPage;
