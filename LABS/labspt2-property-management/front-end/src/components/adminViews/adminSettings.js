import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

import axios from "axios";

const styles = theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap"
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
class AdminSettings extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    oldPW: "",
    newPW1: "",
    newPW2: "",
    update: false
  };

  componentDidMount() {
    const token = localStorage.getItem("jwtToken");
    const id = decode(token).id;

    axios
      //.get(`https://tenantly-back.herokuapp.com/users/${id}`)
      .get(`https://tenantly-back.herokuapp.com/landlords/${id}`)
      .then(user => {
        this.setState({
          firstName: user.data.firstName,
          lastName: user.data.lastName,
          email: user.data.email,
          phone: user.data.phone
        });
      })
      .catch(err => console.log(err));
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  emailCheck = email => {
    if (email.length > 40) {
      alert("Your e-mail can be a max of 40 characters");
      return false;
    } else if (!email.indexOf(".com") || !email.indexOf("@")) {
      alert("Please enter a valid e-mail address");
      return false;
    } else return true;
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
        .put(`https://tenantly-back.herokuapp.com/landlords/${id}`, {
          ...this.state,
          id: parseInt(id)
        })
        // .put(`http://www.localhost:9000/users/${id}`, { ...this.state, id: parseInt(id) })
        .then(res => {
          console.log(res);
          this.setState({ update: false });
          alert(res.data.message);
        })
        .catch(err => {
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
        <h6>
          {this.state.firstName} {this.state.lastName}
        </h6>
        <TextField
          placeholder="First Name"
          name="firstName"
          value={this.state.firstName}
          onChange={this.onChange}
          type="text"
          required
        />
        <TextField
          placeholder="Last Name"
          name="lastName"
          value={this.state.lastName}
          onChange={this.onChange}
          type="text"
          required
        />
        <TextField
          placeholder="E-mail"
          name="email"
          type="email"
          // pattern=".+@globex.com"
          size="30"
          value={this.state.email}
          onChange={this.onChange}
          required
        />
        <TextField
          placeholder="Phone"
          name="phone"
          value={this.state.phone}
          onChange={this.onChange}
          type="text"
          required
        />
        <TextField
          placeholder="Password"
          name="oldPW"
          value={this.state.oldPW}
          onChange={this.onChange}
          type="password"
        />

        <TextField
          placeholder="New Password"
          name="newPW1"
          value={this.state.newPW1}
          onChange={this.onChange}
          type="password"
        />
        <TextField
          placeholder="New Password"
          name="newPW2"
          value={this.state.newPW2}
          onChange={this.onChange}
          type="password"
        />
        <div>
          {this.state.update ? (
            <div className="ring-container">
              <div className="lds-ring">
                <div />
              </div>
            </div>
          ) : (
            <Button
              type="submit"
              variant="contained"
              size="large"
              color="secondary"
              className={classes.margin}
            >
              Update
            </Button>
          )}
        </div>
      </form>
    );
  }
}

AdminSettings.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(AdminSettings);
