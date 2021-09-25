import React, { Component } from 'react';
import { SignedInModal, BillingModal, PaymentSuccessModal, } from '../../presentation/presentation.js';
import { Modal, } from 'semantic-ui-react';
import { appUrl } from '../../../constants.js';
import axios from 'axios';

class Modals extends Component {
  constructor(props) {
    super(props);

    this.state = {
      signedInModal: {
        open: false,
      },
      billingModal: {
        open: false,
      },
      paymentSuccessModal: {
        open: false,
      },
      premiumForm: {
        price: 799,
        loading: false,
      },
      premiumFormNameInput: {
        value: '',
      },
      premiumFormSubmitButton: {
        disabled: false,
      }
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: {
        value: e.target.value,
      }
    })
  }

  handleSignedInModal = e => {

    const isOpen = this.state.signedInModal.open;

    this.setState({
      signedInModal: {
        open: !isOpen,
      }
    });
  }

  handleBillingModal = e => {

    const isOpen = this.state.billingModal.open;

    this.setState({
      billingModal: {
        open: !isOpen,
      }
    })
  }

  handleGoPremiumClick = e => {
    this.setState({
      signedInModal: {
        open: false,
      },
      billingModal: {
        open: true,
      }
    });
  }

  handlePremiumFormSubmit = (e, stripe) => {
    e.preventDefault();

    const { price } = this.state.premiumForm;

    this.setState({
      premiumForm: {
        loading: true,
        price,
      }
    });


    stripe.createToken({name: this.state.premiumFormNameInput.value })
      .then(data => {
        
        const authType = this.props.authorization.type;
        const token = this.props.authorization.token;
        const { username, email, } = this.props.user;
        const amount = this.state.premiumForm.price;

        axios({
          method: 'post',
          url: `${ appUrl }/api/users/payment`,
          headers: {
            'Authorization': token,
          },
          data: {
            username,
            email,
            authType,
            charge: {
              tokenId: data.token.id,
              amount,
            }
            
          },
        }).then(res => {

          this.setState({
            premiumForm: {
              loading: false,
              price,
            }
          });

          const { status } = res.data;

          console.log(res.data);

          if (status === 'succeeded') {
            this.setState({
              billingModal: {
                open: false,
              },
              paymentSuccessModal: {
                open: true,
              },
            });
          } else {
            alert('There was an issue processing your payment');
          }




        }).catch(console.log);
      }).catch(console.log);
  }

  handlePayementSuccessModal = e => {
    
    const open = this.state.paymentSuccessModal.open;

    this.setState({
      paymentSuccessModal: {
        open: !open,
      }
    });

  }  

  componentDidMount() {
    if (this.props.getSearchParams().success) {
      this.setState({
        signedInModal: {
          open: true,
        }
      });
    }
  }

  render() {
    return (
      <>

        <SignedInModal
          { ...this.props }
          { ...this.state }
          handleClose={ this.handleSignedInModal }
          handleGoPremiumClick={ this.handleGoPremiumClick }
        />

        <BillingModal 
          { ...this.props }
          { ...this.state }
          handleClose={ this.handleBillingModal }
          handleChange={ this.handleChange }
          handleSubmit={ this.handlePremiumFormSubmit }
        />

        <PaymentSuccessModal 
          { ...this.props }
          { ...this.state }
          handleClose={ this.handlePayementSuccessModal }
        />

      </>
    );
  }
}

export default Modals;