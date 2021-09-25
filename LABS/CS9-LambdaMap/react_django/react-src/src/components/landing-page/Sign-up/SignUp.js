// Register Page

import React, { Component } from "react";
import { register } from "../../../actions";
import { connect } from "react-redux";
import "./SignUp.css";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      account_type: false,
      first_name: "",
      last_name: "",
      company_name: "",
      city: "",
      state: ""
    };
  }

  render() {
    let employer = "";
    let client = "";
    if (this.state.account_type === false) {
      client = (
        <div className="client-reg">
          
            <input
              className="emailInput"
              type="text"
              placeholder="* First Name"
              name="first_name"
              value={this.state.first_name}
              onChange={e => this.setState({ [e.target.name]: e.target.value })}
            />
         
            <input
              className="emailInput"
              type="text"
              placeholder="* Last Name"
              name="last_name"
              value={this.state.last_name}
              onChange={e => this.setState({ [e.target.name]: e.target.value })}
            />
        
            <input
              className="emailInput"
              type="text"
              placeholder="* City"
              name="city"
              value={this.state.city}
              onChange={e => this.setState({ [e.target.name]: e.target.value })}
            />
                    
            <input
              className="emailInput"
              type="text"
              placeholder="* State"
              name="state"
              value={this.state.state}
              onChange={e => this.setState({ [e.target.name]: e.target.value })}
            />
        </div>
      );
    } else if (this.state.account_type === true) {
      employer = (
        <div className="company-reg">
        
            <input
              className="emailInput"
              type="text"
              placeholder="* Company Name"
              name="company_name"
              value={this.state.company_name}
              onChange={e => this.setState({ [e.target.name]: e.target.value })}
            />
         
            <input
              className="emailInput"
              type="text"
              placeholder="* City"
              name="city"
              value={this.state.city}
              onChange={e => this.setState({ [e.target.name]: e.target.value })}
            />
                   
            <input
              className="emailInput"
              type="text"
              placeholder="* State"
              name="state"
              value={this.state.state}
              onChange={e => this.setState({ [e.target.name]: e.target.value })}
            />
           
        </div>
      );
    }
    return (
      <div className="main-signup">
        <div className="signup-form">Tell us a little about yourself:</div>
        <hr />
        <div className="employer-switch">
          <label className="switch">
            <input
              type="checkbox"
              name="account_type"
              className="input"
              checked={this.state.account_type}
              onChange={e =>
                this.setState({ [e.target.name]: e.target.checked })
              }
            />
            <span className="slider round" />
          </label>
          <h4>* I'm an employer</h4>
        </div>
        <div className="register">
        
            <input
              required
              className="emailInput"
              type="text"
              placeholder="* Email"
              name="email"
              value={this.state.email}
              onChange={e => this.setState({ [e.target.name]: e.target.value })}
            />

          
            
              <input
                required
                className="pwdInput"
                type="password"
                placeholder="* Password"
                name="password"
                value={this.state.password}
                onChange={e =>
                  this.setState({ [e.target.name]: e.target.value })
                }
              />
        </div>

        <div className="register">
          {employer}
          {client}
        </div>

        <button
          onClick={() => {
            this.props.register({
              email: this.state.email,
              password: this.state.password,
              account_type: this.state.account_type.toString(),
              first_name: this.state.first_name,
              last_name: this.state.last_name,
              company_name: this.state.company_name,
              city: this.state.city,
              state: this.state.state
            });
            this.setState({
              email: "",
              password: "",
              first_name: "",
              last_name: "",
              company_name: "",
              city: "",
              state: "",
              account_type: false
            });
          }}
        >
          Register
        </button>
        <h5>* required field</h5>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    clients: state.clients,
    hiring_partners: state.hiring_partners,
    registering: state.registering,
    error: state.error
  };
};

export default connect(
  mapStateToProps,
  { register }
)(SignUp);
