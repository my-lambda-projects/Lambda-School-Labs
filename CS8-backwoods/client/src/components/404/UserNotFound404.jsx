import React from "react";
import { Redirect } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import SignInOut from "../SignInOut/SignInOut";
import "./404.css";

const UserNotFound404 = props => {
  const { isLoggedIn, match, ...rest } = props;
  if (isLoggedIn) {
    return <Redirect push to={`/${match.params.user}/`} />;
  }
  return (
    <div className="Wrapper404">
      <SignInOut
        buttonColor
        styleName="signInOutlanding"
        buttonVariant="contained"
        isLoggedIn={isLoggedIn}
        {...rest}
      />
      <div className="hero-image-404-5">
        <div className="hero-text">
          <Typography variant="display4" color="inherit">
            Sorry
          </Typography>
          <Typography variant="display2" color="inherit">
            That user was not found
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default UserNotFound404;
