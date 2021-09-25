import React from 'react';
import { Popup } from 'react-map-gl';
import PropTypes from 'prop-types';

const PopupModal = (props) => {
  console.log('POPUP PROPS', props);

  const options = { year: 'numeric', month: 'long', day: 'numeric' };

  const dateFunction = (dateProp) => {
    const date = new Date(dateProp*1000)
    console.log(date)
    console.log(dateProp, "Date Prop")
    return date.toLocaleString("en-US", options)
  };

  console.log('POPUP PROPS',props);

  return (
    <Popup 
    latitude={props.latitude} 
    longitude={props.longitude}
    onClose={props.onClose}
    >
      <div>
        <img className="img-popup" src={props.selectedPark.standard_resolution} alt={props.selectedPark.caption} />
        <div className="div-text-popup">
          <h5 className="title-text-div">{props.pictureInfo.username}</h5>
          <p className="date-text-div">{dateFunction(parseInt(props.selectedPark.created_time))}</p>
        </div>
        <p className="caption-text-div">{props.selectedPark.caption}</p>
      </div>
    </Popup>
  );
};

PopupModal.propTypes = {
  latitude: PropTypes.number,
  longitude: PropTypes.number,
  selectedPark: PropTypes.shape({
    standard_resolution: PropTypes.string,
    caption: PropTypes.string,
    created_time: PropTypes.string
  }),
  pictureInfo: PropTypes.shape({
    username: PropTypes.string
  })
}

export default PopupModal;