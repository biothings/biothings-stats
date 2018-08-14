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
        	{!this.props.user.name && <div> <CustomGoogleLogin tag="a" text='login' />
            <svg version="1.1" x="0px" y="0px" width="40px" height="40px"
             viewBox="0 0 40 40" style={{enableBackground:"new 0 0 40 40"}}>
            <path fill="#006E99" d="M28,40H12C5.4,40,0,34.6,0,28V12C0,5.4,5.4,0,12,0h16c6.6,0,12,5.4,12,12v16C40,34.6,34.6,40,28,40z"/>
            <g>
            <g>
              <polygon fill="#FFFFFF" points="22.4,15.8 17.2,15.8 14.5,20.4 17.2,24.9 22.4,24.9 25.1,20.4 		"/>
            </g>
            <g>
              <polygon fill="#FFFFFF" points="22.4,5.8 17.2,5.8 14.5,10.3 17.2,14.9 22.4,14.9 25.1,10.3 		"/>
            </g>
            <g>
              <polygon fill="#FFFFFF" points="22.4,25.9 17.2,25.9 14.5,30.4 17.2,35 22.4,35 25.1,30.4 		"/>
            </g>
            <g>
              <polygon fill="#FFFFFF" points="13.3,10.8 8.1,10.8 5.4,15.3 8.1,19.9 13.3,19.9 16,15.3 		"/>
            </g>
            <g>
              <polygon fill="#FFFFFF" points="13.3,20.8 8.1,20.8 5.4,25.4 8.1,30 13.3,30 16,25.4 		"/>
            </g>
            <g>
              <polygon fill="#FFFFFF" points="31.4,10.8 26.1,10.8 23.5,15.3 26.1,19.9 31.4,19.9 34,15.3 		"/>
            </g>
            <g>
              <polygon fill="#FFFFFF" points="31.4,20.8 26.1,20.8 23.5,25.4 26.1,30 31.4,30 34,25.4 		"/>
            </g>
            </g>
            </svg>
          </div>}
        	{this.props.user.name && <div> <CustomGoogleLogout tag="a" text='logout' onLogoutSuccess={this.handleLogout}/>
            <svg version="1.1" x="0px" y="0px" width="40px" height="40px"
             viewBox="0 0 40 40" style={{enableBackground:"new 0 0 40 40"}} >
            <path fill="#f05635" d="M28,40H12C5.4,40,0,34.6,0,28V12C0,5.4,5.4,0,12,0h16c6.6,0,12,5.4,12,12v16C40,34.6,34.6,40,28,40z"/>
            <g>
            <g>
              <polygon fill="#FFFFFF" points="22.4,15.8 17.2,15.8 14.5,20.4 17.2,24.9 22.4,24.9 25.1,20.4 		"/>
            </g>
            <g>
              <polygon fill="#FFFFFF" points="22.4,5.8 17.2,5.8 14.5,10.3 17.2,14.9 22.4,14.9 25.1,10.3 		"/>
            </g>
            <g>
              <polygon fill="#FFFFFF" points="22.4,25.9 17.2,25.9 14.5,30.4 17.2,35 22.4,35 25.1,30.4 		"/>
            </g>
            <g>
              <polygon fill="#FFFFFF" points="13.3,10.8 8.1,10.8 5.4,15.3 8.1,19.9 13.3,19.9 16,15.3 		"/>
            </g>
            <g>
              <polygon fill="#FFFFFF" points="13.3,20.8 8.1,20.8 5.4,25.4 8.1,30 13.3,30 16,25.4 		"/>
            </g>
            <g>
              <polygon fill="#FFFFFF" points="31.4,10.8 26.1,10.8 23.5,15.3 26.1,19.9 31.4,19.9 34,15.3 		"/>
            </g>
            <g>
              <polygon fill="#FFFFFF" points="31.4,20.8 26.1,20.8 23.5,25.4 26.1,30 31.4,30 34,25.4 		"/>
            </g>
            </g>
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
