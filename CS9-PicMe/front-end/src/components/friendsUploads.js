import React, {Component} from 'react';
import { Button } from 'semantic-ui-react'
import Gallery from 'react-photo-gallery';
import './css/MyCollectionPage.css';
import axios from "axios";
import SelectedImage from "./SelectedImage";


let PHOTO_SET = [

]


export default class friendsUploads extends Component {
    constructor(props) {
        super(props);
        this.state= {
            photos: PHOTO_SET,
            id: "",
            show: nowshow,
            selectedImageIds: []
        };
        // select photo binding
        this.selectPhoto = this.selectPhoto.bind(this);
        // select binding
        this.toggleSelect = this.toggleSelect.bind(this);
        // add to collection binding
        // download selected
        }

    // select photo function
    selectPhoto(event, obj) {
        let photos = this.state.photos;
        let selectedImageIds = this.state.selectedImageIds;
        photos[obj.index].selected = !photos[obj.index].selected;
        if (photos[obj.index].selected) {
          selectedImageIds.push(photos[obj.index].id)
        } else {
          selectedImageIds = selectedImageIds.filter( id => id !== photos[obj.index].id )
        }
          this.setState({ photos: photos, selectedImageIds: selectedImageIds });
    }

    handleButtonClick = async () => {
      let credits = document.getElementsByClassName("header")
      credits = Array.from(credits)
      credits = credits[1].innerHTML
      credits = credits.split(":")
      credits = credits[1];
      credits = Number(credits)
      //Very last minute implementation of getting a user's credits

      if(credits < 1) return; //If not enough credits we return

      
      const payload = {
        imageIds: this.state.selectedImageIds,
        email: localStorage.email
      }

      const headers = {
        headers: {
          "Authorization": `Bearer ${window.localStorage.token}`
        }
      };

      await axios.post(`${process.env.REACT_APP_API}/add-images-to-collection`, payload, headers);
    }

    // select all photos function
    toggleSelect() {
        let photos = this.state.photos.map((photo, index) => {
            return { ...photo, selected: !this.state.selectAll };
        });
        this.setState({ photos: photos, selectAll: !this.state.selectAll });
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

    componentDidMount() {
        PHOTO_SET = [ //Needs to be reset or else the state for photo_set lingers and causes bugs

        ]
        this.setState({
            photos: ""
        })
        // window.location.reload()
        //Grab the user id from shareable link
        let id = window.location.href.split("/")[5]
        //pass the id onto our route in order to fetch images
        axios.get(`${process.env.REACT_APP_API}/friend/${id}`, {
            headers: {
                "Authorization": `Bearer ${window.localStorage.token}`
              }
        })
        .then(response => {
            response.data.forEach(image => {
                PHOTO_SET.push({
                    src: image.url,
                    id: image.id,
                    width: 1,
                    height: .7
                })
                //Sets our images in an object as specified by Gallery docs
                this.setState({
                    photos: PHOTO_SET
                })
            })
        }).catch(err => {
            console.log(err);
        })
    }


    render() {
        return(
          <div>
            <Button onClick={this.handleButtonClick} color='blue' size='large'>Add Selected Photos to My Collection</Button>
            <br />
            <br />
            <div className="component-wrapper">
                <h1> Friends photo uploads: </h1>

                {this.state.photos.length > 0 ? <Gallery
                photos={this.state.photos}
                onClick={this.selectPhoto}
                ImageComponent={SelectedImage}
                direction={"column"}
                /> : null}
            </div>
          </div>
        );
    }
}

const nowshow = {
    display: "none"
}

const show = {
    display: "block"
}
