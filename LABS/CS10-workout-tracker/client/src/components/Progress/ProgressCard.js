import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  Card,
  CardBody,
  CardText,
  CardHeader,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
import moment from "moment";
import { deleteProgress, updateProgress } from "../../actions";

class ProgressCard extends Component {
  state = {
    weight: this.props.record.weight || "",
    hips: this.props.record.hips || "",
    waist: this.props.record.waist || "",
    r_arm: this.props.record.r_arm || "",
    l_arm: this.props.record.l_arm || "",
    r_leg: this.props.record.r_leg || "",
    l_leg: this.props.record.l_leg || "",
    error: false,
    modal: false
  };

  toggle = () => {
    this.setState({
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
      this.props.updateProgress(this.props.record._id, {
        weight,
        hips,
        waist,
        r_arm,
        l_arm,
        r_leg,
        l_leg
      });

      this.setState({
        error: false,
        modal: !this.state.modal
      });
    }
  };

  render() {
    const {
      _id,
      date,
      weight,
      waist,
      hips,
      r_arm,
      l_arm,
      r_leg,
      l_leg
    } = this.props.record;
    return (
      <div className="card-container">
        <Card>
          <CardHeader className="card-header">
            <div className="card-date">{moment(date).format("MM/DD/YYYY")}</div>
            <div className="btn-container">
              <div className="icon-btn" onClick={this.toggle}>
                <i className="fas fa-pencil-alt icon" />
              </div>
              <div
                className="icon-btn"
                onClick={() => this.props.deleteProgress(_id)}
              >
                {" "}
                <i className="fas fa-trash-alt icon" />
              </div>
            </div>
          </CardHeader>
          <CardBody>
            <CardText>{`Weight: ${weight} lbs`}</CardText>
            <CardText>{`Waist: ${waist} in`}</CardText>
            <CardText>{hips ? `Hips: ${hips} in` : "Hips: "}</CardText>
            <CardText>{r_arm ? `(R) Arm: ${r_arm} in` : "(R) Arm: "}</CardText>
            <CardText>{l_arm ? `(L) Arm: ${l_arm} in` : "(L) Arm: "}</CardText>
            <CardText>{r_leg ? `(R) Leg: ${r_leg} in` : "(R) Leg: "}</CardText>
            <CardText>{l_leg ? `(L) Leg: ${l_leg} in` : "(L) Leg: "}</CardText>
          </CardBody>
        </Card>

        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>Edit Progress</ModalHeader>
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
              Update Progress
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

ProgressCard.propTypes = {
  record: PropTypes.object,
  deleteProgress: PropTypes.func,
  updateProgress: PropTypes.func
};

export default connect(
  null,
  { deleteProgress, updateProgress }
)(ProgressCard);
