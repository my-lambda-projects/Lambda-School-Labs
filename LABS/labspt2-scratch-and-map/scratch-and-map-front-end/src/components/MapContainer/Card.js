import React, { Component } from "react";
import { returnId } from "../helper";
import { Button, Header, Modal, Form, TextArea, Icon } from "semantic-ui-react";
import CardSlider from "./CardSlider";
import {
  codeToCountry,
  restCountryConversion,
  reverseCountryConversion,
  countries
} from "../helper";
import "../../styles/card.scss";
import axios from "axios";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import FriendsTravel from "./FriendsTravel";

class Card extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imageUrl: "",
      countryName: "",
      status: 1,
      notes: "",
      currency: "",
      symbol: "",
      capital: "",
      language: "",
      users: [],
      traveler: [],
      modalOpen: true,
      user: null
    };
  }

  async componentDidMount() {
    let code = restCountryConversion(this.props.country_code);
    let codename = this.props.country_code;
    console.log("this is where the /fb/ happens")
    console.log(this.props.currentUser)
    await axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/api/users/fb`, { fb_user_id: localStorage.getItem("SAMUserID")})
      .then(res => {
        this.setState({ user: res.data.id });
      });

    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/api/users/fb`, { fb_user_id: localStorage.getItem("SAMUserID")})
      .then(res => {
        let userInfo = res.data.user_countries;
        for (i = 0; i < userInfo.length; i++) {
          let currentCountry = returnId(
            reverseCountryConversion(this.props.country_code)
          );
          if (currentCountry === userInfo[i].country_id) {
            let countryNotes = userInfo[i].notes;
            this.setState({ notes: countryNotes });
          }
        }
      });

    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/api/users/fb`, { fb_user_id: localStorage.getItem("SAMUserID")})
      .then(res => {
        let userInfo = res.data.user_countries;
        for (i = 0; i < userInfo.length; i++) {
          let currentCountry = returnId(
            reverseCountryConversion(this.props.country_code)
          );
          if (currentCountry === userInfo[i].country_id) {
            let countryNotes = userInfo[i].notes;
            this.setState({ notes: countryNotes });
          }
        }
      });

    fetch(`https://restcountries.eu/rest/v2/alpha/${code}`).then(response =>
      response
        .json()
        .then(data => ({
          data: data,
          status: response.status
        }))
        .then(res => {
          let countrySelect = codeToCountry(restCountryConversion(codename));
          let currency = res.data.currencies[0].name.toProperCase();
          let symbol = res.data.currencies[0].symbol;
          let cardCode = res.data.flag;
          let language = res.data.languages[0].name;
          let capital = res.data.capital;
          if (currency === "[E]" || currency === "[D]") {
            currency = "United States Dollar";
          }
          this.setState({
            imageUrl: cardCode,
            countryName: countrySelect,
            currency: currency,
            symbol: symbol,
            language: language,
            capital: capital
          });
        })
    );

    let i = reverseCountryConversion(this.props.country_code);
    let index = countries.indexOf(i) + 2;

    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/countries/${index}`)
      .then(res => {
        this.setState({ traveler: res.data.travelers });
      });
  }

  handleClose() {
    this.setState({ modalOpen: false });
  }

  onSave() {
    let newNotes = document.getElementById("Notes").value;
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/api/users/fb`, { fb_user_id: localStorage.getItem("SAMUserID")})
      .then(res => {
        const countryData = {
          user_id: res.data.id,
          country_id: returnId(
            reverseCountryConversion(this.props.country_code)
          ),
          status: this.state.status,
          notes: newNotes
        };
        let country = res.data.user_countries.filter(item => {
          return (
            item.country_id ===
            returnId(reverseCountryConversion(this.props.country_code))
          );
        });
        if (country.length === 0) {
          axios
            .post(
              `${process.env.REACT_APP_BACKEND_URL}/api/mapview`,
              countryData
            )
            .then(res => {
              this.props.cardSaveHandler(this.props.currentUser);
            });
        } else {
          axios
            .put(
              `${process.env.REACT_APP_BACKEND_URL}/api/mapview/${countryData.user_id}/${countryData.country_id}`,
              countryData
            )
            .then(res => {
              this.props.cardSaveHandler(this.props.currentUser);
            });
        }
      });
    this.handleClose();
  }

  onChange = status => {
    this.setState(state => ({
      status: parseInt(status, 10)
    }));
  };

  render() {
    const loggedInUser = this.props.displayedUser;

    const cardStyle = {
      zIndex: 11,
      border: "1px solid steelblue"
    };

    const modalStyle = {
      width: "40%"
    };

    return (
      <div style={cardStyle}>
        <Modal
          style={modalStyle}
          className="modalStyle"
          open={this.state.modalOpen}
          // onClose={this.handleClose}
        >
          <Modal.Content
            image
            style={{ display: "flex", flexDirection: "column" }}
          >
            <Header
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <h1>{this.state.countryName} </h1>{" "}
              <Icon name="window close" onClick={() => this.props.onClose()} />{" "}
            </Header>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-around",
                margin: "10px 10px 30px 10px"
              }}
            >
              <div>
                <img
                  style={{
                    border: "1px solid black",
                    height: "10vw",
                    marginBottom: "20px"
                  }}
                  alt=""
                  src={this.state.imageUrl}
                />
              </div>
              <div style={{ width: "40%", height: "30px", marginLeft: "15px" }}>
                <h4>CAPITAL: {this.state.capital}</h4>
                <h4>LANGUAGE: {this.state.language}</h4>
                <h4>
                  CURRENCY: {this.state.currency} ({this.state.symbol}){" "}
                </h4>
              </div>
            </div>

            {loggedInUser === this.props.displayedUser ? (
              <CardSlider status={this.state.status} onChange={this.onChange} />
            ) : null}

            <Modal.Description>
              <strong>Notes:</strong>
              {
                <Form>
                  <TextArea
                    style={{ marginBottom: "10px" }}
                    placeholder={this.state.notes}
                    id="Notes"
                  />
                </Form>
              }
              <div>
                Friends' Travels:
                <FriendsTravel friends={this.state.traveler} />
              </div>

              {loggedInUser === this.props.displayedUser ? (
                <Button onClick={() => this.onSave()}>Save</Button>
              ) : null}
            </Modal.Description>
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    displayedUser: state.getUserDataReducer.displayedUser
  };
};
export default withRouter(connect(mapStateToProps)(Card));
