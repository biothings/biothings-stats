import React, { PropTypes } from 'react';
import { connect } from 'react-redux'
import { SVGMap, USA } from 'react-svg-map';
import { geoAlbers } from "d3-geo"
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
} from "react-simple-maps"

const wrapperStyles = {
  width: "100%",
  maxWidth: 980,
  margin: "0 auto",
}

const geographyStyles = {
  fill: "#ECEFF1",
  stroke: "#607D8B",
  strokeWidth: 0.75,
  outline: "none",
}

const mapCenter = [8.3,46.8]

class ReactMap extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      cities: [
        { name: "Tokyo", coordinates: [139.6917,35.6895], population: 37843000 },
        { name: "Jakarta", coordinates: [106.8650,-6.1751], population: 30539000 },
        { name: "Delhi", coordinates: [77.1025,28.7041], population: 24998000 },
        { name: "Manila", coordinates: [120.9842,14.5995], population: 24123000 },
        { name: "Seoul", coordinates: [126.9780,37.5665], population: 23480000 },
        { name: "Shanghai", coordinates: [121.4737,31.2304], population: 23416000 },
        { name: "Karachi", coordinates: [67.0099,24.8615], population: 22123000 },
        { name: "Beijing", coordinates: [116.4074,39.9042], population: 21009000 },
        { name: "New York", coordinates: [-74.0059,40.7128], population: 20630000 },
        { name: "Guangzhou", coordinates: [113.2644,23.1291], population: 20597000 },
        { name: "Sao Paulo", coordinates: [-46.6333,-23.5505], population: 20365000 },
        { name: "Mexico City", coordinates: [-99.1332,19.4326], population: 20063000 }
      ]
    }
  }

  projection(width, height) {
    return geoAlbers()
      .rotate([0,0])
      .center([mapCenter[0], mapCenter[1]])
      .scale(14000)
      .translate([width / 2, height / 2])
  }


  render() {
    return (
      <div>
        <h1>Map</h1>
        <SVGMap map={USA} />
        {/* <ComposableMap
          projection={this.projection}
          width={980}
          height={551}
          style={{ width: "100%", height: "auto" }}
          >
          <ZoomableGroup
            center={[-mapCenter[0], -mapCenter[1]]}
            disablePanning
            >
            <Geographies geographyUrl="/img/test.json">
              {(geographies, projection) =>
                geographies.map((geography, i) =>
                  <Geography
                    key={i}
                    geography={geography}
                    projection={projection}
                    style={{
                      default: geographyStyles,
                      hover: geographyStyles,
                      pressed: geographyStyles,
                    }}
                  />
              )}
            </Geographies>
          </ZoomableGroup>
        </ComposableMap> */}
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
