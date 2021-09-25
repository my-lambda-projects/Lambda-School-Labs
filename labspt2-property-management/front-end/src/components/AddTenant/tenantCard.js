import React, { Component } from "react";
import axios from "axios";

import HouseApp from "./houseApp";

const decode = require('jwt-decode');

const url = "https://tenantly-back.herokuapp.com/api/register";
const mail = "https://tenantly-back.herokuapp.com/send";

/*Creating Tenant */

class TenantInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      landlord_id: "",
      property_id: "",
      password: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      cost: "",
      emailSubscribe: false,
      textSubscribe: false,
      application: null,
      isLandlord: false,
      properties: [],
      propertyNames: []
    };
  }

  componentDidMount() {

    const token = localStorage.getItem('jwtToken');
    const id = decode(token).id;
    
  this.setState({
    landlord_id: id
  })

  }


  

  inputHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
    this.setState({
      password: this.state.phone
    });
  };

  fetchProperties() {
    const token = localStorage.getItem("jwtToken");
    const userId = decode(token).id;
    axios
      .get(`https://tenantly-back.herokuapp.com/properties/landlord/${userId}`)
      .then(response => {
        let names = response.data.map(a => {
          return {
            value: a.id,
            display: a.name
          };
        });
        this.setState({
          properties: response.data,
          landlord_id: userId,
          propertyNames: [
            {
              value: "",
              display: "Select Property"
            }
          ].concat(names)
        });
      })
      .catch(err => {
        console.error("Server Error", err);
      });
  }

  addTenant = e => {
    const tenant = {};
    e.preventDefault();
    axios
      .post(url, this.state)
      .then(response => {
        console.log("response", response);
        /*Sending id back to parent (AddTenant) */
        let id = response.data;
        this.props.tenantInfo(id);
        /* */
        let email = {
          name: this.state.firstName,
          email: this.state.email,
          password: this.state.phone
        };
        axios
          .post(mail, email)
          .then(() => {
            console.log("sent");
          })
          .catch(err => {
            console.log({ Error: err });
          });
      })
      .catch(err => {
        console.log({ Error: err });
      });
  };

  urlUpdater = imageurl => {
    this.setState({
      application: imageurl
    });
  };

  handleCheckboxChange = e => {
    this.setState({ [e.target.name]: e.target.checked });
  };

  render() {
    return (
      <div className="tenant-info">
        <h1>Tenant Info</h1>
        <form>
          <div className="tenantCard-top">
            <div className="inputInfo">
              <div className="name-input">
                <h1>First Name</h1>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  onChange={this.inputHandler}
                />
                <h1>Last Name</h1>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  onChange={this.inputHandler}
                />
              </div>
              <div className="eN-input">
                <div>
                  <h1>Email</h1>
                  <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    onChange={this.inputHandler}
                  />
                </div>
                <div>
                  <h1>Mobile #</h1>
                  <input
                    type="text"
                    name="phone"
                    placeholder="Mobile #"
                    onChange={this.inputHandler}
                  />
                </div>
                <div>
                  <h1>Per Month</h1>
                  <input
                    type="text"
                    name="cost"
                    placeholder="Per Month"
                    onChange={this.inputHandler}
                  />
                </div>
              </div>
            </div>
            <div className="flex-row">
              <input
                id="emailSubscribe"
                type="checkbox"
                name="emailSubscribe"
                onChange={this.handleCheckboxChange}
                value={this.state.emailSubscribe}
              />
              <label htmlFor="emailSubscribe">Email? </label>

              <input
                id="textSubscribe"
                type="checkbox"
                name="textSubscribe"
                value={this.state.textSubscribe}
                onChange={this.handleCheckboxChange}
              />
              <label htmlFor="textSubscribe">Texts?</label>
            </div>
          </div>
          <div className="tenantCard-bottom">
            <div className="option-properties">
              <select
                value={this.state.property_id}
                onChange={e => this.setState({ property_id: e.target.value })}
              >
                {this.state.propertyNames.map(property => (
                  <option key={property.value} value={property.value}>
                    {property.display}
                  </option>
                ))}
              </select>
            </div>
            <HouseApp url={this.urlUpdater} />
          </div>
        </form>
        <div className="addTenantB-container">
          <button className="filled-button" onClick={this.addTenant}>
            Create Tenant
          </button>
        </div>
      </div>
    );
  }
}

export default TenantInfo;
