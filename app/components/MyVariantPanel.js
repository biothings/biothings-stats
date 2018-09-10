import React, { PropTypes } from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import {googleGetAuthResponse} from 'react-google-oauth'
import Map from './Map';
import CountUp from 'react-countup';
import Chart from './Chart';


//client ID and secret
//166215448370-ktio5nb4uhrduq8sf9a8v4lud9e81es7.apps.googleusercontent.com
//HuF8k0pmmWgW-o5IfLlXJMQt


class MyVariantPanel extends React.Component {

  constructor(props) {
    super(props);
    this.state={
        realtimeApiURL : 'https://www.googleapis.com/analytics/v3/data/realtime?ids=ga:',
        analyticsApiURL : 'https://www.googleapis.com/analytics/v3/data/ga?ids=ga:',
        options : '&start-date=30daysAgo&end-date=yesterday&metrics=rt:activeUsers&dimensions=rt:userType',
        viewID : '101990787',
        apiOptions : '',
        activeUsers: 0,
        totalUsers: 0,
        results:[],
        lastActiveUsers:0,
        mapData:[],
        pages: [],
        activeUsersHistory:[],
        timer: null,
        devices:[]
    }
    this.fetchRealTimeData = this.fetchRealTimeData.bind(this);
    this.fetchAnalyticsData = this.fetchAnalyticsData.bind(this);
    this.shapeData = this.shapeData.bind(this);
    this.shapeMapData = this.shapeMapData.bind(this);
    this.getUniqueItemsInTopPages = this.getUniqueItemsInTopPages.bind(this);
    this.fetchDeviceData = this.fetchDeviceData.bind(this);
    this.shapeDevices = this.shapeDevices.bind(this);
    this.addComma = this.addComma.bind(this);
  }

