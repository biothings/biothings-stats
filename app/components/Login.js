import React, { PropTypes } from 'react';
import { connect } from 'react-redux'
import {GoogleAPI, GoogleLogin, GoogleLogout, CustomGoogleLogin, CustomGoogleLogout, googleGetBasicProfil, googleGetAuthResponse} from 'react-google-oauth'


class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state={
        user: {}
    }
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogin(){
      const _user = googleGetBasicProfil();
      this.props.userUpdate(_user);
    }

  handleLogout(){
      console.log("logged out")
      this.props.userLogout();
      window.location.reload();
  }


  render() {
    return (
        <GoogleAPI className="btn btn-blue"
          clientId='166215448370-ktio5nb4uhrduq8sf9a8v4lud9e81es7.apps.googleusercontent.com'
          scope='https://www.googleapis.com/auth/analytics'
          prompt="consent"
          onUpdateSigninStatus={this.handleLogin}
        >
        <div>
        	{!this.props.user.name && <div id='loginbtn'> <CustomGoogleLogin tag="a" text='login' />
          <svg version="1.1" id="Layer_1" x="0px" y="0px" width="40px" height="40px"
           viewBox="0 0 40 40" style={{enableBackground:"new 0 0 40 40"}}>
            <g fill='#414141'>
            <circle cx="20" cy="20" r="17"/>
            </g>
            <polygon fill='#85e849' points="25.8,10 14.2,10 8.5,20 14.2,30 25.8,30 31.5,20 "/>
          </svg>
          </div>}
        	{this.props.user.name && <div id='logoutbtn'> <CustomGoogleLogout tag="a" text={'logout '+ this.props.user.givenName} onLogoutSuccess={this.handleLogout}/>
          <svg version="1.1" id="Layer_1" x="0px" y="0px" width="40px" height="40px"
           viewBox="0 0 40 40" style={{enableBackground:"new 0 0 40 40"}}>
            <g fill='#414141'>
            <circle cx="20" cy="20" r="17"/>
            </g>
            <polygon fill='#f06060' points="25.8,10 14.2,10 8.5,20 14.2,30 25.8,30 31.5,20 "/>
          </svg>
          </div>}
    		</div>
        </GoogleAPI>
    );
  }
}

function mapStateToProps(state) {
  return {
    user : state.user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    userUpdate: (value)=>{
      const action = {type: "USER-UPDATE", payload: value};
      dispatch(action);
    },
    userLogout: ()=>{
      const action = {type: "USER-LOGOUT"};
      dispatch(action);
    }
  }
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(Login)
