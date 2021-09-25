import React, { Component } from 'react';
import Map from './Map';

//finds user location, requires approval from user
function getLocation (callback) {
  if (navigator.geolocation) {
    let lat_lng = navigator.geolocation.getCurrentPosition(function(position) {
      console.log(position);
      let user_position = {};
      user_position.lat = position.coords.latitude;
      user_position.lng = position.coords.longitude;
      callback(user_position)
    });
  }
    else {
      alert("Geolocation rejected or not supported by browser!");
    }
}


//for testing
getLocation(function(lat_lng) {
  console.log(lat_lng);
});
 
class MapPage extends Component {
  render() {
    return (
      <div>
        <Map
          id="myMap"
          options={{
            center: { lat: 41.0082, lng: 28.9784 },
            zoom: 8
          }}
          onMapLoad={map => {
            let marker = new window.google.maps.Marker({
              position: { lat: 41.0082, lng: 28.9784 },
              map: map,
              title: 'Testing map'
            });
          }}
        />
      </div>
    );
  }
}

export default MapPage;
