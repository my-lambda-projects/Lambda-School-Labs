import React from "react";
import Card from "@material-ui/core/Card";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    fontSize: "1.5rem",
    width: 250,
    border: "1px solid black",
    margin: 10
  }
});
const PropertyCard = props => {
  const { classes } = props;
  return (
    <Card className={classes.root}>
      <Link to={`/view-property/${props.id}`}>
        <h1>{props.name}</h1>
        <h1>{props.address}</h1>
        <h1>{props.city}</h1>
        <h1>{props.state}</h1>
        <h1>{props.zipcode}</h1>
      </Link>
    </Card>
  );
};

export default withStyles(styles)(PropertyCard);
