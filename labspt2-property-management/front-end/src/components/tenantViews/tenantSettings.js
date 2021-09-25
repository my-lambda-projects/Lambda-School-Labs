import React, { Component } from "react";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import axios from "axios";
import InputLabel from "@material-ui/core/InputLabel";

const styles = theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    width: "80%"
  },

  heading: {
    paddingBottom: 20
  },

  margin: {
    margin: theme.spacing.unit
  },

  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  }
});

const decode = require("jwt-decode");

class TenantSettings extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    textSubscribe: false,
    emailSubscribe: false,
    oldPW: "",
    newPW1: "",
    newPW2: "",
    update: false
  };

  componentDidMount() {
    const token = localStorage.getItem("jwtToken");
    const id = decode(token).id;
    axios
      //.get(`https://tenantly-back.herokuapp.com/tenants/${id}`)
      .get(`https://tenantly-back.herokuapp.com/tenants/${id}`)
      .then(user => {
        this.setState({
          firstName: user.data.firstName,
          lastName: user.data.lastName,
          email: user.data.email,
          phone: user.data.phone,
          textSubscribe: user.data.textSubscribe,
          emailSubscribe: user.data.emailSubscribe
        });
      })
      .catch(err => console.log(err));
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    this.setState({ update: true });

    // grabbing ID off local storage to access specific user info
    const token = localStorage.getItem("jwtToken");
    const id = decode(token).id;

    // If the user enters old password without trying to change password, it throws warning
    if (this.state.oldPW !== "" && this.state.newPW1 === "") {
      alert(
        "Only enter in your old password if you want to change your password"
      );
    } else if (this.state.oldPW === "" && this.state.newPW1 !== "") {
      // If they try to create a new password without entering old password
      alert("Please enter your previous password to update to new password");
    } else if (
      this.state.oldPW !== "" &&
      this.state.newPW1 !== "" &&
      this.state.newPW1 !== this.state.newPW2
    ) {
      // If new passwords do not match it throws error
      alert("You new passwords do not match");
    } else {
      // If old password is entered AND new passwords match, then it continues to attempt update
      axios
        .put(`https://tenantly-back.herokuapp.com/tenants/${id}`, {
          ...this.state,
          id: parseInt(id)
        })
        // .put(`http://www.localhost:9000/users/${id}`, { ...this.state, id: parseInt(id) })
        .then(res => {
          this.setState({ update: false });
          console.log(res);
          alert(res.data.message);
        })
        .catch(err => {
          console.log(err);
          alert("That e-mail or phone number already exists in our system");
        })
        .then(this.setState({ oldPW: "", newPW1: "", newPW2: "" }));
    }
  };

  handleCheckboxChange = e => {
    this.setState({ [e.target.name]: e.target.checked });
  };

  render() {
    const { classes } = this.props;
    return (
      <form className={classes.container} onSubmit={this.onSubmit}>
        <h6 className={classes.heading}>
          Name: {this.state.firstName} {this.state.lastName}
        </h6>
        <TextField
          label="First Name"
          placeholder="firstName"
          name="firstName"
          value={this.state.firstName}
          onChange={this.onChange}
          className="font"
          type="text"
          required
        />

        <TextField
          label="Last Name"
          placeholder="lastName"
          name="lastName"
          value={this.state.lastName}
          onChange={this.onChange}
          className="font"
          type="text"
          required
        />

        <TextField
          label="Email"
          placeholder="email"
          name="email"
          value={this.state.email}
          onChange={this.onChange}
          className="font"
          type="email"
          // pattern=".+@globex.com"
          size="30"
          required
        />
        <TextField
          label="Phone Number"
          placeholder="phone"
          name="phone"
          value={this.state.phone}
          onChange={this.onChange}
          className="font"
          type="text"
          required
        />
        {/* <Checkbox
							type="checkbox"
							name="textSubscribe"
							value={this.state.textSubscribe}
							onChange={this.handleCheckboxChange}
						/>
						<Checkbox
							type="checkbox"
							name="emailSubscribe"
							value={this.state.emailSubscribe}
							onChange={this.handleCheckboxChange}
						/> */}
        <FormControlLabel
          control={
            <Checkbox
              value={this.state.emailSubscribe}
              onChange={this.handleCheckboxChange}
              color="primary"
            />
          }
          className="font"
          label="Get Texts"
        />
        <FormControlLabel
          control={
            <Checkbox onChange={this.handleCheckboxChange} color="primary" />
          }
          className="font"
          label="Get Emails"
        />
        <TextField
          label="Password"
          placeholder="password"
          name="oldPW"
          value={this.state.oldPW}
          onChange={this.onChange}
          type="password"
          className="fonts"
        />
        <TextField
          label="New Password"
          placeholder="new password"
          name="newPW1"
          value={this.state.newPW1}
          onChange={this.onChange}
          type="password"
          className="fonts"
        />
        <TextField
          label="Confirm New Password"
          placeholder="new password"
          name="newPW2"
          value={this.state.newPW2}
          onChange={this.onChange}
          type="password"
          className="fonts"
        />

        {this.state.update ? (
          <div className="ring-container">
            <div className="lds-ring">
              <div />
            </div>
          </div>
        ) : (
          <Button
            type="submit"
            variant="outlined"
            size="large"
            color="primary"
            className={classes.margin}
          >
            Update
          </Button>
        )}
      </form>
    );
  }
}

TenantSettings.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(TenantSettings);
