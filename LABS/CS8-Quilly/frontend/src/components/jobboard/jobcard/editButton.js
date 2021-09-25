import React, { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog} from '@fortawesome/free-solid-svg-icons';
import './buttonStyle.css';

const EditButton = (props) => {

  const handleClick = () => {
    props.openEditModal(props.jobInfo);
  }

  return (
    <Fragment>
      <FontAwesomeIcon icon={faCog} className="cardButton editButton" onClick={handleClick}/>
    </Fragment>
  );
};

export default EditButton;
