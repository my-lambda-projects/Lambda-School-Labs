import React from "react";
import GoogleMapReact from "google-map-react";
import PropTypes from "prop-types";

const style = {
  height: "40px",
  width: "40px",
  position: "absolute",
  transform: "translate(-50%, -50%)"
};
const Marker = () => (
  <img style={style} src="https://i.imgur.com/Lsk9eVr.png" alt="" />
);
const Map = props => {
  const {
    mapOpacity,
    center,
    zoom,
    MarkerCreated,
    addMarker,
    newMarkersArr,
    lat,
    lng
  } = props;
  return (
    <div
      className="tripCreateMap"
      style={{
        opacity: mapOpacity
      }}
    >
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyCj6JgxqozDSyHp0IF-q9QeieiYu8I4OPw" }}
        defaultCenter={center}
        defaultZoom={zoom}
        onClick={event => {
          if (MarkerCreated) {
            addMarker(event);
          }
        }}
      >
        <Marker lat={lat} lng={lng} />

        {newMarkersArr.map(markers => (
          <Marker key={markers.lat} lat={markers.lat} lng={markers.lng}>
            {markers.lat}, {markers.lng}
          </Marker>
        ))}
      </GoogleMapReact>
    </div>
  );
};
Map.defaultProps = {
  center: {
    lat: 46.9282,
    lng: -121.5045
  },
  zoom: 12,
  lat: 46.9282,
  lng: -121.5045
};
Map.propTypes = {
  mapOpacity: PropTypes.number.isRequired,
  MarkerCreated: PropTypes.bool.isRequired,
  addMarker: PropTypes.func.isRequired,
  newMarkersArr: PropTypes.instanceOf(Array).isRequired,
  lat: PropTypes.number,
  lng: PropTypes.number,
  center: PropTypes.instanceOf(Object),
  zoom: PropTypes.number
};
export default Map;
