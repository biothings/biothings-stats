import React, { PropTypes } from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux'
import axios from 'axios';
import DataPanel from './DataPanel';

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
        <DataPanel/>
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
