import React from "react";
import YouTube from "react-youtube";
import { Button, Modal, ModalBody } from "reactstrap";
import "./index.css";

class ModalExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  render() {
    const opts = {
      height: "390",
      maxWidth: "640",
      width: "100%",
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1
      }
    };
    return (
      <div>
        <Button
          color="danger"
          className="btn btn-danger btn-round"
          onClick={this.toggle}
        >
          See Details
        </Button>
        <Modal
          autoFocus
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalBody>
            <YouTube
              videoId="C8qXvfXvkPs"
              opts={opts}
              onReady={this._onReady}
            />
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default ModalExample;
