import React from "react";

import { ReactComponent as InvoicesSVG } from "../../assets/undraw_printing_invoices_5r4r.svg";
import { ReactComponent as ChartsSVG } from "../../assets/undraw_finance_0bdk.svg";

import "./LandingFeatures.css";

const LandingFeatures = props => {
  return (
    <div className="landing-features-container">
      <div className="landing-features">
        <div className="top-row">
          <InvoicesSVG />
          {/* <img src="/assets/placeholder-460x300.png" /> */}
          <div className="top-row-text">
            Features: Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Non curabitur gravida arcu ac. Vitae turpis massa sed elementum
            tempus. Lacus laoreet non curabitur gravida arcu ac tortor
            dignissim. Sagittis vitae et leo duis ut diam quam nulla.
          </div>
        </div>
        <div className="bot-row">
          <div className="bot-row-text">
            Next Features: Lorem ipsum dolor sit amet, consectetur adipiscing
            elit, sed do eiusmod tempor incididunt ut labore et dolore magna
            aliqua. Non curabitur gravida arcu ac. Vitae turpis massa sed
            elementum tempus. Lacus laoreet non curabitur gravida arcu ac tortor
            dignissim. Sagittis vitae et leo duis ut diam quam nulla.
          </div>
          <ChartsSVG />
          {/* <img src="/assets/placeholder-460x250.png" /> */}
        </div>
      </div>
    </div>
  );
};

export default LandingFeatures;
