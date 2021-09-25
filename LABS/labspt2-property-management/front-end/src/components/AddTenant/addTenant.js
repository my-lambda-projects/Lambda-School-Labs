import React, { Component } from "react";

import TenantCard from "./tenantCard";
import HousingInfo from "./infoCard";

import "../../assets/css/general.css";

/*parent*/

class AddTenant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newTenant: false,
      tenantID: ""
    };
  }
  addAnotherTenant = e => {
    e.preventDefault();
    this.setState({ newTenant: true });
  };
  /*grabbing the tenant ID*/
  tenant = id => {
    if (id > 0) {
      console.log(id);
      this.setState({ tenantID: id });
    }
  };
  render() {
    return (
      <div className="addTenant-container">
        <div className="tenantInfo-container">
          <TenantCard tenantInfo={this.tenant} />

          <div
            className="tenantAdd"
            onClick={this.addAnotherTenant}
            style={this.state.newTenant ? { display: "none" } : null}
          >
            <h1>Add Tenant</h1>
          </div>

          {this.state.newTenant ? (
            <TenantCard tenantInfo={this.tenant} />
          ) : null}
        </div>
        {/*Sending tenantID (infoCard)*/}
        <div className="contract-container">
          <HousingInfo tenantID={this.state.tenantID} />
        </div>
      </div>
    );
  }
}

export default AddTenant;
