import React, { Component } from 'react';
import axios from 'axios';
import { WithContext as ReactTags } from 'react-tag-input';
import styled from 'styled-components';
import './Upload.css';
import './Tags.css';
import Image from 'react-image-resizer';
import FileUpload from '@material-ui/icons/FileUpload';
import { Button, Input } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import withRoot from '../../withRoot';

axios.defaults.withCredentials = true;

const Container = styled.div`
  // display: flex;
  // justify-content: center;
  // align-items: center;
  // margin-top: 10%;
`;

const styles = theme => ({
  button: {
    marginTop: 20,
    marginBottom: 10
  }
});

const keyCodes = {
  comma: 188,
  enter: 13
};

const delimiters = [keyCodes.comma, keyCodes.enter];

class Upload extends Component {
  constructor(props) {
    super(props);

    this.state = {
      image: '',
      preview: undefined,
      tags: []
    };
  }

  handleDelete = i => {
    const { tags } = this.state;
    this.setState({
      tags: tags.filter((tag, index) => index !== i)
    });
  };

  handleAddition = tag => {
    this.setState(state => ({ tags: [...state.tags, tag] }));
  };

  handleDrag = (tag, currPos, newPos) => {
    const tags = [...this.state.tags];
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    this.setState({ tags: newTags });
  };

  onChange = e => {
    e.preventDefault();
    let reader = new FileReader();
    let image = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        image: image,
        preview: reader.result
      });
    };

    reader.readAsDataURL(image);
  };

  resetPreview = e => {
    e.preventDefault();
    this.setState({
      preview: undefined,
      tags: []
    });
    console.log('reset clicked');
  };

  onSubmit = e => {
    e.preventDefault();
    const { tags, image } = this.state;
    console.log('Tags:', tags);

    let formData = new FormData();

    formData.append('tags', JSON.stringify(tags));
    formData.append('image', image);
    axios
      .post('/api/pictures/upload', formData)
      .then(res => {
        console.log('upload successful');
      })
      .catch(err => console.log(err));
    this.resetPreview(e);

    this.resetPreview(e);
    // this.refs.image.value = '';
  };

  render() {
    let { preview, tags } = this.state;
    const { classes } = this.props;
    console.log(preview === undefined);
    if (preview) {
      return (
        <Container>
          <form onSubmit={this.onSubmit}>
            <div className="container">
              <h3> Upload </h3>
              <hr />
              <div className="content">
                <Button
                  variant="raised"
                  onClick={this.resetPreview}
                >
                  Change Upload?
                </Button>
                {/* Figure out how to adjust width based on device. Widths < 400px look awkward */}
                <Image src={preview} height={400} width={400} />
                <div>
                  <ReactTags
                    inline
                    tags={tags}
                    handleDelete={this.handleDelete}
                    handleAddition={this.handleAddition}
                    handleDrag={this.handleDrag}
                    delimiters={delimiters}
                  />
                </div>
                <div>
                  <Button
                    variant="raised"
                    color="secondary"
                    type="submit"
                    onClick={this.onSubmit}
                    className={classes.button}
                  >
                    Upload Image
                    <FileUpload />
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </Container>
      );
    } else {
      return (
        <Container>
          <form onSubmit={this.onSubmit}>
            <div className="container">
              <h3> Upload </h3>
              <hr />
              <div className="content">
                <div className="box">
                  <Input
                    type="file"
                    id="file"
                    name="image"
                    ref="image"
                    onChange={this.onChange}
                    className="inputfile"
                  />
                  <label className="fileLabel" htmlFor="file">
                    Select a File
                  </label>
                </div>
              </div>
            </div>
          </form>
        </Container>
      );
    }
  }
}

export default withRoot(withStyles(styles)(Upload));
