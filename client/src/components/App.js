import React, { Component } from 'react';
import '../css/App.css';
import HomePage from './HomePage.js'
import ProjectsPage from './ProjectsPage.js'
import TasksPage from './TasksPage.js'
import ResourcesPage from './ResourcesPage.js'
import SettingsPage from './SettingsPage.js'
import LoginPage from './Login.js'
import SignUpPage from './SignUp.js'
import NotFound from './NotFound.js'
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Route, withRouter, Switch } from "react-router-dom";

class App extends Component {
  render() {
    const currentKey = this.props.location.pathname.split("/")[1] || "/";
    const timeout = { enter: 300, exit: 200 };
    return (
      <TransitionGroup component="main" className="page-main" style={{ height: '100%' }}>
        <CSSTransition
          key={currentKey}
          timeout={timeout}
          classNames="fade"
          appear
        >
          <Switch location={this.props.location}>
            <Route path="/" exact component={HomePage} />
            <Route path="/projects" exact component={ProjectsPage} />
            <Route path="/projects/:project_id" component={ProjectsPage} />
            <Route path="/tasks" exact component={TasksPage} />
            <Route path="/resources" exact component={ResourcesPage} />
            <Route path="/settings" exact component={SettingsPage} />
            <Route path="/signup" exact component={SignUpPage} />
            <Route path="/login" exact component={LoginPage} />
            <Route component={NotFound} />
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    );
  }
}

export default withRouter(App);