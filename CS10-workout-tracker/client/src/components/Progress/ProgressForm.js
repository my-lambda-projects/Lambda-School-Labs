import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { addProgress } from "../../actions";

class ProgressForm extends Component {
  state = {
    weight: "",
    hips: "",
    waist: "",
    r_arm: "",
    l_arm: "",
    r_leg: "",
    l_leg: "",
    error: false,
    modal: false
  };

  toggle = () => {
    this.setState({
      weight: "",
      hips: "",
      waist: "",
      r_arm: "",
      l_arm: "",
      r_leg: "",
      l_leg: "",
      error: false,
      modal: !this.state.modal
    });
  };

  handleFieldChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();

    let { weight, hips, waist, r_arm, l_arm, r_leg, l_leg } = this.state;

    if (weight === "" || waist === "") {
      this.setState({ error: true });
    } else {
      this.props.addProgress({
        weight,
        hips,
        waist,
        r_arm,
        l_arm,
        r_leg,
        l_leg
      });

      this.setState({
        weight: "",
        hips: "",
        waist: "",
        r_arm: "",
        l_arm: "",
        r_leg: "",
        l_leg: "",
        error: false,
        modal: !this.state.modal
      });
    }
  };

  render() {
    return (
      <div className="modal-container">
        <Button className="add-progress-btn" onClick={this.toggle}>
          Add Progress
          {this.props.buttonLabel}
        </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>Progress Form</ModalHeader>
          {this.state.error && (
            <div className="error">* Weight and waist are required fields.</div>
          )}
          <ModalBody>
            <form className="progressForm">
              <div className="label-input">
                <label>*Weight:</label>
                <input
                  type="number"
                  name="weight"
                  value={this.state.weight}
                  onChange={this.handleFieldChange}
                />
              </div>
              <div className="label-input">
                <label>*Waist:</label>
                <input
                  type="number"
                  name="waist"
                  value={this.state.waist}
                  onChange={this.handleFieldChange}
                />
              </div>
              <div className="label-input">
                <label>Hips:</label>
                <input
                  type="number"
                  name="hips"
                  value={this.state.hips}
                  onChange={this.handleFieldChange}
                />
              </div>
              <div className="label-input">
                <label>(R) Arm:</label>
                <input
                  type="number"
                  name="r_arm"
                  value={this.state.r_arm}
                  onChange={this.handleFieldChange}
                />
              </div>
              <div className="label-input">
                <label>(L) Arm:</label>
                <input
                  type="number"
                  name="l_arm"
                  value={this.state.l_arm}
                  onChange={this.handleFieldChange}
                />
              </div>
              <div className="label-input">
                <label>(R) Leg:</label>
                <input
                  type="number"
                  name="r_leg"
                  value={this.state.r_leg}
                  onChange={this.handleFieldChange}
                />
              </div>
              <div className="label-input">
                <label>(L) Leg:</label>
                <input
                  type="number"
                  name="l_leg"
                  value={this.state.l_leg}
                  onChange={this.handleFieldChange}
                />
              </div>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button className="submit-btn--blue" onClick={this.handleSubmit}>
              Submit Progress
            </Button>{" "}
            <Button className="submit-btn--grey" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

ProgressForm.propTypes = {
  addProgress: PropTypes.func
};

export default connect(
  null,
  { addProgress }
)(ProgressForm);
