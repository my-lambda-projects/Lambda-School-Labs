import React, {Component} from 'react';
import Gallery from 'react-photo-gallery';
import './css/MyCollectionPage.css';
import axios from "axios";
import SelectedImage from "./SelectedImage";
import { Modal, Button } from 'semantic-ui-react';


export default class Uploads extends Component {
    constructor(props) {
        super(props);
        this.state= {
            photos: [],
            id: "",
            show: nowshow,
            modalOpen: false,
            modalDescription: ""
        };
        // select photo binding
        this.selectPhoto = this.selectPhoto.bind(this);
        // select binding
        this.toggleSelect = this.toggleSelect.bind(this);
        // add to collection binding
        this.toggleSubmit = this.toggleSubmit.bind(this);
        // download selected
    }

    // select photo function
    selectPhoto(event, obj) {
        let photos = this.state.photos;
        photos[obj.index].selected = !photos[obj.index].selected;
        this.setState({ photos: photos });
    }

    // select all photos function
    toggleSelect() {
        let photos = this.state.photos.map((photo, index) => {
            return { ...photo, selected: !this.state.selectAll };
        });
        this.setState({ photos: photos, selectAll: !this.state.selectAll });
    }

    //submit
    toggleSubmit(event, obj, index) {
        let selected = false;
        for (let photo in this.state.photos) {
            if (photo.selected) selected = true;
        }
        if (selected) {
            this.handleOpen("Selected Photos have been removed from your uploads");
        } else {
            this.handleOpen("No photos selected for removal");
        }
    }

    show = () => {
        if(this.state.show === nowshow) { 
            this.setState({
                show: show
            })
        } else {
            this.setState({
                show: nowshow
            })
        }
    }

    handleOpen = desc => this.setState({ modalOpen: true, modalDescription: desc })

    handleClose = () => this.setState({ modalOpen: false })

    componentDidMount() {
        axios.post(`${process.env.REACT_APP_API}/uploads`, {email: localStorage.getItem('email')}, {
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${window.localStorage.token}`
            }
        })
        .then(response => {
            const imgs = [];
            response.data.forEach(imgData => {
                const img = { src: imgData.url, name: imgData.name, height: .7, width: 1 };
                imgs.push(img);
            })
            this.setState({photos: imgs});
        })
        .catch(err => console.error("Uploads CDM: ", err));
    }

    shareLink() {
        const email = {
            email: localStorage.email
        }
        axios.post(`${process.env.REACT_APP_API}/fetchUserId`, email)
        .then(response => {
            const id = response.data;

            let link = document.getElementById("link");
            const host = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
            link.innerHTML = `${host}/friend/uploads/${id}`;

            let code = document.getElementById("code");
            code.innerHTML = `Code: ${id}`;
        }).catch(err => {
            console.log(err)
        })

    }

    render() {
        const modalStyle = {
            margin: 'auto',
            marginTop: '50% - 80px',
            height: '160px'
        };
        return(
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
                    <h1 className="header-title"> Your photo uploads </h1>
            </div>
            <div>
            <button onClick={() => {
                this.shareLink()
                this.show()
            }} className="accordion">Share Link</button>
            <div style={this.state.show} className="panel">
                <p id="link" style={show}></p>
                <p id="code" style={show}></p>
            </div>
            </div>
                {this.state.photos.length > 0 ? <Gallery
                photos={this.state.photos}
                onClick={this.selectPhoto}
                ImageComponent={SelectedImage}
                direction={"column"}
                /> : null}
          </div>
        );
    }
}

const nowshow = {
    display: "none"
}

const show = {
    display: "block",
    height: "100%",
    color: "#9358c4",
    wordWrap: "break-word", //text can wrap
    fontSize: "1.2rem"
}
