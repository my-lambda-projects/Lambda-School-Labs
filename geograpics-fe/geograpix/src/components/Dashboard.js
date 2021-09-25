import React from 'react';
import PropTypes from 'prop-types';

import Map from './Map';

const Dashboard = (props) => {
  // console.log('DASHBOARD PROPS',props);
    
  return (
      <div>
          <Map history={props.history} />
      </div>
  );
};

Dashboard.propTypes = {
  history: PropTypes.object
}

export default Dashboard;