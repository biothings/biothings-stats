import React, { PropTypes } from 'react';
import { connect } from 'react-redux'
import { geoAlbers } from "d3-geo"



class ReactMap extends React.Component {

  constructor(props) {
    super(props);
    this.state={

    }
  }


  render() {
    return (
      <div>
        <h1>Map</h1>

      </div>
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

  }
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(ReactMap)
