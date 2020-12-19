import * as React from "react";
import { Component } from "react";
import ReactMapGL, { GeolocateControl } from "react-map-gl";

let secretKey = process.env.REACT_APP_MAP_BOX_SECRET_KEY;

export default class Map extends Component {
  state = {
    viewport: {
      longitude: this.props.center.lng,
      latitude: this.props.center.lat,
      zoom: 14,
    },
  };

  render() {
    const { viewport } = this.state;
    return (
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={secretKey}
        width="100vw"
        height="100vh"
        onViewportChange={(viewport) => this.setState({ viewport })}
      >
        <GeolocateControl
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
        />
      </ReactMapGL>
    );
  }
}
