import React from 'react';

// import components here
import Landing from '../../components/Landing';

// import styles here
import './LandingPage.css';

const LandingPage = props => {
  return (
    <section className="landing-page">
      <Landing
      // click={props.click}
      />
    </section>
  );
};

export default LandingPage;
