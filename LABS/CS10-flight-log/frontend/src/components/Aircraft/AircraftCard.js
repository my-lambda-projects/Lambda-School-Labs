import React from 'react';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import './AircraftCard.css';
import axios from 'axios';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
} from 'reactstrap';

const dev = process.env.REACT_APP_DEV;

let headers;
const URL = process.env.REACT_APP_URL;

class AircraftCardModal extends React.Component {
  constructor() {
    super();

    this.state = {
      data: [],
      // files: [],
      id: '',
      dropdownButtonTitle: '',
      dropdownOpen: false,
      tail_number: '',
      license_type: '',
      man_type: '',
      tail_number_edit: '',
      license_type_edit: '',
      man_type_edit: '',
      photo: '',
      modal: false,
      nestedModal: false,
      closeAll: false,
      uploadurl: '',
      total_hours: '',
    };
  }

  componentDidMount() {
    this.setState({
      id: this.props.data.id,
      tail_number: this.props.data.tail_number,
      tail_number_edit: this.props.data.tail_number,
      license_type: this.props.data.license_type,
      license_type_edit: this.props.data.license_type,
      man_type_edit: this.props.data.man_type,
      photo: this.props.data.photo,
      dropdownButtonTitle: this.props.data.license_type
    });
    // Filters Flights by a specific aircraft
    axios({
      method: 'GET',
      url: `${URL}api/filteredflights/${this.props.data.id}`,
      headers,
    })
      .then((response) => {
        this.setState({ data: response.data });
      })
      .catch((error) => {
        dev ? console.log('error :', error) : console.log();
      });
  }

  // toggles the modal
  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  // toggles edit modal
  toggleNested = () => {
    this.setState({
      nestedModal: !this.state.nestedModal,
      closeAll: false,
    });
  };

  // changes the drop down button title and popuates the state with the correct license type
  handleDropDownButton = (e) => {
    this.setState({
      dropdownButtonTitle: e.target.name,
      license_type: e.target.name,
    });
  };

