import React from 'react';
// import './CompanyForm.css';

import { CreateCompany } from '../../graphQL/mutations/companies';

import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import styles from './styles';

class CompanyForm extends React.Component {
  constructor(props) {
    super(props);

    this.fileInput = React.createRef();
    this.state = {
      companyName: '',
      companyAddress: '',
      companyZip: '',
      companyState: '',
      companyCity: '',
      selected: 'create'
    };
  }
  handleChange = e => this.setState({ [e.target.name]: e.target.value });
  createCompanyObject = e => {
    e.preventDefault();
    const {
      companyName,
      companyAddress,
      companyCity,
      companyState,
      companyZip
    } = this.state;

    let companyObj = {
      name: companyName,
      address_1: companyAddress,
      city: companyCity,
      state: companyState,
      postal_code: companyZip
    };
    // check if logo is being uploaded prior to adding to companyObj
    if (this.fileInput.current.files[0]) {
      let logo = this.fileInput.current.files[0].name;
      companyObj = Object.assign({}, { ...companyObj }, { logo: logo });
      alert(JSON.stringify(companyObj));
    } else {
      alert(JSON.stringify(companyObj));
    }
    if (this.props.company.selected === 'create') {
      console.log(CreateCompany(companyObj));
    } else {
    }
  };
  static getDerivedStateFromProps(props, state) {
    if (props.selected !== state.selected) {
      return {
        selected: props.company.selected,
        companyName: props.company.companyName,
        companyAddress: props.company.companyAddress,
        companyZip: props.company.companyZip,
        companyState: props.company.companyState,
        companyCity: props.company.companyCity
      };
    } else {
      return {
        selected: 'create',
        companyName: '',
        companyAddress: '',
        companyZip: '',
        companyState: '',
        companyCity: ''
      };
    }
  }
  render() {
    const { classes } = this.props;
    return (
      <section>
        <form onSubmit={this.createCompanyObject}>
          <TextField
            InputProps={{
              inputProps: {
                className: classes.textField
              }
            }}
            InputLabelProps={{
              className: classes.label
            }}
            style={{ fontSize: '2rem' }}
            label="Company Name"
            id="standard-with-placeholder"
            name="companyName"
            onChange={this.handleChange}
            value={this.state.companyName}
            placeholder="Company Name"
            margin="normal"
          />
          <TextField
            InputProps={{
              inputProps: {
                className: classes.textField
              }
            }}
            InputLabelProps={{
              className: classes.label
            }}
            style={{ fontSize: '2rem' }}
            label="Address"
            id="standard-with-placeholder"
            name="companyAddress"
            onChange={this.handleChange}
            value={this.state.companyAddress}
            placeholder="company address"
            margin="normal"
          />
          <TextField
            InputProps={{
              inputProps: {
                className: classes.textField
              }
            }}
            InputLabelProps={{
              className: classes.label
            }}
            style={{ fontSize: '2rem' }}
            label="City"
            id="standard-with-placeholder"
            name="companyCity"
            onChange={this.handleChange}
            value={this.state.companyCity}
            placeholder="city"
            margin="normal"
          />
          <TextField
            InputProps={{
              inputProps: {
                className: classes.textField
              }
            }}
            InputLabelProps={{
              className: classes.label
            }}
            style={{ fontSize: '2rem' }}
            label="State"
            id="standard-with-placeholder"
            name="companyState"
            onChange={this.handleChange}
            value={this.state.companyState}
            placeholder="state"
            margin="normal"
          />
          <TextField
            InputProps={{
              inputProps: {
                className: classes.textField
              }
            }}
            InputLabelProps={{
              className: classes.label
            }}
            style={{ fontSize: '2rem' }}
            label="Zip Code"
            id="standard-with-placeholder"
            name="companyZip"
            onChange={this.handleChange}
            value={this.state.companyZip}
            placeholder="zip"
            margin="normal"
          />
          <TextField
            InputProps={{
              inputProps: {
                className: classes.textField
              }
            }}
            InputLabelProps={{
              className: classes.label
            }}
            style={{ fontSize: '2rem' }}
            label="Logo"
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            name="companyLogo"
            ref={this.fileInput}
            id="logo-input"
            margin="normal"
          />
          <p className="notes-caption">* Only accepts png/jpeg/jpg formats</p>
          <Button type="submit" variant="contained" color="secondary">
            Save Company
          </Button>
        </form>
      </section>
    );
  }
}

export default withStyles(styles)(CompanyForm);
