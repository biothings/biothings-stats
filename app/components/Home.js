import React, { PropTypes } from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux'
import axios from 'axios';
import Google from './Google';

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      test: 'new value',
      apiRes: ''
    }
    this.testApi = this.testApi.bind(this);
  }

  testApi(){
    axios.get('/api/test').then(res=>{
      // console.log("response",res);
      this.setState({
        apiRes: res.data.test
      })
    }).catch(err=>{
      throw(err);
    })
  }

  render() {
    return (
      <section className="" style={{padding: '20px', margin: '0 auto'}}>
        <h1>Redux</h1>
        <button onClick={()=>{this.props.onTestClick(this.state.test)}}>Test Redux Store</button>
        <p>VALUE OF 'SOMETHING': {this.props.something}</p>
        <hr/>
        <button onClick={this.testApi}>Test API route</button>
        <p>API response:</p>
        <p>{this.state.apiRes}</p>
        <Google/>
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