  // toggles the dropdown button
  toggleDropdownButton = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  };

  // Handles the change in input fields
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // confirms delete
  confirmDelete = () => {
    axios({
      method: 'DELETE',
      url: `${URL}api/aircraft/${this.state.id}/`,
      headers,
    })
      .then((response) => {
        dev ? console.log(response) : console.log();
        window.location.reload();
      })
      .catch((err) => {
        dev ? console.log(err) : console.log();
      });
  };

  // THIS WILL UPDATE THE INFORMATION OF THE AIRCRAFT VIA EDIT MODAL
  // also handles the default photo vs uploaded photo
  toggleNestedAndPut = (e) => {
    if (this.state.uploadurl === '') {
      // console.log("Start Axios")
      axios({
        method: 'PUT',
        url: `${URL}api/aircraft/${this.state.id}/`,
        data: {
          man_type: this.state.man_type_edit,
          tail_number: this.state.tail_number_edit,
          license_type: this.state.license_type,
          id: this.state.id,
          photo: this.state.photo,
        },
        headers,
      })
        .then(() => {
          // setTimeout(() =>  window.location.reload(), 150);
          window.location.reload()
          // this.props.history.push('/')
        })
        .catch((error) => {
          dev ? console.log('put error', error) : console.log();
        });
        // console.log('END axios')
    } else {
      axios({
        method: 'PUT',
        url: `${URL}api/aircraft/${this.state.id}/`,
        data: {
          man_type: this.state.man_type_edit,
          tail_number: this.state.tail_number_edit,
          license_type: this.state.license_type,
          id: this.state.id,
          photo: this.state.uploadurl,
        },
        headers,
      })
        .then(() => {
          // console.log("put response", response);
          // this.props.history.push('/')
          // setTimeout(() =>  window.location.reload(), 150);
          window.location.reload()
        })
        .catch((error) => {
         dev ? console.log('put error', error) : console.log();
        });
     
    }
  };

  // toggles the delete modal
  toggleDelete = () => {
    this.setState({ deleteModal: !this.state.deleteModal });

    // this.setState({modal: !this.state.modal})
  };

  // toggles all modals(used for closing all modals)
  toggleAll = () => {
    this.setState({
      nestedModal: !this.state.nestedModal,
      closeAll: true,
    });
  };


  // upload function for cloudinary(has error handling for edge cases)
  upload = () => {
    // eslint-disable-next-line
    window.cloudinary.openUploadWidget(
      { cloud_name: 'dkzzjjjj9', upload_preset: 'ggbmyqmo', cors: 'no-cors' },

      (error, result) => {
        // console.log(error, result);
        if (this.state.uploadurl === '') {
          let imgurl;
          result ? (imgurl = result[0].url) : (imgurl = this.props.data.photo);
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
    //eslint-disable-next-line
    false;
  };

  render() {
    headers = {
      Authorization: `JWT ${localStorage.getItem('token')}`,
    };

    let [
      pic_sum,
      no_ldg,
      day,
      night,
      cross_country,
      actual_instr,
      sim_instr,
      dualrec,
      no_instument_app,
      total_hours,
    ] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    // handles the totals for each aircraft
    for (let i = 0; i < this.state.data.length; i += 1) {
      pic_sum += this.state.data[i].pic;
      no_ldg += this.state.data[i].no_ldg;
      day += this.state.data[i].day;
      night += this.state.data[i].night;
      cross_country += this.state.data[i].cross_country;
      actual_instr += this.state.data[i].actual_instr;
      sim_instr += this.state.data[i].sim_instr;
      dualrec += this.state.data[i].dual_rec;
      no_instument_app += this.state.data[i].no_instument_app;
      total_hours += this.state.data[i].total_hours;
    }

    return (
      <div className="AircraftCard">
        <Card onClick={this.toggle} className="Content-aircraft">
          <Typography className="card-typography-p" variant="title">
            {this.state.tail_number}
          </Typography>
          <Typography>{this.props.data.man_type}</Typography>
          <div className="CardMediaContainer">
            <CardMedia
              className="CardMedia"
              onClick={this.toggle}
              component="img"
              height="140"
              image={this.props.data.photo || 'https://res.cloudinary.com/dkzzjjjj9/image/upload/v1539107821/Default%20Images/defaultPlane.png'}
              title="Airplane"
            />
          </div>
          <Typography>{`Hours: ${total_hours}`}</Typography>
          <div className="button-container">
            <i
              className="fas fa-edit edit-card-button hover"
              aria-hidden="true"
              onClick={this.toggleAll}
            />
            <i
              className="fa fa-trash delete-button hover"
              onClick={this.toggleDelete}
              aria-hidden="true"
            />
          </div>
        </Card>
        {/* CARD END */}

        {/* MODAL START */}
        <Modal
          className="Detailed-aircraft modal-content"
          isOpen={this.state.modal}
          toggle={this.toggle}
        >
          <ModalHeader className="modal-title">
            <p className="modal-header-p1">{this.state.tail_number}</p>
            <p className="modal-header-p">{this.props.data.man_type}</p>
          </ModalHeader>
          <ModalBody className="modal-body">
            <img alt="Aircraft" className="modal-body-img" src={this.state.photo} />
          </ModalBody>
          {/* NESTED MODAL */}
          <Modal
            className="Detailed-aircraft-edit"
            isOpen={this.state.nestedModal}
            toggle={this.toggleNested}
            onClosed={this.state.closeAll ? this.toggle : undefined}
          >
            <ModalHeader>
              <input
                className="edit-input-tn"
                name="tail_number_edit"
                onChange={this.handleChange}
                placeholder="Tail Number"
                value={this.state.tail_number_edit}
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
                className="edit-input-mt"
                name="man_type_edit"
                onChange={this.handleChange}
                value={this.state.man_type_edit}
              />
            </ModalHeader>
            <ModalBody className="nested-modal-body">
              <button className="nested-modal-button " onClick={this.upload}>

                Upload Photo
              </button>
            </ModalBody>
            <ModalFooter className="ModalFooter">
              {/* CLOSE NESTED */}
              <button className="save-button" onClick={this.toggleNestedAndPut}>

                Save
              </button>
            </ModalFooter>
          </Modal>

          <ModalFooter className="modal-footer">
            <ul className="ul-1">
              <li>{this.state.license_type}</li>
              <li>{`Cross Country: ${cross_country}`}</li>
              <li>{`No. Instr. App.: ${no_instument_app}`}</li>
              <li>{`No. Ldg: ${no_ldg}`}</li>
            </ul>
            <ul className="ul-2">
              <li>{`Day: ${day}`}</li>
              <li>{`Night: ${night}`}</li>
              <li>{`Actual Instr.: ${actual_instr}`}</li>
              <li>{`Sim. Instr.: ${sim_instr}`}</li>
            </ul>
            <ul className="ul-2">
              <li>Grnd Trainer</li>
              <li>{`PIC: ${pic_sum}`}</li>
              <li>{`Dual Rec: ${dualrec}`}</li>
              <li>{`Total Hours: ${total_hours}`}</li>
            </ul>
          </ModalFooter>
          <ModalFooter className="Edit-delete">
            <i
              className="fas fa-edit edit-card-button hover"
              aria-hidden="true"
              onClick={this.toggleNested}
            />

            <i
              className="fas fa-trash delete-button"
              onClick={this.toggleDelete}
              aria-hidden="true"
            />
          </ModalFooter>
        </Modal>
        <Modal
          className="confirm-instructor-delete"
          size="sm"
          style={{
            display: 'flex',
            padding: '10px',
            height: '100px',
            width: '200px',
            textAlign: 'center',
            marginTop: '20%',
            marginLeft: '50%',
          }}
          isOpen={this.state.deleteModal}
          toggle={this.toggleDelete}
        >
          <div className="confirm-delete-content">

            Confirm Delete?
            <br />
            <br />
            <Button
              color="danger"
              onClick={this.confirmDelete}
              style={{
                fontSize: '14px',
                fontWeight: 'bold',
                color: '#FFFFFF',
                width: '89px',
                borderRadius: '0',
              }}
            >
              {' '}

              Delete
              {' '}
            </Button>
            <Button
              onClick={this.toggleDelete}
              style={{
                fontSize: '14px',
                fontWeight: 'bold',
                color: '#FFFFFF',
                width: '89px',
                borderRadius: '0',
              }}
            >

              Cancel
            </Button>
          </div>
        </Modal>
      </div>
    );
  }
}

export default AircraftCardModal;
