import React, { Component } from 'react';
import logo from '../img/logo.svg';
import '../css/App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">404</h1>
        </header>
        <p className="App-intro">
          Sorry, that page could not be found.
        </p>
      </div>
    );
  }
}

export default App;
