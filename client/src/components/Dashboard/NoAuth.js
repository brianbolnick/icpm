import React, { Component } from 'react';
import DashboardCard from './DashboardCard'

class NoAuth extends Component {
  render() {

    const data = {
      id: "1",
      name: "University of Utah",
      imp_package: "Premium",
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
          <div className="projects-title">Welcome to ICPM</div>
          <div className="projects-subtitle">Here's an example of what you'll see when you login.</div>
        </div>
        <div className="main-container">
          {cards}
        </div>
      </div>
    );
  }
}

export default NoAuth;