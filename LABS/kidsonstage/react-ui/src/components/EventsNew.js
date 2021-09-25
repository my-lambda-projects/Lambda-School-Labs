import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addEvent } from '../actions';
import './css/events.css';
import { Navbar, NavbarBrand } from 'mdbreact';

import { TextField } from 'material-ui';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {
  faEdit,
  faCalendarAlt
} from '@fortawesome/fontawesome-free-solid';

const renderTextField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => (
  <TextField
    floatingLabelText={label}
    floatingLabelFocusStyle={{
      color: 'black'
    }}
    underlineFocusStyle={{
      borderColor: 'white'
    }}
    underlineStyle={{
      borderColor: 'grey'
    }}
    errorText={touched && error}
    {...input}
    {...custom}
    style={{
      color: 'red'
    }}
  />
);

/* eslint-disable react/forbid-prop-types */
class EventsNew extends Component {
  handleFormSubmit = ({
    title, eventDate, activated = false, completed = false, owner = sessionStorage.getItem('id'),
  }) => {
    this.props.save(
      {
        title, eventDate, activated, completed, owner,
      },
      this.props.history.push('/events'),
    );
  };

  render() {
    const {
      handleSubmit, pristine, submitting,
    } = this.props;
    return (
      <div className="eventDetail--container">
      <div className="eventDetail--form_container">
        <Navbar className="eventDetail--box_navbar" dark>
          <NavbarBrand tag="span">Create Event</NavbarBrand>
        </Navbar>
        <div className="eventDetail--box_content">
      <form onSubmit={handleSubmit(this.handleFormSubmit)} id="new-event-form" >
      <FontAwesomeIcon icon={faEdit} />{' '}<Field
          name="title"
          type="text"
          component={renderTextField}
          label="Title"
        /><br />
        <FontAwesomeIcon icon={faCalendarAlt} />{' '}<Field
          name="eventDate"
          type="text"
          component={renderTextField}
          label="Date"
          placeholder="Date"
        /><br /><br />
        <button
          className="new-user-action-button newEvent--button_save"
          id="new-user-sign-up"
          type="submit"
          disabled={pristine || submitting}
        >
          Save
        </button>
      </form>
      </div>
      </div>
      </div>
    );
  }
}
EventsNew.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  save: PropTypes.func.isRequired,
};
// export default EventsNew;
const NewEvent = reduxForm({
  form: 'newEvent', // a unique identifier for this form
  touchOnBlur: true,
})(EventsNew);

export default connect(() => ({
}), dispatch => ({ save: event => dispatch(addEvent(event)) }
))(NewEvent);
