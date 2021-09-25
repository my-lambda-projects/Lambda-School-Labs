import React, {Component} from "react";
import Axios from "axios";
import "./css/upload.css";
import Dropzone from 'react-dropzone';
import { Alert } from "react-bootstrap";
import {
    CubeGrid
  } from 'better-react-spinkit';
  import { connect } from 'react-redux';
  import { refreshUserState } from "../actions";
   
class Upload extends Component{
    constructor() {
        super();
        this.state = {
            show: noShow,
            image: "",
            isLoading: false,
            showSuccessMessage: false
        }
    }

    handleFileUpload = (e) => {
        if(e.target.files[0]) { //Only if a file has been chosen do we run this
            this.setState({
                show: show,
            })
            this.setState({
                image: e.target.files[0],
                preview: URL.createObjectURL(e.target.files[0])
            })
        }

        return; //Otherwise we return and let the image stay as is

    }

    onDrop(files) {
        this.setState({
            show: show,
        })
        
        this.setState({
          image: files[0],
          preview: URL.createObjectURL(files[0])

        });
      }

    onSubmit = (event) => {
        event.preventDefault();
        const image = new FormData();
        image.append("file", this.state.image) 
        image.append("upload_preset", "u03iyxti") //Sends data as a file to our server
        image.append("api_key", "895718742668927")
        image.append("timestamp", (Date.now() / 1000) | 0);

        //set state to true for loading in order to display spinner
        this.setState({ isLoading: true });

     Axios({
        url:"https://api.cloudinary.com/v1_1/picme/image/upload",
        method: "POST",
        headers: { 
            "X-Requested-With": "XMLHttpRequest"
        },
        data: image
    }).then(response => {
      const data = response.data;
      const uploads = {
          email: localStorage.email,
          name: data.public_id,
          url: data.url,
      }

      Axios.post(`${process.env.REACT_APP_API}/upload`, uploads, {
          headers: {
            "Authorization": `Bearer ${window.localStorage.token}`
          }
      })
      .then(res => {
          this.setState({ isLoading: false, showSuccessMessage: true, show: noShow });
          setTimeout(() => {
            this.setState({showSuccessMessage: false})
          }, 500) //Timeout so the success message can show for a small moment

      }).catch(err => {
          console.log(err);
      })
    }).catch(err => {
        console.log(err)
    })
}



    render() {
        this.props.refreshUserState() //Refreshs user state on component render
            return (
                <div className="uploads">
                    <div>
                        <img style ={this.state.show} src={this.state.preview} alt="" width="50%" height="40%"/>
                    </div>
                    <div className="Settings">
                        { this.state.showSuccessMessage ?
                        <Alert bsStyle="success" onDismiss={this.handleOnDismiss}> 
                        Photo upload was succesful!
                        </Alert> : null }
                        { this.state.isLoading ? <CubeGrid style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', marginBottom: '20px' }} /> : null }
                    </div>
    
                    <form id="Uploads__form" onSubmit={this.onSubmit} encType='multipart/form-data'>
    
                    <div className="dropzone">
                    <Dropzone disableClick={true} className="dropzone__input" onDrop={this.onDrop.bind(this)}>
                        <p>Drop a file to upload or  
    
                            <input style={noShow} name="image" id="file" type="file" onChange={this.handleFileUpload}/>
                            <label htmlFor="file">Choose a file</label>
                        </p>
                    </Dropzone>
                    </div>
                        <div className="Uploads__pic">
                            <div className="tablet__label">
                                <input  style={noShow} name="image" id="file" type="file" onChange={this.handleFileUpload}/>
                                <label htmlFor="file">Choose a file</label>
                            </div>
                            <button style={this.state.show} type="submit">submit</button>
                        </div>
                    </form>
                </div>
            )
        }
}

const noShow={
    display: "none"
}

const show = {

}

export default connect(null, {refreshUserState})(Upload);
