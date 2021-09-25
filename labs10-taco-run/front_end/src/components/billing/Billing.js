import React from 'react';
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { withAlert } from 'react-alert'

class Billing extends React.Component {
  constructor(){
    super();
    this.state = {
      usersEmail: '',
      isPrem: '',
      error: '',
      loading: true
    };
  }

  onToken = (token) => {
    
    fetch('https://production-taco.herokuapp.com/payments', {
      method: 'POST',
      body: JSON.stringify(token),
    }).then(response => {

      /*
        if we are successful we update the users profile to be a preimum account
        which requires a put clal to users/prem
      */

      response.json().then(data => {
        this.props.alert.show('Thank you for your purchase!')
        let id = localStorage.getItem("user_id")
        let upgrade = {isPremium: true}
        axios.put(`https://production-taco.herokuapp.com/users/${id}/prem`, upgrade)
        .then(res => {
          this.setState({ //then we set state to isPrem to change the value of the turn in the browser
            isPrem: true
          })
        })
        .catch(error => {
          console.log(error)
        })
      });
    });
  }

  componentDidMount(){
    let id = localStorage.getItem("user_id")
    axios.get(`https://production-taco.herokuapp.com/users/${id}/info`)
    .then(response => {
      
      this.setState({
        usersEmail: response.data.email,
        isPrem: response.data.isPremium,
        loading: false
      })
    })
  }

  /* 
    made a nested turn, wheres whats going on
    turn 1: loading as default then shows info
    turn 2: shows either primium account or option to pay for it
  */

  render() {
    
    return (
      <div>
        {this.state.loading ? (
          <p>Loading . . . </p>
        ) : 
        <div>
        {this.state.isPrem ? (
            <p>all paid for the year enjoy</p>
        ) : 
          <div className = "stripe-checkout-wrapper">
            <h1>Upgrade Account here</h1>
            <p>
              for only 10 dollars we can have your account upgraded
              to invite over 10 people to a taco event
            </p>
            <StripeCheckout
              email={this.state.usersEmail}
              stripeKey="pk_test_1vnAsV5hSHEMk2DhNgXO4eum"
              token={this.onToken}
            />      
          </div>
        }
        </div>
      }
      </div>
    );
  }; 
};

export default withAlert()(Billing);