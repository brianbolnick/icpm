import React, { Component } from 'react';
import { Sidebar, Segment, Button, Menu, Image, Icon, Header, Popup } from 'semantic-ui-react'
import { Link } from "react-router-dom";
import Logo from '../img/impl-logo.png'
import 'react-tippy/dist/tippy.css';
import { Tooltip } from 'react-tippy';
import HomeContent from './HomeContent'


class Content extends Component {
  render() {
    return (
      <div>
          <div className="menu-nav" >
              <div className="menu-nav-item"><Link to='/'>LOGIN</Link></div>
          </div>
      </div>
    );
  }
}

export default Content;