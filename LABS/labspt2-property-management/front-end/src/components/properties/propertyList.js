import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import PropertyCard from "./propertyCard";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import "../../assets/css/general.css";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import NavigationIcon from "@material-ui/icons/Navigation";
const decode = require("jwt-decode");

const url = `https://tenantly-back.herokuapp.com/properties`;

const styles = theme => ({
  heading: {
    width: "100%",
    display: "flex",
    fontSize: "2rem"
  },
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
  },
  margin: {
    margin: theme.spacing.unit,
    fontSize: " 1.3rem"
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  }
});
class propertyList extends Component {
  state = {
    properties: []
  };

  componentDidMount() {
    this.fetchProperties();
  }

  fetchProperties() {
    const token = localStorage.getItem("jwtToken");
    const userId = decode(token).id;
    axios
      .get(`http://localhost:9000/properties/landlord/${userId}`)
      .then(response => {
        this.setState({ properties: response.data });
        console.log(this.state.properties);
      })
      .catch(err => {
        console.error("Server Error", err);
      });
  }

  render() {
    const { classes } = this.props;
    return (
      <Grid container spacing={24} style={{ padding: 20 }}>
        <Typography
          className={classes.heading}
          variant="h5"
          component="h2"
          gutterBottom
        >
          Properties:
        </Typography>
        {this.state.properties.map(property => (
          <PropertyCard
            key={property.id}
            name={property.name}
            address={property.address}
            city={property.city}
            state={property.state}
            zipcode={property.zip}
            id={property.id}
          />
        ))}

        <Card className={classes.root}>
          <Link to="/add-property">
            <Button size="medium" className={classes.margin}>
              + Add New Property
            </Button>
          </Link>
        </Card>
      </Grid>
    );
  }
}

export default withStyles(styles)(propertyList);
