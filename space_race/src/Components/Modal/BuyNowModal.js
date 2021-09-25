import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {signup,signUpToggle} from '../../Actions';

class BuyNowModal extends Component { 
    constructor(props){
        super(props);
    }
    toggle() {
        this.props.signUpToggle(this.props.modal);
    }
    render() {
        console.log(this.props.modal)
        return (<Modal isOpen={this.props.modal} toggle={this.toggle.bind(this)} className="">
          <ModalHeader toggle={this.toggle.bind(this)}>Modal title</ModalHeader>
          <ModalBody>
            By clicking on "Agree and Purchase" you are agreeing to purchase a subscription for a monthly fee of $
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle.bind(this)}>Agree and Purchase</Button>{' '}
            <Button color="secondary" onClick={this.toggle.bind(this)}>Cancel</Button>
          </ModalFooter>
        </Modal> );
  }
}

const mapStateToProps = state => {
    return {
      auth: state.auth,
      modal: state.modal
    };
};
  
export default withRouter(connect(mapStateToProps, {signUpToggle})(BuyNowModal));