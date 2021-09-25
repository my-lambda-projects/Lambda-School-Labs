import React from "react";
import Typography from "@material-ui/core/Typography";
import "./404.css";

const UserHasNoTrips404 = () => (
  <div className="BadUrl404">
    <div className="hero-image-404-4">
      <div className="hero-text">
        <Typography variant="display4" color="inherit">
          Apologies.
        </Typography>
        <Typography variant="display2" color="inherit">
          This wanderer as not informed us of any trips yet...
        </Typography>
      </div>
    </div>
  </div>
);

export default UserHasNoTrips404;
