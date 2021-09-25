import React, { Component } from 'react';
import { Input, Button, Row, Icon } from 'react-materialize';

import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      usCitizen: '',
      living: ''
    };
    this.handleFieldChange = this.handleFieldChange.bind(this);
  }
  handleFieldChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  render() {
    return (
      <Row>
        <Input
          s={12}
          label="What is your first name?"
          name="firstName"
          onChange={this.handleFieldChange}
          value={this.state.firstName}
        >
          <Icon>account_circle</Icon>
        </Input>
        <Input
          s={12}
          label="What is your last name?"
          name="lastName"
          onChange={this.handleFieldChange}
          value={this.state.lastName}
        >
          <Icon>account_circle</Icon>
        </Input>
        <Input
          s={12}
          label="What is your email address?"
          name="email"
          onChange={this.handleFieldChange}
          value={this.state.email}
        >
          <Icon>email</Icon>
        </Input>
        <Input
          s={12}
          label="Where are you currently living?"
          placeholder="City, State/Province, Country"
          name="living"
          onChange={this.handleFieldChange}
          value={this.state.living}
        >
          <Icon>home</Icon>
        </Input>
      </Row>
    );
  }
}

export default App;
