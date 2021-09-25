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
const MapContainer = props => {
  const { center, zoom, markers } = props;
  return (
    <div className="tripOpenMap">
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyCj6JgxqozDSyHp0IF-q9QeieiYu8I4OPw" }}
        defaultCenter={center}
        defaultZoom={zoom}
      >
        {markers.map(marks => (
          <Marker key={marks.lat} lat={marks.lat} lng={marks.lng}>
            {marks.lat}, {marks.lng}
          </Marker>
        ))}
      </GoogleMapReact>
    </div>
  );
};
MapContainer.propTypes = {
  markers: PropTypes.instanceOf(Array).isRequired,
  center: PropTypes.instanceOf(Object),
  zoom: PropTypes.number
};
MapContainer.defaultProps = {
  center: {
    lat: 46.9282,
    lng: -121.5045
  },
  zoom: 12
};
export default MapContainer;
