import React from "react";
import { Button, Col, Label } from "reactstrap";
import { Link } from "react-router-dom";
import "./settings.css"

//This will allow users to go into their settings and update their email & password credentials
const Options = props => {
  return (
    <Col className=" form-bg"  md="10">
            <br />
            <form className="form animated bounce" onSubmit={this.handleSubmit}>
            <Label style={{ color: "white", letterSpacing: ".2ch" }}>Choose Option</Label>
            <br/> 
             <Link to="/dashboard">
              <i className="fas fa-wrench fa-2x" />
            </Link>  
            <br/>
            <br/>
                <Link to="/dashboard/settings/options/email"><Button>Update Email</Button></Link>
              <br/>
              <br/>
                <Link to="/dashboard/settings/options/password"><Button>Update Password</Button></Link>    
            </form>
    </Col>
  );
};

export default Options;