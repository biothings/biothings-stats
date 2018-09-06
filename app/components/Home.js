import React, { PropTypes } from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux'
import axios from 'axios';
import MyGenePanel from './MyGenePanel';
import MyVariantPanel from './MyVariantPanel';
import MyChemPanel from './MyChemPanel';
import BioThingsPanel from './BioThingsPanel';
import Welcome from './Welcome';

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
      case '4':
          this.setState({
            display: 'BioThings'
          })
        break;
      default:
        this.setState({
          display: ''
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
        {this.props.user.name && !this.state.display &&
          <nav className="toggleNav">
              <Link onClick={()=>{this.handleKeyPressed('')}} className="bg-white" to='#'>Home</Link>
              <Link onClick={()=>{this.handleKeyPressed('1')}} className="mG whiteText" style={{margin:'3px'}} to='#'>MyGene (key 1)</Link>
              <Link onClick={()=>{this.handleKeyPressed('2')}} className="mV whiteText" style={{margin:'3px'}} to='#'>MyVariant (key 2)</Link>
              <Link onClick={()=>{this.handleKeyPressed('3')}} className="mC whiteText" style={{margin:'3px'}} to='#'>MyChem (key 3)</Link>
              <Link onClick={()=>{this.handleKeyPressed('4')}} className="mB whiteText" style={{margin:'3px'}} to='#'>BioThings (key 4)</Link>
          </nav>
        }
        {!this.props.user.name &&
          <nav className="toggleNav" style={{background:'#ffe68f', color:'#934d3e'}}>
            <p style={{textAlign:'center', width:'100%'}}>You must be logged in to view realtime data</p>
          </nav>
        }
        {this.state.display === 'MyGene' && <MyGenePanel/>}
        {this.state.display === 'MyVariant' && <MyVariantPanel/>}
        {this.state.display === 'MyChem' && <MyChemPanel/>}
        {this.state.display === 'BioThings' && <BioThingsPanel/>}
        {!this.state.display && <Welcome/>}
      </section>
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
    onTestClick: (value)=>{
      const action = {type: "TEST", payload: value};
      dispatch(action);
    }
  }
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(Home)
