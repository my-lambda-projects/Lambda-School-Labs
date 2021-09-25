import React, { useContext } from "react";
import Edit from "../EditIcon";

import style from "../styles";

import { withStyles } from "@material-ui/core/styles";
import UserContext from "../../../context/UserContext";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const ViewCompanyDetails = props => {
  const { classes } = props;
  const context = useContext(UserContext);
  const {
    name,
    email,
    address1,
    address2,
    phoneNumber,
    city,
    state,
    zipCode
  } = context.company;
  return (
    <div className={classes.cardContainer}>
      <div className={classes.cardHeader}>
        <Typography className={classes.cardTitle} variant={'h3'}>
          Company Details
        </Typography>
      </div>
      <div className="infoContainer">
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
        <div className={classes.info}>
          <Typography className={classes.infoTitle} variant={'h4'}>
            Address 1:
          </Typography>
          <Typography className={classes.infoData} variant={'h5'}>
            {address1} 
          </Typography>
        </div>
        <div className={classes.info}>
          <Typography className={classes.infoTitle} variant={'h4'}>
            Address 2: 
          </Typography>
          <Typography className={classes.infoData} variant={'h5'}>
            {address2}
          </Typography>
        </div>
        <div className={classes.info}>
          <Typography className={classes.infoTitle} variant={'h4'}>
            City:
          </Typography>
          <Typography className={classes.infoData} variant={'h5'}>
            {city}
          </Typography>
        </div>
        <div className={classes.info}>
          <Typography className={classes.infoTitle} variant={'h4'}>
            State:
          </Typography>
          <Typography className={classes.infoData} variant={'h5'}>
            {state}
          </Typography>
        </div>
        <div className={classes.info}>
          <Typography className={classes.infoTitle} variant={'h4'}>
            Postal Code:
          </Typography>
          <Typography className={classes.infoData} variant={'h5'}>
            {zipCode}
          </Typography>
        </div>
      </div>
      <Button className={classes.edit} onClick={props.toggleView}>
        Edit
      </Button>
    </div>
  );
};

export default withStyles(style)(ViewCompanyDetails);
