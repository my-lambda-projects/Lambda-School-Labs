import React, {Component} from 'react';
import Gallery from 'react-photo-gallery';
import './css/MyCollectionPage.css';
import SelectedImage from "./SelectedImage";
import axios from 'axios';
import { Modal, Button } from 'semantic-ui-react';

export default class MyCollectionPage extends Component {
  state= {
    photos: [],
    selectAll: false
  };

  async componentDidMount() {
    this.getPhotos();
  }

  // Retrieves photos from the backend and updates state
  getPhotos = () => {
    const headers = {headers: {"Authorization": `Bearer ${window.localStorage.token}`}};
    axios.get(`${process.env.REACT_APP_API}/collection/${localStorage.email}`, headers)
    .then(response => {
      let photos = response.data;
      photos = photos.map( photo => {
        return {
          src: photo.url,
          width: 1,
          height: 1,
          id: photo.id,
          ownerid: photo.uploaded_image_user_id
        }
      });
      this.setState({ photos: photos });
    }).catch(err => console.log(err))
  }

  selectPhoto = (event, obj) => {
    let photos = this.state.photos;
    photos[obj.index].selected = !photos[obj.index].selected;
    this.setState({ photos: photos });
  }

  toggleSelect = () => {
    let photos = this.state.photos.map((photo, index) => {
      return { ...photo, selected: !this.state.selectAll };
    });
    this.setState({ photos: photos, selectAll: !this.state.selectAll });
  }

  toggleSubmit = (event, obj, index) => {
    const imgs = this.state.photos.filter(x => x.selected).map(x => x.id);
    if (imgs.length === 0) {
      this.handleOpen("No photos selected for removal");
      return;
    }
    const imageData = {
      email: window.localStorage.email,
      imageIds: imgs
    }
    axios.post(`${process.env.REACT_APP_API}/removeFromCollection/`, imageData, {
      headers: {
        "Authorization": `Bearer ${window.localStorage.token}`
      }
    }).then(response => {
      this.getPhotos();
      this.handleOpen("Selected photos have been removed from your collection");
    }).catch(err => {
      console.log(err);
      this.handleOpen("There was an error removing photos from your collection");
    })
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
          <h1 className="header-title"> Your photo collection </h1>
          <div className="button-container">
            <p>
              <button className="toggle-select" onClick={this.toggleSelect}>
                Select all
              </button>
              <button className="remove-from-your-collection" onClick={this.toggleSubmit}>
                Remove selected
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
