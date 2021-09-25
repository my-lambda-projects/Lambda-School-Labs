import React from "react";
import Typography from "@material-ui/core/Typography";
import "./404.css";

const TripNotFound404 = () => (
  <div className="BadUrl404">
    <div className="hero-image-404-3">
      <div className="hero-text">
        <Typography variant="display4" color="inherit">
          Unfortunately,
        </Typography>
        <Typography variant="display2" color="inherit">
          This user doesn&apos;t have a trip by that name.
        </Typography>
      </div>
    </div>
  </div>
);

export default TripNotFound404;
