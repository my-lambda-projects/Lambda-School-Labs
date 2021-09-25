import React, {Component} from 'react';
import Gallery from 'react-photo-gallery';
import './css/MyCollectionPage.css';
import SelectedImage from "./SelectedImage";
import axios from 'axios';
import { Modal, Button } from 'semantic-ui-react';
import { addImageToCollection } from '../actions';
import { connect } from 'react-redux';

class MyCollectionPage extends Component {
  state = {
    photos: [],
    selectAll: false
  };

  componentDidMount() {
    this.getPhotos();
  }

  getPhotos = async () => {
    const headers = {headers: {"Authorization": `Bearer ${window.localStorage.token}`}};
    const data = (await axios.get(`${process.env.REACT_APP_API}/friends-images/${localStorage.email}`, headers)).data;
    const photos = data.images.map( photo => (
      {
        src: photo.url,
        width: 1,
        height: 1,
        id: photo.id,
        ownerid: photo.uploaded_image_user_id,
        owner: data.allUsers[photo.uploaded_image_user_id - 1].fullName
      }
    ));

    this.setState({ photos: photos });
  }

  selectPhoto = (event, obj) => {
    let photos = this.state.photos;
    photos[obj.index].selected = !photos[obj.index].selected;
    this.setState({ photos: photos });
  }

  handleSelectAllBtnClick = () => {
    let photos = this.state.photos.map(photo => ({ ...photo, selected: !this.state.selectAll }));
    this.setState({ photos: photos, selectAll: !this.state.selectAll });
  }

  handleAddPhotosBtnClick = async () => {
    const imgs = this.state.photos.filter(x => x.selected).map(x => x.id);
    if (imgs.length === 0) {
      this.handleOpen("Please select photo(s) to add to your collection.");
      return;
    }
    const payload = {
      email: localStorage.email,
      imageIds: imgs
    }

    const headers = {
      headers: {
        "Authorization": `Bearer ${window.localStorage.token}`
      }
    };

    this.props.addImageToCollection(payload);
  }

  handleOpen = desc => this.setState({ modalOpen: true, modalDescription: desc })

  handleClose = () => this.setState({ modalOpen: false })

  render() {
    const modalStyle = {
      margin: 'auto',
      marginTop: '50% - 80px',
      height: '160px'
    };

    return (
      <div className="component-wrapper">
        <Modal open={this.state.modalOpen} onClose={this.handleClose} size='small' style={modalStyle}>
          <Modal.Content>
            <Modal.Description>
              <h4>{this.state.modalDescription}</h4>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button primary onClick={this.handleClose}>
              OK
            </Button>
          </Modal.Actions>
        </Modal>

        <div className="header-container">
          <h1 className="header-title">Browse Friends' Photos</h1>
          <div className="button-container">
            <p>
              <button className="toggle-select" onClick={this.handleSelectAllBtnClick}>
                Select all
              </button>
              <button className="remove-from-your-collection" onClick={this.handleAddPhotosBtnClick}>
                Add Selected Photos to Your Collection 
              </button>
            </p>
          </div>
        </div>
        { this.state.photos.length > 0 ? 
            <div className="gallery-container">
              <Gallery
                photos={this.state.photos}
                onClick={this.selectPhoto}
                ImageComponent={SelectedImage}
                direction={"column"}
                margin={40}
              />
            </div> : null }
          </div>
    );
  }
}

export default connect(null, { addImageToCollection })(MyCollectionPage);
