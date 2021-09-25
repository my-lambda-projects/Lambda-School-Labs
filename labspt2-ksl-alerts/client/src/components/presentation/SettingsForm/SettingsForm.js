import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Header, Input } from 'semantic-ui-react';

const SettingsForm = props => {

  return (
    <Form onSubmit={this.handleSubmit}>
      <Form.Input
        name='email'
        label='Email'
        control='input'
        value={this.state.email}
        onChange={this.handleInputChange}
      />
      <Form.Input
        name='oldPassword'
        label='Old Password'
        control='input'
        value={this.state.oldPassword}
        onChange={this.handleInputChange}
      />
      <Form.Input
        name='newPassword'
        label='New Password'
        control='input'
        value={this.state.newPassword}
        onChange={this.handleInputChange}
      />
      <Form.Input
        name='phone'
        label='Phone Number'
        control='input'
        value={this.state.phone}
        onChange={this.handleInputChange}
      />
      <Button type='submit'>Submit</Button>
    </Form>
  );
}

SettingsForm.propTypes = {
  email: PropTypes.string,
  oldPassword: PropTypes.string,
  newPassword: PropTypes.string,
  phone: PropTypes.number
};

export default SettingsForm;
