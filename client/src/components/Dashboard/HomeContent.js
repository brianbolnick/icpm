import React, { Component } from 'react';
import DashboardCard from './DashboardCard'

class Content extends Component {
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
      cardArr.push(<DashboardCard data={data} key={i}/>);
    }

    const cards = cardArr.map((card) => {
      return card;
    })

    return (
      <div>
        <div className="dashboard-title" >
          <div className="projects-title">Implementation Projects</div>
          <div className="projects-subtitle">23 Active</div>
        </div>
        <div className="main-container">
          {cards}
        </div>
      </div>
    );
  }
}

export default Content;