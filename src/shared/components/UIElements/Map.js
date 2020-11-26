import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "./Map.css";
mapboxgl.accessToken =
  "pk.eyJ1IjoieW91c3NlZnBhc2hhIiwiYSI6ImNraHo5MnRkbTBkOGEyenFoazgwMW8yM3UifQ.cJ7c1h0Ii_JsyZYPsSG1rQ";

const Map = (props) => {
  const mapContainerRef = useRef(null);
  console.log(props.center);
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: props.center,
      zoom: props.zoom,
    });

    map.addControl(new mapboxgl.NavigationControl(), "bottom-right");

    return () => map.remove();
  }, [props.center, props.zoom]);
  return (
    <div
      className={`map-container ${props.className}`}
      style={props.style}
      ref={mapContainerRef}
    />
  );
};

export default Map;
