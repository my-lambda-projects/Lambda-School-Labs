import React from "react";
import Menu from "./Menu";
import IndexPage from "./IndexPage";
import Pricing from "./Pricing"
import SecondHero from "./SecondHero"
import Newsletter from "./Newsletter"
import Footer from "./Footer"


import "../../assets/css/general.css";

const LandingView = () => {
  return (
    <div className="landingpage">
      <Menu />
      <IndexPage />
      <SecondHero />
      <Footer />


    </div>
  );
};

export default LandingView;
