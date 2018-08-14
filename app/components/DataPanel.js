import React, { PropTypes } from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux'
import axios from 'axios';
import {googleGetAuthResponse} from 'react-google-oauth'


//client ID and secret
//166215448370-ktio5nb4uhrduq8sf9a8v4lud9e81es7.apps.googleusercontent.com
//HuF8k0pmmWgW-o5IfLlXJMQt

class DataPanel extends React.Component {

  constructor(props) {
    super(props);
    this.state={
        realtimeApiURL : 'https://www.googleapis.com/analytics/v3/data/realtime?ids=ga:',
        analyticsApiURL : 'https://www.googleapis.com/analytics/v3/data/ga?ids=ga:',
        options : '&start-date=30daysAgo&end-date=yesterday&metrics=rt:activeUsers&dimensions=rt:userType',
        mygeneViewID : '51012565',
        apiOptions : '',
        activeUsers: '-',
        totalUsers: '-',
        results:[]
    }
    this.fetchRealTimeData = this.fetchRealTimeData.bind(this);
    this.fetchAnalyticsData = this.fetchAnalyticsData.bind(this);
    this.shapeData = this.shapeData.bind(this);
  }

  fetchRealTimeData(){
    let _authResp = googleGetAuthResponse();
    axios.get(
        this.state.realtimeApiURL
      + this.state.mygeneViewID
      + this.state.options
      + "&access_token="
      + _authResp.accessToken).then(res=>{
      this.setState({
        activeUsers: res.data.totalsForAllResults['rt:activeUsers']
      });

    }).catch(err=>{
      throw(err);
    })

    this.fetchAnalyticsData();

  }

  fetchAnalyticsData(){
    let _authResp = googleGetAuthResponse();
    axios.get(
      this.state.analyticsApiURL
      + this.state.mygeneViewID
      +'&start-date=30daysAgo&end-date=yesterday'
      +'&metrics=ga:users,ga:sessions'
      +'&dimensions=ga:country,ga:latitude,ga:longitude,ga:pagePath'
      +'&sort=-ga:users'
      +'&max-results=10'
      + "&access_token="
      + _authResp.accessToken).then(res=>{
      console.log(res.data);
      this.shapeData(res.data)
    }).catch(err=>{
      throw err;
    })
  }


  shapeData(data){
    //console.log(data)
    if (data.totalsForAllResults['ga:users']) {
      this.setState({
        totalUsers: data.totalsForAllResults['ga:users']
      })
    }
    if (data.rows) {
      this.setState({
        results: data.rows
      })
    }
  }

  render() {
    return (
      <section className="" style={{padding: '20px', margin: '0 auto', textAlign:'center'}}>
        <img src="img/mygene.svg" width="300px"/>
        <h1>Google Real-Time API</h1>
        <button disabled={this.props.user.name ? false : true} className={"btn " + (this.props.user.name ? 'btn-blue' : 'btn-grey') } onClick={this.fetchRealTimeData}>Get Data</button>
        <hr/>
        <h2>MyGene.info Active Users: {this.state.activeUsers}</h2>
        <h2>MyGene.info Total Users: {this.state.totalUsers}</h2>
        <table style={{margin:'auto'}}>
          <thead>
            <th>Lat</th>
            <th>Long</th>
            <th>Page</th>
            <th>Users</th>
            <th>Sessions</th>
          </thead>
          {this.state.results.map( (item, index)=>{
            return(
              <tr key={index}>
                <td style={{padding: '20px'}}> {item[0]} </td>
                <td style={{padding: '20px'}}> {item[1]} </td>
                <td style={{padding: '20px'}}> {item[2]} </td>
                <td style={{padding: '20px'}}> {item[3]} </td>
                <td style={{padding: '20px'}}> {item[4]} </td>
              </tr>
            )
          })}
        </table>
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    //will make the user object from redux store available as props.user to this component
    user : state.user
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
)(DataPanel)
