import React, { Component } from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import orange from "@material-ui/core/colors/orange";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { nominalTypeHack } from "prop-types";
import Typography from "@material-ui/core/Typography";
import "../../assets/css/general.css";

const decode = require("jwt-decode");
const url = "http://localhost:9000/properties";
// const url = "https://tenantly-back.herokuapp.com/properties/";

class AddProperty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      sqft: "",
      rooms: "",
      bathrooms: "",
      year: "",
      max: ""
    };
  }

  addProperty = e => {
    e.preventDefault();
    const token = localStorage.getItem("jwtToken");
    const userId = decode(token).id;
    console.log(userId);

    axios
      .post(url, { ...this.state, owner: userId })
      .then(response => {
        console.log("in here", response);
      })
      .catch(err => {
        console.log("Error", err);
      });
    this.props.history.push(`/properties`);
  };

  inputHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="addProperty-container">
        <h1>Add New Property</h1>

        <form onSubmit={this.addProperty}>
          <div>
            <input
              type="text"
              name="name"
              value={this.state.name}
              placeholder="Property Name"
              onChange={this.inputHandler}
              className="form-input"
            />
            <input
              type="text"
              name="address"
              value={this.state.address}
              placeholder="Address"
              onChange={this.inputHandler}
              className="form-input"
              required
            />
            <input
              type="text"
              name="city"
              value={this.state.city}
              placeholder="City"
              onChange={this.inputHandler}
              className="form-input"
              required
            />
            <input
              type="text"
              name="state"
              value={this.state.state}
              placeholder="State"
              onChange={this.inputHandler}
              className="form-input"
              required
            />
            <input
              type="text"
              name="zip"
              value={this.state.zip}
              placeholder="Zipcode"
              onChange={this.inputHandler}
              className="form-input"
              required
            />
          </div>
          <div>
            <input
              type="text"
              name="sqft"
              value={this.state.sqft}
              placeholder="SqFt"
              onChange={this.inputHandler}
              className="form-input"
            />
            <input
              type="text"
              name="rooms"
              value={this.state.rooms}
              placeholder="Bedrooms"
              onChange={this.inputHandler}
              className="form-input"
              required
            />
            <input
              type="text"
              name="bathrooms"
              value={this.state.bathrooms}
              placeholder="Bathrooms"
              onChange={this.inputHandler}
              className="form-input"
              required
            />
            <input
              type="text"
              name="year"
              value={this.state.year}
              placeholder="Year"
              onChange={this.inputHandler}
              className="form-input"
              required
            />
            <input
              type="text"
              name="max"
              value={this.state.max}
              placeholder="maxOccupants"
              onChange={this.inputHandler}
              className="form-input"
              required
            />
          </div>
          <div>
            <button type="submit" className="filled-button">
              Save
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default AddProperty;
