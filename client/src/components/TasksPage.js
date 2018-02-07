import React, { Component } from 'react';
import Layout from './Layout'

class TasksPage extends Component {
  render() {
    return (
      <Layout bg="tasks-layout">
          <div className="home-page" style={{ minHeight: '100%' }}>            
          </div>       
        </Layout>
    );
  }
}

export default TasksPage;
