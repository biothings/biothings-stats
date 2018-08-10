import React from 'react';

export default class Test extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      something: 'Marco'
    }
    this.myFunc = this.myFunc.bind(this);
  }

  myFunc(arg){

  	this.setState({
  		something : 'Conor'
  	});

  }

  render() {
    return (
      <div className="" style={{padding: '20px', margin: '0 auto'}}>
        <h1>Routing Works</h1>
      </div>
    );
  }
}
