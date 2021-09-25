import React from 'react';
import { Modal, Button, } from 'semantic-ui-react';
import { style, } from './style/inline/inline.js';

const PaymentSuccessModal = props => {

    return (
        <Modal
            style={ style.modalContainer}
            open={ props.paymentSuccessModal.open }
        >

            <Modal.Header
                style={ style.modalHeader }
            > 
                Success!
            </Modal.Header>

            <Modal.Content
                style={ style.modalContent }
            >
                <h3>Thank you for becoming a premium member</h3>
            </Modal.Content>

            <Modal.Actions>
                <Button
                    primary
                    onClick={ props.handleClose }
                >
                    Ok
                </Button>
            </Modal.Actions>


        </Modal>
    );
}

export default PaymentSuccessModal;