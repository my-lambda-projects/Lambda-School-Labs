import axios from 'axios';
import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
// import CardMedia from '@material-ui/core/CardMedia';
import './AircraftCard.css';
// import Dropzone from 'react-dropzone';
import NavBar from '../NavBar';
import AircraftCard from './AircraftCard';
import TopHeader from '../TopHeader';
import Auth from '../Authenication/Auth';
import './Aircrafts.css';

let headers;
const URL = process.env.REACT_APP_URL;
const dev = process.env.REACT_APP_DEV;
class Aircrafts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      openModal: false,
      dropdownOpen: false,
      dropdownButtonTitle: 'License Type',
      tail_number_edit: '',
      man_type_edit: '',
      requiredField: false,
      license_type_edit: '',
      uploadurl:
        'https://res.cloudinary.com/dkzzjjjj9/image/upload/v1539107821/Default%20Images/defaultPlane.png',
      data: [
        {
          id: '',
          man_type: '',
          tail_number: '',
          license_type: '',
          uploadurl: '',
        },
      ],
    };
  }

  componentDidMount() {
    // loading animation
    setTimeout(() => this.setState({ loading: false }), 950);
    // getting all aircraft
    axios({
      method: 'GET',
      url: `${URL}api/aircraft/`,
      headers,
    })
      .then((response) => {
        this.setState({
          data: response.data,
        });
      })
      .catch((error) => {
        dev ? console.log('error :', error) : console.log();
        this.props.history.push('/');
      });
  }

  // handles change on input fields
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // toggles view modal
  toggleModal = () => {
    this.setState({ openModal: !this.state.openModal });
  };

  // for posting new aircraft, has required fields error handling built in
  toggleAndPost = (e) => {

    if (this.state.tail_number_edit.length <= 0 ) {
      e.preventDefault();
      this.setState({ requiredField: true })
      return;
    }

    if (this.state.man_type_edit.length <=0) {
      e.preventDefault();
      this.setState({ requiredField: true })
      return;
    }

    if (this.state.dropdownButtonTitle === 'License Type') {
      alert('Please Select The License Type');
      return;
    }

    this.setState({
      openModal: !this.state.openModal,
    });

    axios({
      method: 'POST',
      url: `${URL}api/aircraft/`,
      data: {
        man_type: this.state.man_type_edit,
        tail_number: this.state.tail_number_edit,
        license_type: this.state.license_type_edit,
        id: this.state.id,
        photo: this.state.uploadurl,
      },
      headers,
    })
      .then()
      .catch((error) => {
        dev ? console.log('put error', error) : console.log();
      });
    window.location.reload();
  };

  // changes the title of the dropdown button to whichever license type you chose
  handleDropDownButton = (e) => {
    this.setState({ dropdownButtonTitle: e.target.name, license_type_edit: e.target.name });
  };

  toggleDropdownButton = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  };

  upload = () => {
    // eslint-disable-next-line
    window.cloudinary.openUploadWidget(
      { cloud_name: 'dkzzjjjj9', upload_preset: 'ggbmyqmo' },
      (error, result) => {
        let imgurl;
        result
          ? (imgurl = result[0].url)
          : (imgurl = 'https://res.cloudinary.com/dkzzjjjj9/image/upload/v1539107821/Default%20Images/defaultPlane.png');
        this.setState({ uploadurl: imgurl });
      },
    )
    // eslint-disable-next-line
    false;
  };

  render() {
    dev ? console.log("TESSSSSSSSST", dev) : console.log()
    headers = {
      Authorization: `JWT ${localStorage.getItem('token')}`,
    };

      const { loading } = this.state;
      if (loading) {
        return (
          <div className="Aircrafts">
            <NavBar />
            <TopHeader breadcrumb={['aircraft']} displayTotal username={this.props.username} />
            <div className="Aircraft-content">
              <Card
              className="AircraftCard-loading"
                >
                <div className="load-bar">
                  <div className="bar" />
                  <div className="bar" />
                  <div className="bar" />
                </div>
              </Card>
            </div>
          </div>

      );
    }else

    return (
      <div className="Aircrafts">
        <TopHeader breadcrumb={['aircraft']} displayTotal username={this.props.username} />
        <NavBar />
        <div className="Aircraft-content">
        <Card
            onClick={this.toggleModal}
            style={{
              boxShadow: this.state.openModal ? 'inset 1px 1px 1px gray' : '',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '385px',
            }}
          >
            <div
              className="NewFlight-Card .Plus-sign .hover"
              onClick={this.toggleModal}
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              <i className="fa fa-plus-circle fa-3x Plus-sign" onClick={this.toggleModal} />
            </div>
          </Card>
          {this.state.data.map((plane) => {
            const id = plane.id;
            return <AircraftCard key={id} data={plane} props={this.props} />;
          })}

          <Modal
            className="NewAircraft-content"
            isOpen={this.state.openModal}
            toggle={this.toggleModal}
          >
            <ModalHeader>
              {this.state.requiredField ? <div style={{ textAlign: 'center' }}>Please fill out the required fields</div> : <div></div>}
              <input
                className={this.state.requiredField ? "new-aircraft-input-tn-required" : "new-aircraft-input-tn"}
                name="tail_number_edit"
                onChange={this.handleChange}
                placeholder="Tail Number"
              />
              <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggleDropdownButton}>
                <DropdownToggle caret>{this.state.dropdownButtonTitle}</DropdownToggle>
                <DropdownMenu>
                  <DropdownItem name="Airplane SEL" onClick={this.handleDropDownButton}>

                    Airplane SEL
                  </DropdownItem>
                  <DropdownItem name="Airplane SES" onClick={this.handleDropDownButton}>

                    Airplane SES
                  </DropdownItem>
                  <DropdownItem name="Airplane MEL" onClick={this.handleDropDownButton}>

                    Airplane MEL
                  </DropdownItem>
                  <DropdownItem name="Airplane MES" onClick={this.handleDropDownButton}>

                    Airplane MES
                  </DropdownItem>
                </DropdownMenu>
              </ButtonDropdown>
              <input
                className={this.state.requiredField ? "new-aircraft-input-mt-required" :"new-aircraft-input-mt"}
                name="man_type_edit"
                onChange={this.handleChange}
                placeholder="Manufacturer Type"
              />
            </ModalHeader>
            <ModalBody className="nested-modal-body">
              <button type="submit" className="nested-modal-button" onClick={this.upload}>

                Upload Photo
              </button>
            </ModalBody>
            <ModalFooter>
              <button className="save-button" onClick={this.toggleAndPost} type="submit">

                Save
              </button>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    );
  }
}

export default Auth(Aircrafts);
