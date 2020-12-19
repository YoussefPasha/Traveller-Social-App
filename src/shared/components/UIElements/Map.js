import * as React from "react";
import { Component } from "react";
import ReactMapGL, { NavigationControl } from "react-map-gl";

let secretKey = process.env.REACT_APP_MAP_BOX_SECRET_KEY;

export default class Map extends Component {
  state = {
    viewport: {
      longitude: this.props.center.lng,
      latitude: this.props.center.lat,
      zoom: 12,
    },
  };

  render() {
    const { viewport } = this.state;
    return (
      <ReactMapGL
        mapboxApiAccessToken={secretKey}
        {...viewport}
        width="100%"
        height="100%"
        onViewportChange={(viewport) => this.setState({ viewport })}
      >
        <div style={{ position: "absolute", right: 0 }}>
          <NavigationControl />
        </div>
      </ReactMapGL>
    );
  }
}
