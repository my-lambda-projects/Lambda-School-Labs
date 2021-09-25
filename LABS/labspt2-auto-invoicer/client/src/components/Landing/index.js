import React from "react";

//import LandingText from "../LandingText";
import LandingCTA from "../LandingText/LandingCTA.js";
import LandingFeaturesText from "../LandingText/LandingFeaturesText";
import { LandingGetStarted } from "../LandingGetStarted";

import HeadlineText from "../LandingText/HeadlineText";

const Landing = props => {
  return (
    <React.Fragment>
      <HeadlineText />
      <LandingCTA />
      <LandingFeaturesText />

      <LandingGetStarted />
    </React.Fragment>
  );
};

export default Landing;
