import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Segment, Icon, List, } from 'semantic-ui-react';
import { Elements, StripeProvider, } from 'react-stripe-elements';
import { style, } from './style/inline.js';
import { PremiumForm, } from '../presentation';


const ModalContentStandard = props => {
  return (
    <>
      <Modal.Content>
        <div style={ style.modalContent }>
          <h3 style={ style.modalContentHeader }>Get unlimited access to all Alertifi features when you sign up for a premium membership</h3>

          <List relaxed>
            <List.Item style={ style.listItem }>
              <List.Icon name='bullhorn' style={ style.listIcon } />
              <List.Content style={ style.listContent }>Premium Feature One</List.Content>
            </List.Item>

            <List.Item style={ style.listItem }>
              <List.Icon name='calendar alternate' style={ style.listIcon }  />
              <List.Content style={ style.listContent }>Premium Feature Two</List.Content>
            </List.Item>

            <List.Item style={ style.listItem }>
              <List.Icon name='globe' style={ style.listIcon }  />
              <List.Content style={ style.listContent }>Premium Feature Three</List.Content>
            </List.Item>
          </List>

          <Button 
            positive
            style={ style.modalContentPremiumButton }
            onClick={ props.handleClick }
          >
            Go Premium!
          </Button>
        </div>
      </Modal.Content>

      <Modal.Actions>
        <Button
          negative
          style={ style.modalActionsCloseButton }
          onClick={ props.handleClose }
        >
          Close
        </Button>
      </Modal.Actions>
    </>
  );
}

const ModalContentPremium = props => {
  return (
    <> 
      <Modal.Content>
        <div style={ style.modalContent }>
          <h3 style={ style.modalContentHeader }>Thank you for being a premium member!</h3>
        </div>
      </Modal.Content>

      <Modal.Actions>
        <Button
          positive
          style={ style.modalActionsCloseButton }
          onClick={ props.handleClose }
        >
          Ok
        </Button>
      </Modal.Actions>
    </>
  );
}

const SignedInModal = props => {



  return (
    <Modal
      id='signed-in-modal'
      name='signedInModal'
      style={ props.user.accountType === 'standard' ? style.modalContainerStandard : style.modalContainerPremium }
      open={ props.signedInModal.open }
      closeOnEscape={ false }
      closeOnDimmerClick={ false }
      closeIcon={ false }
    >
      
      <Modal.Header style={ style.modalHeader }>
        Welcome to Alertifi!
      </Modal.Header>

      { props.user.accountType === 'standard' && <ModalContentStandard handleClick={ props.handleGoPremiumClick } handleClose={ props.handleClose } /> }
      { props.user.accountType === 'premium' && <ModalContentPremium handleClose={ props.handleClose } /> }

    </Modal>
  );
}


export default SignedInModal;