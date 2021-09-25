import React, {useState} from 'react';
import {Map, GoogleApiWrapper, Marker, InfoWindow} from 'google-maps-react';
import PropTypes from 'prop-types';

const MapContainer = (props) => {

  const [showingInfoWindow, setShowing] = useState(false);
  const [activeMarker, setActiveMarker] = useState();
  const [place, setPlace] = useState({});
  
  const onMarkerClick = (props, marker, e) => {
    
    setPlace(props);
    setActiveMarker(marker);
    setShowing(true);
  };
  
  const onClose = props => {
    
    setActiveMarker(null);
    setShowing(false);
  };
  
  const defaultMapStyles = {
    width: '100%',
    height: '100%',
  };

  return (
    <div style={{
      position: 'relative',
      width: props.width || '500px',
      height: props.height || '500px',
    }}>
      <Map google={props.google}
           zoom={props.zoom || 12}
           style={props.mapStyles || defaultMapStyles}
           initialCenter={{lat: props.lat, lng: props.lng}}
      >
        {props.markers && props.markers.map(marker => {
          return <Marker onClick={onMarkerClick} title={marker.title}
                         name={marker.name}
                         position={marker.position}/>;
        })}
        <InfoWindow
          marker={activeMarker}
          visible={showingInfoWindow}
          onClose={onClose}
        >
          <div>
            <h6>Name: {place && place.name}</h6>
            {place.address && <p>Address: {place && place.address}</p>}
          </div>
        </InfoWindow>
      </Map>
    </div>
  );
};

MapContainer.propTypes = {
  mapStyles: PropTypes.object,
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
  zoom: PropTypes.number,
  width: PropTypes.string,
  height: PropTypes.string,
  marginLeft: PropTypes.string,
  
  markers: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    
    position: PropTypes.shape({
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired,
    }),
  })),
};

export default GoogleApiWrapper(
  props => ({apiKey: process.env.REACT_APP_apiKey}))(
  MapContainer);