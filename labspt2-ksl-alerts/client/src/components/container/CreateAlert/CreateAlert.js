import React, { Component } from 'react';
import { CreateAlertForm, } from '../../presentation/presentation.js';
import { Segment, } from 'semantic-ui-react';
import { appUrl } from '../../../constants.js';
import axios from 'axios';

class CreateAlert extends Component {
  constructor(props) {
    super(props);

    this.state = {
      alertTitleInput: {
        value: '',
      },
      keywordSearchInput: {
        value: '',
      },
      categorySearchInput: {
        value: '',
      },
      priceRangeFromInput: {
        value: '',
      },
      priceRangeToInput: {
        value: '',
      },
      zipInput: {
        value: '',
      },
      distanceFromDropdown: {
        value: '25',
      },
      sellerTypeRadio: {
        value: '',
      },
      photosRadio: {
        value: '',
      },
      listingTypeRadio: {
        value: '',
      },
      listingPostedRadio: {
        value: '',
      }
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: {
        value: e.target.value,
      }
    });
  }

  handleDistanceFromDropdownChange = (e, { value }) => {

    this.setState({
      distanceFromDropdown: {
        value,
      }
    });
  }

  handleSubmit = e => {
    e.preventDefault();

    const { token, } = this.props.authorization;
    const authType = this.props.authorization.type;
    const { username, email, } = this.props.user;
    const urlQuery = `https://classifieds.ksl.com/search?category[]=${ this.state.categorySearchInput.value }&subCategory[]=&keyword=${ this.state.keywordSearchInput.value }&priceFrom=${ this.state.priceRangeFromInput.value }&priceTo=${ this.state.priceRangeToInput.value }&zip=${ this.state.zipInput.value }&miles=${ this.state.distanceFromDropdown.value }&sellerType[]=${ this.state.sellerTypeRadio.value }&marketType[]=${ this.state.listingTypeRadio.value }&hasPhotos[]=${ this.state.photosRadio.value }&postedTime[]=${ this.state.listingPostedRadio.value }`;

    axios({
      method: 'post',
      url: appUrl + '/api/alerts/create',
      headers: {
        'Authorization': token,
      },
      data: {
        username,
        email,
        authType,
        alert: {
          title: this.state.alertTitleInput.value,
          urlQuery,
        }
      }
    }).then(res => {

      console.log(res.data);

    }).catch(console.log);
    

  }

  render() {
    return (
      <Segment style={{ flex: '1', display: 'flex', justifyContent: 'center', }}>
        <CreateAlertForm
          { ...this.state }
          { ...this.props }
          handleChange={ this.handleChange }
          handleSubmit={ this.handleSubmit }
          handleDistanceFromDropdownChange={ this.handleDistanceFromDropdownChange }
        />
      </Segment>
    );
  }
}

export default CreateAlert;
