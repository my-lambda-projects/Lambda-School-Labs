import React, { Component } from "react";
import axios from "axios";
import DeleteModal from "./deleteModal";

// const url = process.env.getProperty || `http://localhost:9000/properties/${id}`;
//aconst url = `https://tenantly-back.herokuapp.com/properties/${id}`;

const decode = require("jwt-decode");

export default class DisplayProperty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      property: [],
      deleteConfirm: false
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    this.fetchProperty(id);
  }

  fetchProperty = id => {
    axios
      .get(`http://localhost:9000/properties/${id}`)
      .then(response => {
        this.setState({ property: response.data });
      })
      .catch(error => {
        console.error(error);
      });
  };

  deleteProperty = () => {
    let id = this.state.property.id;

    axios
      .delete(`http://localhost:9000/properties/${id}`)
      .then(response => {
        console.log("in here", response);
      })
      .catch(err => {
        console.log(err);
      });
    this.props.history.push("/properties");
  };

  editProperty = e => {
    this.props.history.push(`/edit/${this.props.match.params.id}`);
  };

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  render() {
    return (
      <div className="property-display">
        <div className="options-right">
          <button
            className=" filled-button edit-button"
            onClick={this.editProperty}
          >
            Edit
          </button>
          <button className=" notFilled-button" onClick={this.showModal}>
            Delete
          </button>
        </div>

        {this.state.show ? (
          <DeleteModal
            deleteNote={this.deleteProperty}
            hideModal={this.hideModal}
          />
        ) : null}

        <div className="property-body">
          <div className="propertyBody-left">
            <div className="propertyBody-info">
              <h1>Name </h1>
              <p>{this.state.property.name}</p>
            </div>
            <div className="propertyBody-info">
              <h1>Address</h1>
              <p>{this.state.property.address}</p>
            </div>
            <div className="propertyBody-info">
              <h1>City </h1>
              <p>{this.state.property.city}</p>
            </div>
            <div className="propertyBody-info">
              <h1>Zipcode </h1>
              <p>{this.state.property.zip}</p>
            </div>
          </div>
          <div className="propertyBody-right">
            <div className="propertyBody-info">
              <h1>Sq. Ft. </h1>
              <p>{this.state.property.sqft}</p>
            </div>
            <div className="propertyBody-info">
              <h1>Beds </h1>
              <p>{this.state.property.rooms}</p>
            </div>
            <div className="propertyBody-info">
              <h1>Baths</h1>
              <p> {this.state.property.bathrooms}</p>
            </div>
            <div className="propertyBody-info">
              <h1>Year Built </h1>
              <p>{this.state.property.year}</p>
            </div>
            <div className="propertyBody-info">
              <h1>Max </h1>
              <p>{this.state.property.max}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
