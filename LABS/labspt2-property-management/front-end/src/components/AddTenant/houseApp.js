import React, { Component } from "react";
import Dropzone from "react-dropzone";
import axios from "axios";

const url = "https://tenantly-back.herokuapp.com/images";

/*House Application */

class HouseApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgSrc: null,
      file: null,
      url: null
    };
  }
  handleOnDrop = file => {
    if (file && file.length > 0) {
      this.setState({ imgSrc: file[0].name, file: file[0] });
      const formData = new FormData();
      formData.append("image", this.state.file);
      const config = {
        headers: {
          "content-type": "multipart/form-data"
        }
      };
      axios
        .post(url, formData, config)
        .then(response => {
          this.setState({ url: response.data });
          this.updateUrl();
        })
        .catch(error => {});
    }
  };

  updateUrl() {
    this.props.url(this.state.url);
  }

  render() {
    return (
      <div className="addApp">
        <h1>Housing Application</h1>
        {this.state.imgSrc !== null ? (
          <div
            onClick={() => {
              this.setState({ imgSrc: null });
            }}
          >
            <h1>{this.state.imgSrc}</h1>{" "}
          </div>
        ) : (
          <Dropzone onDrop={this.handleOnDrop}>
            {({ getRootProps, getInputProps }) => (
              <div>
                <div {...getRootProps()} className="dropzone">
                  <input {...getInputProps()} />
                  <p>Upload Application</p>
                </div>
              </div>
            )}
          </Dropzone>
            )}
      </div>
    );
  }
}

export default HouseApp;
