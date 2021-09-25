import React from 'react';
import { loadModules } from 'esri-loader'

const widgets = () => {

    let mapRef = React.createRef()
    loadModules(['esri/Map', 'esri/views/MapView'], { css: true })
    .then(([ArcGISMap, MapView]) => {

      const map = new ArcGISMap({
        basemap: 'streets-navigation-vector'
      });

      const view = new MapView({
        container: mapRef.current,
        map: map,
        center: [-118, 34],
        zoom: 8
      });
    });
}

export default widgets;
      