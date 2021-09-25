import React, { Component } from 'react';
import { Elements } from 'react-stripe-elements';

import StripeForm from './stripeForm';
import Loader from './loader';

import './newUser.css'

class NewUser extends Component {
  constructor() {
    super();
    this.state = {
      userPledge: null,
      loading: false,
      windowSize: null,
      loadFinish: false
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount(){
    if (sessionStorage.getItem('loggedIn')) {
      this.props.history.push('voting');
    }
    if (this.props.location.state) {
      this.setState(() => ({ 
        userPledge: this.props.location.state.userPledge,
        windowSize: window.innerWidth
       }));
    }
  }

  onSubmit() {
    document.getElementById("userContainer").style.display=('none');
    this.setState(() => ({ loading: true }));
  }

  render() {
    return (
      <div className="mainContainer">
        <Loader loading={this.state.loading}/>
        <div className="userContainer" id="userContainer">
          <img className="logo" id="logo" src={require('../static/logo.png')} alt="Numberless" />
          <Elements>
            <StripeForm  
              onSubmit={this.onSubmit} 
              userPledge={this.state.userPledge} 
              history={this.props.history} 
              windowSize={this.state.windowSize}/>
          </Elements>
        </div>
      </div>
    );
  }
}

export default NewUser;