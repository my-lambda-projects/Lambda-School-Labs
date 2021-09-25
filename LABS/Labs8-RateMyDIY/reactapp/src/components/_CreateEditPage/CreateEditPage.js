import React, { Component } from "react";
import { connect } from "react-redux";
import "./CreateEditPage.css";

class CreateEditPage extends Component {
  render() {
    return (
      <div className="editPage">
        <div className="top">
          <h1>Project name</h1>
          <h2>* * * * *</h2>
          <button>Reviews</button>
        </div>
        <div className="commentPictures">
          <p>Cute pupper</p>
          <img alt="PLACEHOLDER! alt text"
            src={
              "data:image/jpeg;base64,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"
            }
          />
          <p>Cute pupper</p>
          <img alt="PLACEHOLDER! alt text"
            src={
              "data:image/jpeg;base64,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"
            }
          />
          <p>Cute pupper</p>
          <img alt="PLACEHOLDER! alt text"
            src={
              "data:image/jpeg;base64,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"
            }
          />
        </div>
        <div className="twoButtons">
          <button>Add Text Field</button>
          <button>Add Picture</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    state
  };
};

export default connect(
  mapStateToProps,
  {}
)(CreateEditPage);