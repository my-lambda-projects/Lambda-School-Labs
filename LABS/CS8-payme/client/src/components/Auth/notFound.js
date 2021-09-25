import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return ( 
    <div className="notfound-layout">
      <div className="notfound">
        <h1 className="notfound--title">
            payMe
            <span className="notfound--dot">
            .
            </span>
            <br />
          </h1>
        <h1 className="notfound-404"> 404 </h1>
        <p> We're sorry, the page you requested could not be found. <br />
          Please go to to the <Link to="/">homepage</Link> or contact us at givememymoneyapp@gmail.com
        </p>
      </div>
    </div>
   );
}
 
export default NotFound;