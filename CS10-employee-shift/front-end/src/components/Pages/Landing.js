import React from "react";

import LandingCard from "../Organisms/LandingCard.js";
import LandingDetail from "../Organisms/LandingDetails.js";
import LandingLearning from "../Organisms/LandingLearn.js";
import LandingFooter from "../Organisms/LandingFooter.js";

const Landing = () => {
  return (
    <div>
      <LandingCard />
      <LandingDetail />
      <LandingLearning />
      <LandingFooter />
    </div>
  );
};

export default Landing;
