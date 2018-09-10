import React, { PropTypes } from 'react';
import { connect } from 'react-redux'
import { geoMercator, geoPath } from "d3-geo/src"
import { feature } from "topojson-client"


class ReactMap extends React.Component {
  constructor() {
    super()
    this.state = {
      worlddata: [],
      cities: [],
      hoverInfo:'Top 10 Users'
    }

    this.handleCountryClick = this.handleCountryClick.bind(this)
    this.handleMarkerHover = this.handleMarkerHover.bind(this)
    this.colorMarker = this.colorMarker.bind(this)
    this.sizeMarker = this.sizeMarker.bind(this)
    this.addComma = this.addComma.bind(this)
  }
  addComma(number){
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  colorMarker(users){
    if ( users > 900000) {
      return '#fe5252';
    }else if (users < 900000 && users > 400000 ) {
      return '#fb993e';
    }else if (users < 400000 && users > 100000 ) {
      return '#fbd758';
    }else{
      return '#f7f49c';
    }
  }
  sizeMarker(users){
    if ( users > 900000) {
      return 10;
    }else if (users < 900000 && users > 400000 ) {
      return 8;
    }else if (users < 400000 && users > 100000 ) {
      return 6;
    }else{
      return 4;
    }
  }
  projection() {
    return geoMercator()
      .scale(100)
      .translate([ 800 / 2, 450 / 2 ])
  }
  handleCountryClick(countryIndex) {
    // console.log("Clicked on country: ", this.state.worlddata[countryIndex])
  }
  handleMarkerHover(markerIndex) {
    this.setState({
      'hoverInfo': this.props.mapData[markerIndex].name + ": "+this.addComma(this.props.mapData[markerIndex].users)+" users"
    })
  }
  componentDidMount() {
    fetch("https://unpkg.com/world-atlas@1/world/110m.json")
      .then(response => {
        if (response.status !== 200) {
          console.log(`There was a problem: ${response.status}`)
          return
        }
        response.json().then(worlddata => {
          this.setState({
            worlddata: feature(worlddata, worlddata.objects.countries).features,
          })
        })
      })

  }

  render() {
    return (
      <div className="flex" style={{width:'70%', margin:'auto'}}>
        <div className="padding20" style={{flex:1}}>
          <table style={{margin:'auto'}} className='mapTable'>
            <tbody>
              {this.props.mapData.map( (city,i)=>{
                return (
                  <tr key={i}>
                    <td style={{padding:'5px 10px', borderRadius:'10px'}}>
                      <span className={this.sizeMarker(city.users) > 7 ?'bold twoEM': 'bold'} style={{color: this.colorMarker(city.users), textShadow:'2px 2px black' }}>{ this.addComma(city.users) }</span>
                      <br/>
                      <b style={{fontSize:'10px'}} className="whiteText">{city.name}</b>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <div className="padding20" style={{flex:4}}>
          <h3 className="whiteText bold mapHoverInfo">{this.state.hoverInfo}</h3>
          <svg className='mapBox' width={ 800 } height={ 450 } viewBox="0 0 800 450">
            <g className="countries">
              {
                this.state.worlddata.map((d,i) => (
                  <path
                    key={ `path-${ i }` }
                    d={ geoPath().projection(this.projection())(d) }
                    className="country"
                    fill={ `rgba(38,50,56,0.4)` }
                    stroke="#FFFFFF"
                    strokeWidth={ 0.5 }
                    onClick={ () => this.handleCountryClick(i) }
                  />
                ))
              }
            </g>
            <g className="markers">
              {
                this.props.mapData.map((city, i) => (
                  <circle
                    key={ `marker-${i}` }
                    cx={ this.projection()(city.coordinates)[0] }
                    cy={ this.projection()(city.coordinates)[1] }
                    r={ this.sizeMarker(city.users) }
                    fill={ this.colorMarker(city.users) }
                    stroke="#FFFFFF"
                    className="marker"
                    onMouseEnter={ () => this.handleMarkerHover(i) }
                    onMouseLeave={()=>{this.setState({'hoverInfo':'Top 10 Users'})}}
                  />
                ))
              }
            </g>
          </svg>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    'mapData' : state.mapData
  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(ReactMap)
