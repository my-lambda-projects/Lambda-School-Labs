import React, { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import './buttonStyle.css';

const DeleteButton = (props) => {

  const handleClick = () => {
    props.openDeleteModal(props.jobId);
  };

  return (
    <Fragment>
      <FontAwesomeIcon icon={faTrash} className="cardButton deleteButton" onClick={handleClick}/>
    </Fragment>
  );
};

export default DeleteButton;
