import React from 'react';

const Confirmed = (props) => {
  return (
    <div className={`full-screen ${props.confirmed ? '' : 'hide'}`}>
      <div className="loading">
        <svg
          id="loading-completed"
          className={!props.confirmed ? 'hide' : ''}
          data-name="loading-completed"
          xmlns="http://www.w3.org/2000/svg"
          width="80"
          height="80"
          viewBox="0 0 80 80"
        >
          <title>completed</title>
          <path
            fill="#7ccc30"
            d="M40.9,7.9A32.2,32.2,0,0,0,7.8,40.1c.1,17.9,14.6,32,32.9,32S72.2,57.8,72.2,40.4,58.4,8.3,40.9,7.9ZM59.2,25.2,35.8,57.9a.6.6,0,0,1-.6.3h0l-.6-.2L22.5,44.9a.9.9,0,0,1,.1-1.1.8.8,0,0,1,1,.1L35.1,56.3,58,24.3a.9.9,0,0,1,1.1-.2A.8.8,0,0,1,59.2,25.2Z"
          />
        </svg>
        <p>Message Sent!</p>
      </div>
    </div>
  );
};
export default Confirmed;
