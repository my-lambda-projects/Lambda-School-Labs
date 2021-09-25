/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class ConfirmSpending extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    const closeBtn = (
      <button className="close" onClick={this.toggle}>
        &times;
      </button>
    );

    return (
      <React.Fragment>
        <Button
          onClick={this.toggle}
          id={this.props.id}
          disabled={this.props.disabled}
          color={this.props.color}
          size={this.props.size}
          className={this.props.className}
        >
          <i className={this.props.btn2Icon} />
          {this.props.buttonLabel}
        </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle} close={closeBtn}>
            Confirm spending credits?{" "}
          </ModalHeader>
          <ModalBody>Are you sure you want to spend credits on this?</ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={() => {
                this.props.confirmAction();
                this.toggle();
              }}
            >
              Confirm
            </Button>{" "}
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </React.Fragment>
    );
  }
}

export default ConfirmSpending;
