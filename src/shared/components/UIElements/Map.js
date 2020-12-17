import * as React from "react";
import { Component } from "react";
import ReactMapGL, { GeolocateControl } from "react-map-gl";

export default class Map extends Component {
  state = {
    viewport: { longitude: this.props.center.lng, latitude: this.props.center.lat, zoom: 14 },
  };

  render() {
    const { viewport } = this.state;
    return (
      <ReactMapGL
      {...viewport}
        mapboxApiAccessToken="pk.eyJ1IjoieW91c3NlZnBhc2hhIiwiYSI6ImNraHo5MnRkbTBkOGEyenFoazgwMW8yM3UifQ.cJ7c1h0Ii_JsyZYPsSG1rQ"
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
