import React, { PropTypes } from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux'
import axios from 'axios';
import {GoogleAPI, GoogleLogin, GoogleLogout, CustomGoogleLogin, CustomGoogleLogout, googleGetBasicProfil, googleGetAuthResponse} from 'react-google-oauth'

// {
//   "type": "service_account",
//   "project_id": "mygene-212918",
//   "private_key_id": "d1b5f84f36ccd757d03e1775ef89ebbe64afe0b7",
//   "client_email": "mygenestats@mygene-212918.iam.gserviceaccount.com",
//   "client_id": "116692597700314801080",
//   "auth_uri": "https://accounts.google.com/o/oauth2/auth",
//   "token_uri": "https://oauth2.googleapis.com/token",
//   "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
//   "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/mygenestats%40mygene-212918.iam.gserviceaccount.com"
// }


//client ID and secret
//166215448370-ktio5nb4uhrduq8sf9a8v4lud9e81es7.apps.googleusercontent.com
//HuF8k0pmmWgW-o5IfLlXJMQt

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state={
        apiKey: 'AIzaSyDN7sQm-u2pynotVsbwHWJpzM8DfLCELzQ',
        realtimeApiURL : 'https://www.googleapis.com/analytics/v3/data/realtime?ids=ga:',
        analyticsApiURL : 'https://www.googleapis.com/analytics/v3/data/ga?ids=ga:',
        options : '&start-date=30daysAgo&end-date=yesterday&metrics=rt:activeUsers&dimensions=rt:userType',
        viewID : '51012565',
        apiOptions : '',
        user: {},
        activeUsers: '-',
        totalUsers: '-'
    }
    this.fetchRealTimeData = this.fetchRealTimeData.bind(this);
    this.fetchAnalyticsData = this.fetchAnalyticsData.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.shapeData = this.shapeData.bind(this);
  }

  fetchRealTimeData(){
    let _authResp = googleGetAuthResponse();
    axios.get(this.state.realtimeApiURL + this.state.viewID + this.state.options + "&access_token=" + _authResp.accessToken).then(res=>{
      var str = JSON.stringify(res.data, null, 2); // spacing level = 2
      // console.log(str);
      this.setState({
        activeUsers: res.data.totalsForAllResults['rt:activeUsers']
      });

    }).catch(err=>{
      throw(err);
    })

    this.fetchAnalyticsData();

  }

  fetchAnalyticsData(){
    axios.get(this.state.analyticsApiURL + this.state.viewID +'&start-date=30daysAgo&end-date=yesterday&metrics=ga:users'+ "&access_token=" + _authResp.accessToken).then(res=>{
      // console.log(res.data);
      this.shapeData(res.data)
    })
  }

  handleLogin(){
        const _user = googleGetBasicProfil();

        this.setState({
          user : _user,
        });

        console.log(this.state.user);
    }

  handleLogout(){
      console.log("logged out")
      window.location.reload();
  }

  shapeData(data){
    console.log(data)
    if (data.totalsForAllResults['ga:users']) {
      this.setState({
        totalUsers: data.totalsForAllResults['ga:users']
      })
    }
  }

  render() {
    return (
      <section className="" style={{padding: '20px', margin: '0 auto'}}>
        <hr/>
        <h1>Google Real-Time API</h1>
        <button disabled={this.state.user.name ? false : true} className={"btn " + (this.state.user.name ? 'btn-blue' : 'btn-grey') } onClick={this.fetchRealTimeData}>Test Google Real-Time API</button>
        <hr/>
        <h2>MyGene.info Active Users: {this.state.activeUsers}</h2>
        <h2>MyGene.info Total Users: {this.state.totalUsers}</h2>
        <hr/>
        <GoogleAPI className="btn btn-blue"
          clientId='166215448370-ktio5nb4uhrduq8sf9a8v4lud9e81es7.apps.googleusercontent.com'
          scope='https://www.googleapis.com/auth/analytics'
          prompt="consent"
          onUpdateSigninStatus={this.handleLogin}
        >
        <div>
        	{!this.state.user.name && <div> <GoogleLogin /> </div>}
        	{this.state.user.name && <div> <GoogleLogout onLogoutSuccess={this.handleLogout}/> </div>}
    		</div>
        </GoogleAPI>
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    something : state.something
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onTestClick: (value)=>{
      const action = {type: "TEST", payload: value};
      dispatch(action);
    }
  }
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(Home)
