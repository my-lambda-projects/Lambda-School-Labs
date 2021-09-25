import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Navbar, NavbarBrand } from 'mdbreact';
import { TextField } from 'material-ui';
import PropTypes from 'prop-types';
import '../css/stripeAddressSection.css';

/* eslint-disable react/forbid-prop-types, camelcase */

const renderTextField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => (
  <TextField
    floatingLabelText={label}
    floatingLabelFocusStyle={{
      color: 'black',
    }}
    underlineFocusStyle={{
      borderColor: 'white',
    }}
    underlineStyle={{
      borderColor: 'grey',
    }}
    errorText={touched && error}
    {...input}
    {...custom}
    style={{
      color: 'red',
    }}
  />
);
renderTextField.defaultProps = {
  meta: { touched: PropTypes.bool, error: PropTypes.string },
  label: '',
};
renderTextField.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string,
  meta: PropTypes.object,
};
class AddressSection extends React.Component {
  static propTypes = {
    setCCAddress: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    pristine: PropTypes.bool.isRequired,
    reset: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
  }
  handleFormSubmit = ({
    name, address_line1, address_line2, address_city, address_state, address_zip,
    address_country = 'US',
  }) => {
    // console.log(`username: ${username} password: ${password}`);
    this.props.setCCAddress({
      name,
      address_line1,
      address_line2,
      address_city,
      address_state,
      address_zip,
      address_country,
    });
  };
  render() {
    const {
      handleSubmit, pristine, reset, submitting,
    } = this.props;
    return (
      <div className="addressSection--form_container">
        <Navbar className="addressSection--box_navbar" dark>
          <NavbarBrand tag="span">Payment Address Info</NavbarBrand>
        </Navbar>
        <form onSubmit={handleSubmit(this.handleFormSubmit)}>
          <Field
            name="name"
            type="text"
            component={renderTextField}
            placeholder="Cardholder Name"
          />
          <Field
            name="address_line1"
            type="text"
            component={renderTextField}
            placeholder="Address 1"
          />
          <Field
            name="address_line2"
            type="text"
            component={renderTextField}
            placeholder="Address 2"
          />
          <Field
            name="address_city"
            type="text"
            component={renderTextField}
            placeholder="City"
          />
          <Field
            name="address_state"
            label="State"
            type="text"
            component={renderTextField}
            placeholder="State"
          />
          <Field
            name="address_zip"
            type="text"
            component={renderTextField}
            placeholder="Zip"
          />
          <div className="address--form_buttons">
            <button type="submit" disabled={pristine || submitting}>
                  Use This Payment Address
            </button>
            <button
              type="button"
              disabled={pristine || submitting}
              onClick={reset}
            >
                  Reset
            </button>
          </div>
        </form>
      </div>
    );
  }
}
export default reduxForm({
  form: 'addressSection', // a unique identifier for this form
  touchOnBlur: true,
})(AddressSection);
