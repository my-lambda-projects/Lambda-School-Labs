// NOt sure if we will use this at all but leaving the boiler Plate here in case we do want to work with it later
import React, { Component } from "react";
import SideBar from "./SideBar";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class SettingsPage extends Component {
  render() {
    return (
      <div>
        <SideBar/>
        <Form inline>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label for="email" className="mr-sm-2">Email:</Label>
          <Input type="email" name="email" id="email" placeholder="user@gmail.com" />
        </FormGroup>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label for="oldPassword" className="mr-sm-2">Old Password:</Label>
          <Input type="password" name="password" id="oldPassword" placeholder="********" />
        </FormGroup>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label for="newPassword" className="mr-sm-2">New Password:</Label>
          <Input type="password" name="password" id="newPassword" placeholder="********" />
        </FormGroup>
        <Button>Submit</Button>
      </Form>  
      </div>
    );
  }
}
export default SettingsPage;