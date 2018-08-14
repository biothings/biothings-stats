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
          <Link className="logo" to="/">BioThings Stats</Link>
          <div className="header-right">
            {/* <Link className="" to='/'>Home</Link>
            <Link className="" to='/marco'>Link</Link> */}
            <Login/>
          </div>
        </nav>
      </header>
    );
  }
}
