import React, { Component } from 'react';
import axios from 'axios';
import './Flights.css';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
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
import FlightCard from './FlightCard';
import Auth from '../Authenication/Auth';
import TopHeader from '../TopHeader';
import NavBar from '../NavBar';

const URL = process.env.REACT_APP_URL;
const dev = process.env.REACT_APP_DEV;
let headers;
class Flights extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownButtonTitle: 'Aircraft Choice',
      aircraftChoice: [],
      dropdownOpen: false,
      flightData: [],
      openModal: false,
      name: '',
      remarks: '',
      no_instument_app: null,
      no_ldg: null,
      cross_country: null,
      pic: null,
      dual_rec: null,
      actual_instr: null,
      sim_instr: null,
      day: null,
      night: null,
      airports_visited: '',
      fly_date: null,
      snippet: '',
      aircraft: null,
      id: null,
      license_type: '',
      total_hours: '',
      sv_html: '',
      sv_script: '',
      errorMessage: false,
      openModalAlert: false,
      loading: true,
      flightNameErrorMessage: false,
      totalsErrorMessage: false,
      toolTipOpen: false,
    };
  }

  // toggles modal
  toggleModal = () => {
    if (this.state.aircraftChoice.length <= 0) {
      this.setState({
        errorMessage: !this.state.errorMessage,
        openModalAlert: !this.state.openModalAlert,
        
      });
    } else {
      this.setState({ openModal: !this.state.openModal,
                      flightNameErrorMessage: false,
                      totalsErrorMessage: false,
                    });
    }
  };

  // TOGGLES DROPDOWN BUTTON FOR SELECTING AIRCRAFT WHEN ADDING NEW FLIGHT
  toggleDropdownButton = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  };

  // splits snippet by div and script tags
  handleSnippet = (e) => {
    let html = e.target.value;
    html = html.split('200px; height: 200px;').join('100%; height: 165px;');
    const arr = html.split('</div>');
    const sv_html = `${arr[0]}</div>`;
    const sv_script = arr[1];
    // console.log('SV HTML ', sv_html);
    this.setState({ sv_html, sv_script });
  };

  // CHANGES TITLE OF DROPDOWN BUTTON WHEN USER SELECTS THE AIRCRAFT USED WHEN CREATING NEW FLIGHT
  handleDropDownButton = (e) => {
    this.setState({ dropdownButtonTitle: e.target.name });
  };

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    // console.log('namechange', this.state.name);
  };

  // ADD NEW FLIGHT
  toggleAndPost = (e) => {
    // console.log('dropdowntitlestate', this.dropdownButtonTitle);
    if (this.state.name.length === 0 ) {
      e.preventDefault();
      this.setState({ flightNameErrorMessage: true });
      return;
    }else {
    if (this.state.total_hours.length === 0 ) {
      e.preventDefault();
      this.setState({ totalsErrorMessage: true });
      dev ? console.log("FLIGHT ERR STATE", this.state.totalsErrorMessage) : console.log()
      return;
    }
  }
    if (this.state.dropdownButtonTitle === 'Aircraft Choice') {
      alert('Please Select The Aircraft You Flew With');
      return;
    }
    let aircraftURL = `${URL}api/aircraft/`;
    let licensetype;
    for (let i = 0; i < this.state.aircraftChoice.length; i++) {
      if (this.state.aircraftChoice[i].tail_number === this.state.dropdownButtonTitle) {
        aircraftURL += `${this.state.aircraftChoice[i].id}/`;
        licensetype = this.state.aircraftChoice[i].license_type;
        // console.log('flightlic', this.state.aircraftChoice[i].license_type);
      }
      this.setState({ license_type: licensetype });
      //   console.log('flightlicstate', this.state.license_type);
    }
    axios({
      method: 'POST',
      url: `${URL}api/flights/`,
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
        license_type: licensetype,
        total_hours: this.state.total_hours,
        sv_html: this.state.sv_html,
        sv_script: this.state.sv_script,
      },
      headers,
    })
      .then((response) => {
        // console.log('??????????', response);
      })
      .catch((error) => {
        console.log('put error', error);
      });
    this.setState({
      openModal: !this.state.openModal,
    });
    window.location.reload();
  };

  componentDidMount() {
    const headers = {
      Authorization: `JWT ${localStorage.getItem('token')}`,
    };
    // loading animation
    setTimeout(() => this.setState({ loading: false }), 1250);
    axios({
      method: 'GET',
      url: `${URL}api/aircraft/`,
      headers,
    })
      .then((response) => {
        this.setState({ aircraftChoice: response.data });
        // console.log('ac state', this.state.aircraftChoice);
      })
      .catch((err) => {
        this.props.history.push('/');
        console.log(err);
      });
    axios({
      method: 'get',
      url: `${URL}api/flights/`,
      headers,
    })
      .then((response) => {
        // console.log('====D flights get response', response.data);
        this.setState({ flightData: response.data });
      })
      .catch((error) => {
        dev ? console.log('flights get error', error) : console.log();
      });
  }

  render() {
    // console.log('FLIGHTS PROPS', this.props);
    // console.log('E TARGET VALUE ', this.state.sv_html);
    headers = {
      Authorization: `JWT ${localStorage.getItem('token')}`,
    };

    const { loading } = this.state;
    if (loading) {
      return (
        <div className="Flights">
          <NavBar />
          <TopHeader username={this.props.username} />
          <div className="FlightList-loading">
            <Card className="Flights-NewCard-Loading">
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
      <div className="Flights">
        <TopHeader
          username={this.props.username}
          breadcrumb={['flights']}
          data={this.state.flightData}
          displayTotal
        />
        <NavBar />
        <div className="FlightList">
          <Card
            onClick={this.toggleModal}
            className="Flights-NewCard"
            style={{
              boxShadow: this.state.openModal ? 'inset 1px 1px 1px gray' : '',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '370px',
            }}
          >

            <Modal toggle={this.toggleModal} isOpen={this.state.openModalAlert}>
              <ModalHeader>
                {this.state.errorMessage ? 'Please create an aircraft first' : ''}
              </ModalHeader>
            </Modal>
            {/* CLICK ME ---->> <button onClick={this.toggleModal}>NEW FLIGHT</button> */}
            <CardContent
            className="NewFlight-Card"
              onClick={this.toggleModal}
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              <i className="fa fa-plus-circle fa-3x Plus-sign new" onClick={this.toggleModal} />
            </CardContent>
          </Card>
          {this.state.flightData.map(flight => (
            <FlightCard
              aircraftChoice={this.state.aircraftChoice}
              flight={flight}
              key={flight.created_at}
            />
          ))}
          {/* NEW FLIGHT MODAL */}
          <Modal
            className="NewFlightModal"
            isOpen={this.state.openModal}
            toggle={this.toggleModal}
          >
            {/* <Card onClick={this.toggle} className="NewFlightsCard-Card"> */}
            {/* <Typography className="card-typography" onClick={this.toggle} /> */}
            <ModalHeader className="NewFlightModalHeader">
            <h4 style={{ textAlign: 'center', marginBottom: "10px"}}>New Flight</h4>
            {this.state.flightNameErrorMessage || this.state.totalsErrorMessage ? <p style={{ textAlign: 'center', fontSize: "1.2rem"}}>Please fill out the required fields</p> : null}
              {/* { this.state.totalsErrorMessage  ? <p style={{ textAlign: 'center', fontSize: "1.2rem"}}>Please fill out the required fields</p> : null} */}
              <div className="NewFlight-header-inputs">
                {this.state.flightNameErrorMessage ? (
                  <input
                    style={{ border: '.1rem solid red' }}
                    className="new-flight-input-name"
                    name="name"
                    onChange={this.handleInputChange}
                    placeholder="Flight Name is required"
                  />
                ) : (
                  <input
                      className="new-flight-input-name"
                      name="name"
                      onChange={this.handleInputChange}
                      placeholder="Flight Name"
                    />
                )}
                {/* DROP DOWN FOR SELECTING AIRCRAFT */}
                <ButtonDropdown
                  className="NewFlightDropdown"
                  isOpen={this.state.dropdownOpen}
                  toggle={this.toggleDropdownButton}
                >
                  <DropdownToggle caret>{this.state.dropdownButtonTitle}</DropdownToggle>
                  <DropdownMenu>
                    {this.state.aircraftChoice.map(aircraft => (
                        <DropdownItem
                          onClick={this.handleDropDownButton}
                          name={aircraft.tail_number}
                          key={aircraft.id}
                        >
                          {aircraft.tail_number}
                        </DropdownItem>
                      ))}
                  </DropdownMenu>
                </ButtonDropdown>
                {/* END DROP DOWN FOR SELECTING AIRCRAFT */}
                <input
                  className="new-flight-input-av"
                  name="airports_visited"
                  onChange={this.handleInputChange}
                  placeholder="Airports Visited"
                />
                <input
                  className="new-flight-input-fd"
                  name="fly_date"
                  onChange={this.handleInputChange}
                  type="date"
                />
              </div>
            </ModalHeader>
            <ModalBody className="NewFlightHTMLSnippet">
              <a
                className="SnippetLink"
                target="_blank"
                rel="noopener noreferrer"
                href="https://skyvector.com/"
              >
                {' '}

                  Visit Skyvector.com to get an HTML Snippet
              </a>
              <textarea
                className="snippet-text-area"
                rows="4"
                cols="50"
                name="html-snippet"
                form="usrform"
                onChange={this.handleSnippet}
                placeholder="Paste your HTML Snippet Here"
              />
            </ModalBody>

            <ModalBody className="NewFlightRemarks">
              <textarea
                className="remarks-area"
                placeholder="Remarks, Procedures, Maneuvers"
                name="remarks"
                onChange={this.handleInputChange}
                rows="4"
                cols="50"
              />
            </ModalBody>
            <ModalFooter className="NewModalFooter">
              <div className="NewModalFooterChildren">
                <div className="hhh">
                  <span>Cross Country :</span>
                  <span>No. Instr. App. :</span>
                  <span>No. Ldg. :</span>
                  <span>Day :</span>
                  <span>Night :</span>
                </div>
                <div className="YYY">
                  <input
                    type="number"
                    className="new-flight-pic-input"
                    name="cross_country"
                    onChange={this.handleInputChange}
                  />
                  <input
                    type="number"
                    className="new-flight-pic-input"
                    name="no_instument_app"
                    onChange={this.handleInputChange}
                  />
                  <input
                    type="number"
                    className="new-flight-pic-input"
                    name="no_ldg"
                    onChange={this.handleInputChange}
                  />
                  <input
                    type="number"
                    className="new-flight-pic-input"
                    name="day"
                    onChange={this.handleInputChange}
                  />
                  <input
                    type="number"
                    className="new-flight-pic-input"
                    name="night"
                    onChange={this.handleInputChange}
                  />
                </div>
              </div>
              <div className="NewModalFooterChildren">
                <div id="zzz">
                  <span>Actual :</span>
                  <span>SIM :</span>
                  <span>Dual Rec. :</span>
                  <span>PIC :</span>
                  <span>Total :</span>
                </div>
                <div className="YYY">
                  <input
                    type="number"
                    className="new-flight-pic-input"
                    name="actual_instr"
                    onChange={this.handleInputChange}
                  />
                  <input
                    type="number"
                    className="new-flight-pic-input"
                    name="sim_instr"
                    onChange={this.handleInputChange}
                  />
                  <input
                    type="number"
                    className="new-flight-pic-input"
                    name="dual_rec"
                    onChange={this.handleInputChange}
                  />
                  <input
                    type="number"
                    className="new-flight-pic-input"
                    name="pic"
                    onChange={this.handleInputChange}
                  />
                  <input
                    type="number"
                    className={this.state.totalsErrorMessage ? "new-flight-total-input" : ""}
                    name="total_hours"
                    onChange={this.handleInputChange}
                  />
                </div>
              </div>
            </ModalFooter>
            <div className="flight-edit-save-container">
              <button className="flight-edit-save-button" onClick={this.toggleAndPost}>

                  Save
              </button>
            </div>
          </Modal>
        </div>
      </div>
    );
  }
}
export default Auth(Flights);
