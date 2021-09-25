import React from 'react';

const Error = (props) => {
  return (
    <div className={`full-screen ${props.error ? '' : 'hide'}`}>
      <div className="loading">
        <svg
          id="loading-error"
          className={props.error ? '' : 'hide'}
          data-name="loading-error"
          xmlns="http://www.w3.org/2000/svg"
          width="80"
          height="80"
          viewBox="0 0 80 80"
        >
          <title>error</title>
          <path
            fill="#ff5548"
            d="M40.9,7.9A32.2,32.2,0,0,0,7.8,40.1c.1,17.9,14.6,32,32.9,32S72.2,57.8,72.2,40.4,58.4,8.3,40.9,7.9Zm11.4,48a.8.8,0,0,1-.1,1.1h-.5a.9.9,0,0,1-.6-.3L40,41.3,28.9,56.8a.9.9,0,0,1-.6.3h-.5a.8.8,0,0,1-.1-1.1L39.1,40,27.7,24.1a.8.8,0,0,1,.1-1.1.9.9,0,0,1,1.1.2L40,38.7,51.1,23.2a.9.9,0,0,1,1.1-.2.8.8,0,0,1,.1,1.1L40.9,40Z"
          />
        </svg>
        <p>Houston we have a problem.</p>
        {props.message.map((message, i) => {
          return <p key={i}>{ message }</p>;
        })}
      </div>
    </div>
  );
};
export default Error;
