import React, { Component } from 'react';
import './FlightCard.css';
import axios from 'axios';
import Parser from 'html-react-parser';
import { Helmet } from 'react-helmet';

import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import './FlightCard.css';
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
import { CardContent } from '@material-ui/core';

// let URL = this.props.flight.aircraft
// const dev = process.env.REACT_APP_DEV === "true" ? true : false;
// let URL;
// dev
//   ? (URL = 'http://127.0.0.1:8000/api/')
//   : (URL = 'https://flightloggercs10.herokuapp.com/api/');

// for console logs to be displayed or not
const dev = process.env.REACT_APP_DEV;
// for dev or deployed url
let URL = process.env.REACT_APP_URL;

let headers;
class FlightCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      aircraft_whatever: [],
      flight: [],
      openModal: false,

      nestedModal: false,
      closeAll: false,

      name: '',
      remarks: '',
      no_instument_app: '',
      no_ldg: '',
      cross_country: '',
      pic: '',
      dual_rec: '',
      actual_instr: '',
      sim_instr: '',
      day: '',
      night: '',
      airports_visited: '',
      fly_date: '',
      snippet: '',
      aircraft: '',
      id: '',
      license_type: '',
      total_hours: '',
      sv_html: '',
      sv_script: '',
      xxxsv_html2: '',
      xxxsv_script2: '',
      inputError: '',
      aircraftChoice: [],
      dropdownOpen: false,
      dropdownButtonTitle: ''
    };
  }

  // toggles modal and adds a random number to the html snippet and js script
  // to make the div id unique within the pasted HTML snippet from skyvector
  modalToggle = () => {
    let randomNumber = Math.floor(Math.random() * 1000) + 10;
    let xxxsv_html2 = this.state.sv_html
      .split('sv_')
      .join('sv_' + randomNumber);
    let xxxsv_script2 = this.state.sv_script
      .split('sv_')
      .join('sv_' + randomNumber);
    // console.log("html2 =======: ", xxxsv_html2);
    // console.log("script2 =======: ", xxxsv_script2);

    this.setState({
      openModal: !this.state.openModal,
      xxxsv_html2: xxxsv_html2,
      xxxsv_script2: xxxsv_script2
    });
  };

  // toggles both modals
  normalAndNestedModalToggle = () => {
    this.setState({
      // openModal: !this.state.openModal,
      nestedModal: !this.state.nestedModal,
      closeAll: false
    });
  };

  // toggles nested modal
  nestedModalToggle = () => {
    this.setState({
      nestedModal: !this.state.nestedModal,
      closeAll: false
    });
  };

  //TOGGLES DROPDOWN BUTTON FOR SELECTING AIRCRAFT WHEN ADDING NEW FLIGHT
  toggleDropdownButton = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  };

  //CHANGES TITLE OF DROPDOWN BUTTON WHEN USER SELECTS THE AIRCRAFT USED WHEN CREATING NEW FLIGHT
  handleDropDownButton = (e) => {
    this.setState({ dropdownButtonTitle: e.target.name });
  };

  // handles input change
  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentDidMount() {
    const headers = {
      Authorization: 'JWT ' + localStorage.getItem('token')
    };
    axios({
      method: 'get',
      url: `${this.props.flight.aircraft}`,
      headers: headers
    })
      .then((response) => {
        // console.log('flights ac response', response);
        this.setState({
          aircraft_whatever: response.data,
          dropdownButtonTitle: response.data.tail_number
        });
      })
      .catch((error) => {
        // eslint-disable-next-line
        dev ? console.log('flights ac error', error) : console.log();
      });
    this.setState({
      aircraftChoice: this.props.aircraftChoice,
      name: this.props.flight.name,
      remarks: this.props.flight.remarks,
      no_instument_app: this.props.flight.no_instument_app,
      no_ldg: this.props.flight.no_ldg,
      cross_country: this.props.flight.cross_country,
      pic: this.props.flight.pic,
      dual_rec: this.props.flight.dual_rec,
      actual_instr: this.props.flight.actual_instr,
      sim_instr: this.props.flight.sim_instr,
      day: this.props.flight.day,
      night: this.props.flight.night,
      airports_visited: this.props.flight.airports_visited,
      fly_date: this.props.flight.fly_date,
      snippet: this.props.flight.snippet,
      aircraft: this.props.flight.aircraft,
      id: this.props.flight.id,
      license_type: this.props.flight.license_type,
      total_hours: this.props.flight.total_hours,
      sv_html: this.props.flight.sv_html,
      sv_script: this.props.flight.sv_script,
      xxxsv_html2: this.props.flight.sv_html,
      xxxsv_script2: this.props.flight.sv_script
    });
  }

  // splits the html snippet pasted from skyvector
  // changes the height and width as well in order for it to fit the card
  handleSnippet = (e) => {
    let html = e.target.value;
    html = html.split('200px; height: 200px;').join('100%; height: 165px;');
    let arr = html.split('</div>');
    let sv_html = arr[0] + '</div>';
    let sv_script = arr[1];

    // console.log('SV HTML ', sv_html);
    this.setState({ sv_html: sv_html, sv_script: sv_script });
  };

  // toggles delete modal
  toggleDelete = () => {
    this.setState({ deleteModal: !this.state.deleteModal });
  };

  // deletes flight
  confirmDelete = () => {
    axios({
      method: 'DELETE',
      url: `${URL}api/flights/${this.state.id}/`,
      headers: headers
    })
      .then((response) => {
        // eslint-disable-next-line
        dev ? console.log(response) : null;
        window.location.reload();
      })
      .catch((err) => {
        // eslint-disable-next-line
        dev ? console.log(err) : null;
      });
    // this.setState({modal: !this.state.modal})
  };

  // Edits Flight
  toggleAndPut = (e) => {
    // eslint-disable-next-line
    dev ? console.log("state: +++++", this.state) : null;
    // eslint-disable-next-line
    dev ? console.log('toggle and post====') : null;
    let aircraftURL = `${URL}api/aircraft/`;
    let licensetype;
    for (let i = 0; i < this.state.aircraftChoice.length; i++) {
      if (
        this.state.aircraftChoice[i].tail_number ===
        this.state.dropdownButtonTitle
      ) {
        aircraftURL += this.state.aircraftChoice[i].id + '/';
        licensetype = this.state.aircraftChoice[i].license_type;
        // eslint-disable-next-line
        dev ? console.log('flightlic', this.state.aircraftChoice[i].license_type) : null;
      }
      this.setState({ license_type: licensetype });
      //   console.log('flightlicstate', this.state.license_type);
    }

    axios({
      method: 'PUT',
      url: `${URL}api/flights/${this.state.id}/`,
      data: {
        name: this.state.name,
        remarks: this.state.remarks,
        no_instument_app: this.state.no_instument_app,
        no_ldg: this.state.no_ldg,
        cross_country: this.state.cross_country,
        pic: this.state.pic,
        dual_rec: this.state.dual_rec,
        actual_instr: this.state.actual_instr,
        sim_instr: this.state.sim_instr,
        day: this.state.day,
        night: this.state.night,
        airports_visited: this.state.airports_visited,
        fly_date: this.state.fly_date,
        snippet: this.state.snippet,
        aircraft: aircraftURL,
        license_type: this.state.license_type,
        total_hours: this.state.total_hours,
        sv_html: this.state.sv_html,
        sv_script: this.state.sv_script
      },
      headers: headers
    })
      .then((response) => {
        dev ? console.log('??????????', response) : console.log();
        window.location.reload();
      })
      .catch((error) => {
        dev ? console.log('put error', error) : console.log();
      });
    this.setState({
      openModal: !this.state.openModal
    });
  };

  render() {
    headers = {
      Authorization: 'JWT ' + localStorage.getItem('token')
    };
    return (
      // flight card list
      <div className="TopFlightCard">
        <Card className="FlightCard" onClick={this.modalToggle}>
          <div className="FlightCardHeader">
            <Typography variant="title" className="FlightCardTitle">
              {this.props.flight.name}
            </Typography>
            <Typography className="FlightCardSubTitle">
              {this.props.flight.airports_visited}
            </Typography>
            <Typography className="FlightCardSubTitle">
              {this.state.aircraft_whatever.tail_number}
            </Typography>
          </div>

          {this.props.flight.sv_html ?  
          <div className="FlightCardHTMLSnippet">
            {Parser(this.props.flight.sv_html)}
            <Helmet>{Parser(this.props.flight.sv_script)}</Helmet>
            </div> : 
            <CardContent style={{ display: 'flex', height: "165px", width: '100%', alignItems: 'center', backgroundColor: "#fffff", border: "1px solid #bababa", padding: '0px' }}>
             <img style={{ width: '100%', height: '98%'}}alt="Default Flight map" src="https://res.cloudinary.com/dkzzjjjj9/image/upload/v1539106772/Default%20Images/defaultFlightsListView.png"></img>
              {/* <a style={{ position: "absolute", width: '100%'}}className="SnippetLink" target="_blank" rel="noopener noreferrer" href="https://skyvector.com/"> Visit Skyvector.com to get a HTML Snippet</a> */}
            </CardContent>
          }

          <div className="FlightCardFooter">
            <div className="FLightCard-Hours-Date">
              <span>{this.props.flight.fly_date}</span>
              <span>{this.props.flight.total_hours}</span>
            </div>
            <div className="FlightIcons">
              <i className="fas fa-edit flight-card-edit" onClick={this.normalAndNestedModalToggle} />
              <i
                className="fa fa-trash delete-button"
                onClick={this.toggleDelete}
                aria-hidden="true"
              />
            </div>
          </div>
        </Card>

        {/* View Card */}
        <Modal
          className="ViewFlightCardModal"
          props={this.props.flight}
          isOpen={this.state.openModal}
          toggle={this.modalToggle}
        >
          {/* This is where the Flight Card Modal Starts */}
          <ModalHeader>
            <div className="ViewFlightHeader">
              <div className="ViewFlightHeaderTop">
                <h2 className="ViewFlightHeaderTitle">{this.props.flight.name}</h2>
                <h4 className="Header-title-flydate">{this.props.flight.fly_date}</h4>
              </div>
              <h4 className="ViewFlightHeaderBottom">
                {this.props.flight.airports_visited}{' '}
              </h4>
            </div>
          </ModalHeader>
          {this.state.xxxsv_html2 ? 
          <ModalBody className="ViewFlightSnippetBody">
            {Parser(this.state.xxxsv_html2)}
            <Helmet>{Parser(this.state.xxxsv_script2)}</Helmet>
          </ModalBody> :
          <ModalBody className="ViewFlightSnippetBody">
          <img style={{ width: "auto", height: '100%'}}alt="Default Flight map" src="https://res.cloudinary.com/dkzzjjjj9/image/upload/v1539101223/Default%20Images/defaultFlights.svg"></img>

          </ModalBody>
          }
            

          <ModalBody className="ViewFlightManTail">
            <p>{this.state.aircraft_whatever.tail_number}</p>
            <p>{this.state.aircraft_whatever.man_type}</p>
          </ModalBody>
          <ModalBody className="ViewFlightRemarks">
            <div className="ViewFlightRemarks-ta" rows="4" cols="50">
              {this.props.flight.remarks}
            </div>
          </ModalBody>
          <ModalFooter className="FlightViewCard-modalfooter">
            <ul className="ul-1">
              <li>{this.state.aircraft_whatever.license_type}</li>
              <li>Cross Country: {this.props.flight.cross_country}</li>
              <li>No. Instr. App.: {this.props.flight.no_instument_app}</li>
              <li>No. Ldg: {this.props.flight.no_ldg}</li>
            </ul>
            <ul className="ul-2">
              <li>Day: {this.props.flight.day}</li>
              <li>Night: {this.props.flight.night}</li>
              <li>
                Actual Instr.:
                {this.props.flight.actual_instr}
              </li>
              <li>
                Sim. Instr.:
                {this.props.flight.sim_instr}
              </li>
            </ul>
            <ul className="ul-2">
              <li>Grnd Trainer: 0</li>
              <li>PIC: {this.props.flight.pic}</li>
              <li>Dual Rec: {this.props.flight.dual_rec}</li>
              <li>Total: {this.props.flight.total_hours}</li>
            </ul>
          </ModalFooter>
          <ModalFooter>
          <div className="FlightIcons">
            <i className="fas fa-edit fa-lg flight-card-edit" onClick={this.nestedModalToggle} />
            <i
              className="fa fa-trash fa-lg delete-button"
              onClick={this.toggleDelete}
              aria-hidden="true"
              />
          </div>
              </ModalFooter>
        </Modal>

        {/* EDIT MODAL STARTS HERE */}
        <Modal
          className="FlightEditModal"
          isOpen={this.state.nestedModal}
          toggle={this.nestedModalToggle}
          onClosed={this.state.closeAll ? this.toggle : undefined}
        >
          <ModalHeader className="FlightEditModalHeader">
            <div className="Inputs">
            <h2>Edit Flight</h2>
            <input
              className="new-flight-input-name"
              name="name"
              onChange={this.handleInputChange}
              placeholder="Flight Name"
              value={this.state.name}
              />
            
            <ButtonDropdown
          className="FlightEditDropdown"
            isOpen={this.state.dropdownOpen}
            toggle={this.toggleDropdownButton}
            >
            <DropdownToggle caret>
              {this.state.dropdownButtonTitle}
            </DropdownToggle>
            <DropdownMenu>
              {this.state.aircraftChoice.map((aircraft) => {
                return (
                  <DropdownItem
                  onClick={this.handleDropDownButton}
                  name={aircraft.tail_number}
                  key={aircraft.id}
                  >
                    {aircraft.tail_number}
                  </DropdownItem>
                );
              })}
            </DropdownMenu>
          </ButtonDropdown>

            <input
              className="new-flight-input-av"
              name="airports_visited"
              onChange={this.handleInputChange}
              placeholder="Airports Visited"
              value={this.state.airports_visited}
              />
             

            <input
              className="new-flight-input-fd"
              name="fly_date"
              onChange={this.handleInputChange}
              type="date"
              value={this.state.fly_date}
              />
            
              </div>
          {/* ====== END DROP DOWN FOR SELECTING AIRCRAFT =========*/}

          </ModalHeader>
          <ModalBody className="new-flight-snippet">
          <a className="SnippetLink" target="_blank" rel="noopener noreferrer" href="https://skyvector.com/"> Visit Skyvector.com to get an HTML Snippet</a>
            <textarea
            className="snippet-text-area"
              rows="4"
              cols="50"
              name="html-snippet"
              form="usrform"
              onChange={this.handleSnippet}
              placeholder="Paste your HTML Snippet Here"
              value={this.state.sv_html + this.state.sv_script}
            />
          </ModalBody>
          
          <ModalBody className="new-flight-remark-area">
            <textarea
              className="remarks-area"
              placeholder="Remarks, Procedures, Maneuvers"
              name="remarks"
              onChange={this.handleInputChange}
              rows="4"
              cols="50"
              value={this.state.remarks}
            />
          </ModalBody>
         
          <ModalFooter className="EditModalFooter">
            <div className="EditModalFooterChildren">
              <div className="hhh">
                <span>Cross Country :</span>
                <span>No. Instr. App. :</span>
                <span>No. Ldg. :</span>
                <span>Day :</span>
                <span>Night :</span>
              </div>
              <div className="YYY">
              <input
                  className="new-flight-pic-input"
                  name="cross_country"
                  onChange={this.handleInputChange}
                  value={this.state.cross_country}
                  type='number'
                />
                <input
                  className="new-flight-pic-input"
                  name="no_instument_app"
                  onChange={this.handleInputChange}
                  value={this.state.no_instument_app}
                  type='number'
                />
                <input
                  className="new-flight-pic-input"
                  name="no_ldg"
                  onChange={this.handleInputChange}
                  value={this.state.no_ldg}
                  type='number'
                />
                <input
                  className="new-flight-pic-input"
                  name="day"
                  onChange={this.handleInputChange}
                  value={this.state.day}
                  type='number'
                />
                 <input
                  className="new-flight-pic-input"
                  name="night"
                  onChange={this.handleInputChange}
                  value={this.state.night}
                  type='number'
                />
              </div>
            </div>
            <div className="EditModalFooterChildren">
              <div id="zzz">
                <span>Actual :</span>
                <span>SIM :</span>
                <span>Dual Rec. :</span>
                <span>PIC :</span>
                <span>Total :</span>
              </div>
              <div className="YYY">
              <input
                  className="new-flight-pic-input"
                  name="actual_instr"
                  onChange={this.handleInputChange}
                  value={this.state.actual_instr}
                  type='number'
                />
                <input
                  className="new-flight-pic-input"
                  name="sim_instr"
                  onChange={this.handleInputChange}
                  value={this.state.sim_instr}
                  type='number'
                />
                <input
                  className="new-flight-pic-input"
                  name="dual_rec"
                  onChange={this.handleInputChange}
                  value={this.state.dual_rec}
                  type='number'
                />
                <input
                  className="new-flight-pic-input"
                  name="pic"
                  onChange={this.handleInputChange}
                  value={this.state.pic}
                  type='number'
                />
                <input
                  className="new-flight-pic-input"
                  name="total_hours"
                  onChange={this.handleInputChange}
                  value={this.state.total_hours}
                  type='number'
                />
              </div>
            </div>
          </ModalFooter>
          <div className="flight-edit-save-container">
                <button className="flight-edit-save-button" onClick={this.toggleAndPut}>
                  Save
                </button>
          </div>
        </Modal>
        <Modal
          className="confirm-instructor-delete"
          size="sm"
          style={{
            display: "flex",
            padding: "10px",
            height: "100px",
            width: "200px",
            textAlign: "center",
            marginTop: "20%",
            marginLeft: "50%"
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
                fontSize: "14px",
                fontWeight: "bold",
                color: "#FFFFFF",
                width: "89px",
                borderRadius: "0"
              }}
            >
              {" "}
              Delete{" "}
            </Button>
            <Button
              onClick={this.toggleDelete}
              style={{
                fontSize: "14px",
                fontWeight: "bold",
                color: "#FFFFFF",
                width: "89px",
                borderRadius: "0"
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

export default FlightCard;