  addComma(number){
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  fetchDeviceData(){
    let _authResp = googleGetAuthResponse();
    axios.get(
      this.state.analyticsApiURL
      + this.state.viewID
      +'&start-date=30daysAgo&end-date=yesterday'
      +'&metrics=ga:users'
      +'&dimensions=ga:deviceCategory'
      +'&sort=-ga:users'
      +'&max-results=10'
      + "&access_token="
      + _authResp.accessToken).then(res=>{

        if (res.data.rows) {
          this.shapeDevices(res.data.rows);
        }

      }).catch(err=>{
        throw err;
      })
  }

  shapeDevices(rows){
    let res =[];

    for (var i = 0; i < rows.length; i++) {
      switch (rows[i][0]) {
        case 'desktop':
          res.push({'name':rows[i][0],'users': this.addComma(rows[i][1]),'image':'img/desktop.svg'})
          break;
        case 'tablet':
          res.push({'name':rows[i][0],'users': this.addComma(rows[i][1]),'image':'img/tablet.svg'})
          break;
        case 'mobile':
          res.push({'name':rows[i][0],'users': this.addComma(rows[i][1]),'image':'img/mobile.svg'})
          break;
        default:

      }
    }
    this.setState({
      'devices': res
    })
  }

  getUniqueItemsInTopPages(list){
    let pages =[]

    for (var i = 0; i < this.state.results.length; i++) {
      if (this.state.results[i][5] === '/') {
        this.state.results[i][5] = 'myvariant.info/'
      }
      pages.push(this.state.results[i][5])
    }

    pages = pages.filter((x, i, a) => a.indexOf(x) == i)

    this.setState({
      'pages': pages
    })

  }

  fetchRealTimeData(){
    let _authResp = googleGetAuthResponse();
    axios.get(
        this.state.realtimeApiURL
      + this.state.viewID
      + this.state.options
      + "&access_token="
      + _authResp.accessToken).then(res=>{
      let users = parseInt(res.data.totalsForAllResults['rt:activeUsers']);
      this.setState({
        activeUsers: users
      });

      //creates data for Chart, max length is 10
      this.state.activeUsersHistory.push(users)
      if (this.state.activeUsersHistory.length > 10) {
        this.state.activeUsersHistory.shift();
      }

    }).catch(err=>{
      throw(err);
    })

    this.fetchAnalyticsData();

  }

  fetchAnalyticsData(){
    let _authResp = googleGetAuthResponse();
    axios.get(
      this.state.analyticsApiURL
      + this.state.viewID
      +'&start-date=30daysAgo&end-date=yesterday'
      +'&metrics=ga:users,ga:sessions'
      +'&dimensions=ga:country,ga:region,ga:city,ga:latitude,ga:longitude,ga:pagePath'
      +'&sort=-ga:users'
      +'&max-results=10'
      + "&access_token="
      + _authResp.accessToken).then(res=>{
      this.shapeData(res.data)
    }).catch(err=>{
      throw err;
    })
  }


  shapeData(data){
    if (data.totalsForAllResults['ga:users']) {
      this.setState({
        totalUsers: data.totalsForAllResults['ga:users']
      })
    }
    if (data.rows) {
      this.shapeMapData();
      this.getUniqueItemsInTopPages();
      this.setState({
        results: data.rows
      })
    }
  }

  shapeMapData(){
    let res =[]
    let arr = this.state.results;
    for (var i = 0; i < arr.length; i++) {
      let long = parseFloat(arr[i][3]);
      let lat = parseFloat(arr[i][4]);
      let obj ={'name': arr[i][2]+', '+arr[i][1]+', '+arr[i][0],'coordinates':[lat,long],'users': arr[i][6] };
      res.push(obj);
    }
    this.setState({
      'mapData': res
    });
    this.props.sendMapData(this.state.mapData);
  }

  componentDidMount(){
    var self = this;
    if (this.props.user.name) {
      this.fetchRealTimeData();
      this.fetchDeviceData();
      this.fetchAnalyticsData();
      this.timer =setInterval(function(){
        self.setState({
          lastActiveUsers: self.state.activeUsers
        })
        self.fetchRealTimeData()
      }, 10000);
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    this.props.sendMapData([]);
  }

  render() {
    return (
      <section className="margin0Auto padding20 centerText mV-back">
        <img src="img/myvariant-text.png" width="300px" className="margin20"/>
        <button style={{position:'absolute', right:'20px'}} disabled={this.props.user.name ? false : true} className={"btn " + (this.props.user.name ? 'btn-green' : 'btn-grey') } onClick={this.fetchRealTimeData}>Refresh</button>
        <div className="activeUsersBoxTest margin20 flex" style={{width:'50%', margin:'auto'}}>
          <div style={{flex:1}}>
            <h2 className="whiteText">Active Users Right Now</h2>
            <CountUp  className="whiteText activeUsers-MyVariant"
                        start={this.state.lastActiveUsers}
                        end={this.state.activeUsers}
                        duration={3}
                        separator=","/>
          </div>
          <Chart chartData={this.state.activeUsersHistory}/>
        </div>
        <br/>
        <table className='deviceContainer'>
          <tbody>
            <tr className="device">
              <td>
                Top 3 Devices
              </td>
            </tr>
            {this.state.devices.map( (device,index)=>{
              return(
                <tr className="device" key={index}>
                  <td>
                    <img src={device.image} alt={device.name} width='25px'/>
                  </td>
                  <td>
                    {device.users} users
                  </td>
                </tr>
              )
            })}
        </tbody>
        </table>
        <br/>
          {this.state.pages.length &&
            <table style={{margin:'auto'}} className="pagesTable">
              <thead className='margin20'>
                <th className="whiteText bold">
                  Top Pages Visited
                </th>
                {this.state.pages.map( (page,i)=>{
                  return (
                    <th key={i}>
                      { page }
                    </th>
                  )
                })}
              </thead>
            </table>
          }
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
    sendMapData: (value)=>{
      const action = {type: "UPDATE-MAP", payload: value};
      dispatch(action);
    }
  }
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(MyVariantPanel)
