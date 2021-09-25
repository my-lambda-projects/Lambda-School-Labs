import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Segment, Icon, } from 'semantic-ui-react';
import { Elements, StripeProvider, } from 'react-stripe-elements';
import { style, } from './style/inline.js';
import { PremiumForm, } from '../presentation';

const BillingModal = props => {

  return (
    <Modal
      id='billing-modal'
      name='billingModal'
      style={ style.modalContainer }
      open={ props.billingModal.open }
      closeOnEscape={ false }
      closeOnDimmerClick={ false }
      closeIcon={ false }
      onClose={ props.handleClose }
    >
      
      <Modal.Header style={ style.modalHeader }>

        <div>
          <Icon style={ style.headerIcon }name='payment' />
          <h2 style={ style.modalTitle }>Payment Information</h2>
        </div>

        <Icon 
          fitted
          style={ style.closeIcon } 
          name='close' 
          onClick={ props.handleClose }
        />

      </Modal.Header>

      <Modal.Content>

        <StripeProvider apiKey='pk_test_5S7b3sU9cayM2p0lyZCGZR5e00mmeHbCML'>
          <Elements>
            <PremiumForm 
              { ...props } 
              handleChange={ props.handleChange } 
              handleSubmit={ props.handleSubmit } 
              handlePaymentSuccessModal={ props.handlePaymentSuccessModal }
            />
          </Elements>
        </StripeProvider>
      
      </Modal.Content>

    </Modal>
  );
}


export default BillingModal;