import React, { Component } from 'react';
import Layout from '../Layout'
import DashboardCard from '../Dashboard/DashboardCard'
import { Icon } from 'semantic-ui-react'
import { Link } from "react-router-dom";
import 'react-tippy/dist/tippy.css';
import { Tooltip } from 'react-tippy';

class ProjectPage extends Component {
  render() {
    return (
      <Layout bg="dashboard-layout">
        <div className="home-page" style={{ minHeight: '100vh', width: '75%' }}>
          <ProjectContent />
        </div>
      </Layout>
    );
  }
}


class ProjectContent extends Component {
  render() {

    const data = {
      id: "1",
      schoolName: "University of Utah",
      package: "Premium",
      csm: "Taylor Austin",
      date: "May 7, 2018"
    }

    var cardArr = []
    for (var i = 0; i < 10; i++) {
      cardArr.push(<DashboardCard data={data} key={i} />);
    }

    const cards = cardArr.map((card) => {
      return card;
    })

    return (
      <div>
        <div className="project-overview">
          <div className="dashboard-title" >
            <div className="projects-title">Implementation Projects</div>
            <div className="projects-subtitle">23 Active</div>
          </div>
          <div className="project-options">
            <Link to="/projects/new" className='new-project'>
              <Tooltip
                title="New Project"
                position="left"
                size='big'
                theme='transparent'
                arrow
              >
                <Icon name='add square' link className="option-item" style={{ color: '#212121' }} />
              </Tooltip>
            </Link>
          </div>
        </div>

        <div className="main-container">
          {cards}
        </div>
      </div>
    );
  }
}

export default ProjectPage;