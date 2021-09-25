import React, { useState } from 'react';
import ReactMapGL from 'react-map-gl';

import PlotIcon from './PlotIcon';

export const RegisterMap = () => {

  const [viewport, setViewport] = useState({
    latitude: 37.77872018361018,
    longitude: -122.3962783813477,
    zoom: 10,
    width: '90vw',
    height: '90vh',
  });

  const [mockPicture] = useState([
    {
      id: 8,
      media_id: 22721885,
      user_id: 45,
      longitude: -122.3962783813477,
      latitude: 37.77872018361018,
      thumbnail: "https://i.ibb.co/qR7ST7G/image.png",
      standard_resolution: "https://i.ibb.co/mHbjfbs/image.png",
      created_time: "1279340983",
      caption: "this is a test",
      likes: 10
    },
    {
      id: 10,
      media_id: 22721886,
      user_id: 45,
      longitude: -122.4962783813477,
      latitude: 37.878720183610184,
      thumbnail: "https://i.ibb.co/qR7ST7G/image.png",
      standard_resolution: "https://i.ibb.co/mHbjfbs/image.png",
      created_time: "1279340984",
      caption: "this is a testttt",
      likes: 15
    }
  ]);

  return (
    <div className="App">
    <header className="App-header">
      <ReactMapGL 
          {...viewport} 
          mapboxApiAccessToken="pk.eyJ1IjoibGFtYmRhbGFibWFwIiwiYSI6ImNrMGN4cGhpaDAwbXkzaHF2OWV2ODVqeXUifQ.TMRmQN2yzxAX43K5g7Y2TA"
          mapStyle= "mapbox://styles/lambdalabmap/ck0ogodu804y91cqrfpsac1pz"
          onViewportChange={viewport => {
          setViewport(viewport);
        }}
      >
        {mockPicture.map((marker, index) => (
          <PlotIcon
            key={index}
            latitude={marker.latitude}
            longitude={marker.longitude}
            caption={marker.caption}
          />
        ))}
      </ReactMapGL>
    </header>
  </div>
  );
};

export default RegisterMap;