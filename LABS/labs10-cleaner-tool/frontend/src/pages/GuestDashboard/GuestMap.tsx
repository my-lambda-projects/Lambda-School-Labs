import React from 'react';
import useFetch from '../../helpers/useFetch';
import {LeafletMap} from '../../components/index';
import {MapContainer} from './GuestMap.styling';
const backendURL = process.env.REACT_APP_backendURL;

const GuestMap = (props:any) =>{
    console.log(props.match)
    const [fetchData, fetchErr, fetchLoading] = useFetch(
        `${backendURL}/gueststay/${props.match.params.id}`,
        true,
        'get',
      );
      console.log(fetchData);
      if (fetchErr.error === true) {
        throw fetchErr;
      }
      if (fetchLoading === true) {
        return (
          <div>
            <img src='../utils/loading.svg' />
          </div>
        );
}   else {
    const guest = {
        default_house:[{
            house_address: fetchData.house_address
        }],
        avl_houses:[],
        address: fetchData.address
    }
        if(guest.default_house[0].house_address && guest.address){
        return (
            <MapContainer>
                <LeafletMap ast={guest}/>
            </MapContainer>
            // <div>hello world</div>
        )}
        else {
        return (
            <h3>Please Update Your Home Address</h3>
        )}
    }
}
export default GuestMap;