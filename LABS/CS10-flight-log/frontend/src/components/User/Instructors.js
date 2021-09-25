import React from 'react';
import { Modal, ModalBody } from 'reactstrap';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import NavBar from '../NavBar';
import TopHeader from '../TopHeader';
import './Instructors.css';
import InstructorCard from './InstructorCard';
import Auth from '../Authenication/Auth';

// const dev = process.env.REACT_APP_DEV === "true" ? true : false;
// let URL;
// dev
//   ? (URL = "http://127.0.0.1:8000/api")
//   : (URL = "https://flightloggercs10.herokuapp.com/api");

const URL = process.env.REACT_APP_URL;

let headers;

class Instructors extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      instructors: [],
      name: '',
      license_number: '',
      photo: '',
      ratings: '',
      contact_number: '',
      contact_email: '',
      description: '',
      modal: false,
      closeAll: false,
      uploadurl: '',
      loading: false,
      nameError: false,
    };
  }

  componentDidMount() {
    // loading animation
    setTimeout(() => this.setState({ loading: false }), 950);
    axios({
      method: 'GET',
      url: `${URL}api/instructors/`,
      headers,
    })
      .then((res) => {
        this.setState({ instructors: res.data });
      })
      .catch((err) => {
        console.log('ERROR :', err);
      });
  }

  // toggles modal
  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  // closes modal and adds new instructor
  togglePost = (e) => {
    if (this.state.name.length === 0) {
      e.preventDefault();
      this.setState({ nameError: true });
      return;
    }
    if (this.state.uploadurl === '') {
      axios({
        method: 'POST',
        url: `${URL}api/instructors/`,
        data: {
          name: this.state.name,
          license_number: this.state.license_number,
          ratings: this.state.ratings,
          contact_email: this.state.contact_email,
          contact_number: this.state.contact_number,
          description: this.state.description,
          photo: this.state.photo,
        },
        headers,
      })
        .then((response) => {
          // console.log("put response", response);
          window.location.reload();
        })
        .catch((error) => {
          console.log('put error', error);
        });
    } else {
      axios({
        method: 'POST',
        url: `${URL}api/instructors/`,
        data: {
          name: this.state.name,
          license_number: this.state.license_number,
          ratings: this.state.ratings,
          contact_email: this.state.contact_email,
          contact_number: this.state.contact_number,
          description: this.state.description,
          photo: this.state.uploadurl,
        },
        headers,
      })
        .then(() => {
          // console.log("put response", response);
          window.location.reload();
        })
        .catch((error) => {
          console.log('put error', error);
        });
    }
  };


  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // cloudinary upload
  upload = () => {
    // eslint-disable-next-line
    window.cloudinary.openUploadWidget(
      { cloud_name: 'dkzzjjjj9', upload_preset: 'ggbmyqmo', cors: 'no-cors' },

      (error, result) => {
        if (this.state.uploadurl === '') {
          let imgurl;
          result
            ? (imgurl = result[0].url)
            : (imgurl = 'https://res.cloudinary.com/dkzzjjjj9/image/upload/v1539107817/Default%20Images/defaultInstructor.png');
          this.setState({ uploadurl: imgurl });
        } else if (this.state.uploadurl !== '') {
          let imgurl;
          imgurl = this.state.uploadurl;
          this.setState({ uploadurl: imgurl });
        }
        // this.setState({ uploadurl: imgurl });
        // console.log('===== stateurl: ', this.state.uploadurl);
      },
    )
    // eslint-disable-next-line
    false;
  };

  render() {
    headers = {
      Authorization: `JWT ${localStorage.getItem('token')}`,
    };

    const { loading } = this.state;
    if (loading) {
      return (
        <div className="Instructors">
          <NavBar />
          <TopHeader username={this.props.username} />
          <div className="InstructorCard">
            <Card className="Instructor-card-card">
              <div className="load-bar">
                <div className="bar" />
                <div className="bar" />
                <div className="bar" />
              </div>
            </Card>
          </div>
        </div>
      );
    }
    return (
      <div className="Instructors">
        <TopHeader breadcrumb={['settings']} username={this.props.username} />
        <NavBar />
        <div className="InstructorCard">
          <Card
            onClick={this.toggle}
            className="hover"
            style={{
              boxShadow: this.state.modal ? 'inset 1px 1px 1px gray' : '',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '400px',
              maxHeight: '568px',
            }}
          >
            <i
              className="fa fa-plus-circle fa-3x Plus-sign"
              aria-hidden="true"
              onClick={this.toggle}
            />
          </Card>
          {this.state.instructors.map(instr => (
            <InstructorCard key={instr.id} data={instr} />
          ))}
        </div>
        <Modal
          className="Instructor-edit-card-modal"
          isOpen={this.state.modal}
          toggle={this.toggle}
        >
          <div className="Instructor-edit-card">
            <h4>New Instructor </h4>
            {this.state.nameError ? <p>Please fill out the required fields</p> : null}
            <input
              className={
                this.state.nameError
                  ? 'Instructor-edit-card-name-required'
                  : 'Instructor-edit-card-name'
              }
              name="name"
              onChange={this.handleChange}
              placeholder="Instructor Name"
              value={this.state.name}
            />
            <br />
            <input
              className="card-number"
              name="license_number"
              placeholder="License Number"
              onChange={this.handleChange}
              value={this.state.license_number}
            />
            <ModalBody className="nested-modal-instructor-edit-body">
              <br />
              {/* <i className="fa fa-cloud-upload fa-3x" onClick={this.upload} aria-hidden="true">

                Upload Image
              </i> */}
              <button
                type="submit"
                className="instructors-nested-modal-button"
                onClick={this.upload}>
                UPLOAD PHOTO
              </button>
              {/* <button onClick={this.upload}>CLICK ME TO UPLOAD</button> */}
            </ModalBody>
            <br />
            <div className="card-description">
              <textarea
                name="description"
                onChange={this.handleChange}
                placeholder="Description"
                className="description-content"
                value={this.state.description}
                cols="35"
                wrap="soft"
              />
            </div>
            <div className="card-rating">
              <input
                name="ratings"
                onChange={this.handleChange}
                placeholder="Ratings"
                className="rating-details"
                value={this.state.ratings}
              />
            </div>
            <div className="card-contact">
              <br />
              <div className="contact-info">
                <input
                  onChange={this.handleChange}
                  name="contact_email"
                  placeholder="Contact Email"
                  className="contact-email"
                  value={this.state.contact_email}
                />
                <br />
                <input
                  onChange={this.handleChange}
                  name="contact_number"
                  placeholder="Contact Number"
                  className="contact-number"
                  value={this.state.contact_number}
                />
              </div>
            </div>
            <button type="submit" className="edit-instructor-save" onClick={this.togglePost}>SAVE</button>
          </div>
        </Modal>
      </div>
    );
  }
}
export default Auth(Instructors);
