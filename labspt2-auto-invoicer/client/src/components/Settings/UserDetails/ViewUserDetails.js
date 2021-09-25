import React, { useContext } from "react";

import Edit from "../EditIcon";
import UserContext from "../../../context/UserContext";
import { withStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import style from "../styles";

const ViewUserDetails = props => {
  const { classes } = props;
  const context = useContext(UserContext);
  const { name, email, phoneNumber } = context.user;

  return (
    <div className={classes.cardContainer}>
      <div className={classes.cardHeader}>
        <Typography className={classes.cardTitle} variant={"h3"}>
          User Details
        </Typography>
      </div>
      <div className={classes.infoContainer}>
        <div className={classes.info}>
          <Typography className={classes.infoTitle} variant={'h4'}>
            Name: 
          </Typography>
          <Typography className={classes.infoData} variant={'h5'}>
            {name}
          </Typography>
        </div>
        <div className={classes.info}>
          <Typography className={classes.infoTitle} variant={'h4'}>
            Email: 
          </Typography>
          <Typography className={classes.infoDataEmail} variant={'h5'}>
            {email}
          </Typography>
        </div>
        <div className={classes.info}>
          <Typography className={classes.infoTitle} variant={'h4'}>
            Phone Number: 
          </Typography>
          <Typography className={classes.infoData} variant={'h5'}>
            {phoneNumber}
          </Typography>
        </div>
      </div>
      <Button className={classes.edit} onClick={props.toggleView}>
        Edit
      </Button>
    </div>
  );
};

export default withStyles(style)(ViewUserDetails);
