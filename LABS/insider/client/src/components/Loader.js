import React from 'react';

const Loader = (props) => {
  return (
    <div className={`full-screen ${props.loading ? '' : 'hide'}`}>
      <div className="loading">
        <svg
          id="loader"
          className={props.loading ? '' : 'hide'}
          data-name="loading-loader"
          xmlns="http://www.w3.org/2000/svg"
          width="80"
          height="80"
          viewBox="0 0 80 80"
        >
          <title>loader</title>
          <path
            fill="#5576ff"
            d="M40.9,7.9a32.1,32.1,0,1,0-.2,64.2A31.7,31.7,0,0,0,64.1,61.2l7.1,9.7a.6.6,0,0,0,1-.3V40.4C72.2,22.9,58.4,8.3,40.9,7.9Zm8.9,18.9a6.3,6.3,0,1,1-6.3,6.3A6.3,6.3,0,0,1,49.8,26.8Zm-19.6,0a6.3,6.3,0,0,1,6.3,6,.8.8,0,0,1-1.5,0,4.8,4.8,0,0,0-9.6,0,.8.8,0,0,1-1.5,0A6.3,6.3,0,0,1,30.2,26.8ZM45.7,51.9V53c0,3.5-2.6,5.3-5.7,5.3s-5.6-1.8-5.6-5.3V51.8c-5.2-1.3-9.6-4.5-10.4-8.1a.5.5,0,0,1,1,0c1.1,3,4.4,5,8.7,6a27.4,27.4,0,0,0,5.9.6h.9a27.4,27.4,0,0,0,5.9-.6c4.4-1,7.6-3,8.7-6a.5.5,0,0,1,1,0C55.3,47.3,50.9,50.5,45.7,51.9Z"
          />
        </svg>
        <p>Sending</p>
      </div>
    </div>
  );
};
export default Loader;
