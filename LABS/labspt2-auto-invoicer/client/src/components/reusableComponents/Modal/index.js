import React from "react";
import Close from "@material-ui/icons/Close";
import PropTypes from "prop-types";
// import css here
import "./Modal.css";

class Modal extends React.Component {
  close = () => this.props.close();
  render() {
    return (
      <div className="backdrop">
        <div className="modal">
          <span className="close-icon">
            <Close id="close" onClick={this.close} />
          </span>
          {/* if you want to add your own tags inside modal this is where they will output in this.props.children */}
          {this.props.children}
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  close: PropTypes.func
};

export default Modal;
