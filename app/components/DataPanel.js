import React, { PropTypes } from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import {googleGetAuthResponse} from 'react-google-oauth'
import Map from './Map';
import CountUp from 'react-countup';


//client ID and secret
//166215448370-ktio5nb4uhrduq8sf9a8v4lud9e81es7.apps.googleusercontent.com
//HuF8k0pmmWgW-o5IfLlXJMQt

// var options = {
//       useEasing: true,
//       useGrouping: true,
//       separator: ',',
//       decimal: '.',
//     };
//     var demo = new CountUp('testNum', 0, sessionsCount, 0, 2.5, options);
//     if (!demo.error) {
//         demo.start();
//     } else {
//         console.error(demo.error);
//     }

class DataPanel extends React.Component {

  constructor(props) {
    super(props);
    this.state={
        realtimeApiURL : 'https://www.googleapis.com/analytics/v3/data/realtime?ids=ga:',
        analyticsApiURL : 'https://www.googleapis.com/analytics/v3/data/ga?ids=ga:',
        options : '&start-date=30daysAgo&end-date=yesterday&metrics=rt:activeUsers&dimensions=rt:userType',
        mygeneViewID : '51012565',
        apiOptions : '',
        activeUsers: 0,
        totalUsers: 0,
        results:[],
        lastActiveUsers:0
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
        activeUsers: parseInt(res.data.totalsForAllResults['rt:activeUsers'])
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
      // console.log(res.data);
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

  componentDidMount(){
    var self = this;
    if (this.props.user.name) {
      this.fetchRealTimeData();
      this.fetchAnalyticsData();
      var timer =setInterval(function(){
        console.log('mygene timer');
        self.setState({
          lastActiveUsers: self.state.activeUsers
        })
        self.fetchRealTimeData()
      }, 5000);
    }
  }

  componentWillUnmount(){
    // clearInterval(timer);
  }

  render() {
    return (
      <section className="margin0Auto padding20 centerText" style={{ background:'#215a9d'}}>
        <img src="img/mygene.svg" width="300px"/>
        <hr/>
        <button disabled={this.props.user.name ? false : true} className={"btn " + (this.props.user.name ? 'btn-blue' : 'btn-grey') } onClick={this.fetchRealTimeData}>Get Data</button>
        <hr/>
        {/* <CountUp  className="account-balance"
                  start={0}
                  end={this.state.totalUsers}
                  duration={3}
                  separator=","/> */}
        <h2 className="whiteText">Active Users Right Now</h2>
        {this.state.activeUsers &&
          <CountUp  className="whiteText activeUsers-MyGene"
                    start={this.state.lastActiveUsers}
                    end={this.state.activeUsers}
                    duration={3}
                    separator=","/>
        }
        <h2 className="whiteText">Requests in the last 30 days</h2>
        {/* <h1 className="whiteText">{this.state.totalUsers}</h1> */}
        {this.state.totalUsers &&
          <CountUp  className="whiteText"
                    style={{fontSize:'3em'}}
                    start={0}
                    end={this.state.totalUsers}
                    duration={3}
                    separator=","/>
        }
        <table style={{margin:'auto'}}>
          <thead>
            <th className="whiteText">Country</th>
            <th className="whiteText">Lat</th>
            <th className="whiteText">Long</th>
            <th className="whiteText">Page</th>
            <th className="whiteText">Users</th>
            <th className="whiteText">Sessions</th>
          </thead>
          {this.state.results.map( (item, index)=>{
            return(
              <tr key={index}>
                <td className="whiteText"> {item[0]} </td>
                <td className="whiteText"> {item[1]} </td>
                <td className="whiteText"> {item[2]} </td>
                <td className="whiteText"> {item[3]} </td>
                <td className="whiteText"> {item[4]} </td>
                <td className="whiteText"> {item[5]} </td>
              </tr>
            )
          })}
        </table>
        <hr/>
        <Map/>
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
