import React from 'react';
import {Link} from 'react-router-dom';
import Login from './Login.js';

export default class Nav extends React.Component {

  constructor(props) {
    super(props);
    this.state={

    }
    this.myFunc = this.myFunc.bind(this);
  }

  myFunc(arg){

  }

  render() {
    return (
      <header>
        <nav className="header">
          <Link className="logo" to="/">
            <img src='img/biostats.svg' width="100px"/>
          </Link>
          <div className="header-right">
            <Login/>
          </div>
        </nav>      
      </header>
    );
  }
}
