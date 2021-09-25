import Geocode from 'react-geocode';
import {action} from '../actions/action';
import {GET_EVENT_BY_ID} from '../actions';

Geocode.setApiKey(process.env.REACT_APP_apiKey);
Geocode.setLanguage('en');
Geocode.setRegion('us');

export const getLatLong = (address) => {
  return new Promise((resolve, reject) => {
    Geocode.fromAddress(address).then(response => {
      const {lat, lng} = response.results[ 0 ].geometry.location;
      resolve({lat, lng});
      
    });
  });
  
};