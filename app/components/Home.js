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
      apiRes: '',
      display: ''
    }
    this.testApi = this.testApi.bind(this);
    this.handleKeyPressed = this.handleKeyPressed.bind(this);
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

  handleKeyPressed(key){
    switch (key) {
      case '1':
          this.setState({
            display: 'MyGene'
          })
        break;
      case '2':
          this.setState({
            display: 'MyVariant'
          })
        break;
      case '3':
          this.setState({
            display: 'MyChem'
          })
        break;
      default:
        this.setState({
          display: 'BioThings'
        })
    }
    console.log(this.state.display)
  }

  componentDidMount(){
    var self = this;
    document.onkeypress = function (e) {
      e = e || window.event;
      console.log('Key Pressed', e.key);
      self.handleKeyPressed(e.key);
    };
  }

  render() {
    return (
      <section className="margin0Auto" >
        <nav className="header" style={{background:'#676767'}}>
            <Link className="" to='#'>MyGene</Link>
            <Link className="" to='#'>MyVariant</Link>
        </nav>
        {this.state.display === 'MyGene' && <DataPanel/>}
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
