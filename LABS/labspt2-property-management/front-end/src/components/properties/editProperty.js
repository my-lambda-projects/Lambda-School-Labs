import React, { Component } from "react";
import axios from "axios";
// const url = process.env.getProperty || `http://localhost:9000/properties/${id}`;
//const url = `https://tenantly-back.herokuapp.com/properties/${id}`;

class EditProperty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      sqft: "",
      rooms: "",
      bathrooms: "",
      year: "",
      max: ""
    };
  }

  componentDidMount() {
    this.SingleProperty();
  }

  SingleProperty = () => {
    axios
      .get(`http://localhost:9000/properties/${this.props.match.params.id}`)
      .then(response => {
        this.setState({
          id: response.data.id,
          name: response.data.name,
          address: response.data.address,
          city: response.data.city,
          state: response.data.state,
          zip: response.data.zip,
          sqft: response.data.sqft,
          rooms: response.data.rooms,
          bathrooms: response.data.bathrooms,
          year: response.data.year,
          max: response.data.max
        });
      })
      .catch(err => {
        console.log("Error");
      });
  };

  editProperty = e => {
    e.preventDefault();
    let id = this.state.id;
    axios
      .put(`http://localhost:9000/properties/${id}`, this.state)
      .then(response => {
        console.log("in here", response);
      })
      .catch(err => {
        console.log(err);
      });
    this.props.history.push(`/view-property/${id}`);
  };

  handleInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="edit-property">
        <h1>Edit Note</h1>
        <form onSubmit={this.editProperty}>
          <div className="edit-leftSide">
            <div className="edit-topInfo">
              <div className="input-info">
                <h1>Property Name</h1>
                <input
                  name="name"
                  type="text"
                  value={this.state.name}
                  onChange={this.handleInput}
                />
              </div>
              <div className="input-info">
                <h1>Address</h1>
                <input
                  name="address"
                  type="text"
                  value={this.state.address}
                  onChange={this.handleInput}
                />
              </div>

              <div className="input-info">
                <h1>City</h1>
                <input
                  name="city"
                  type="text"
                  value={this.state.city}
                  onChange={this.handleInput}
                />
              </div>

              <div className="input-info">
                <h1>State</h1>
                <input
                  name="state"
                  type="text"
                  value={this.state.state}
                  onChange={this.handleInput}
                />
              </div>

              <div className="input-info">
                <h1>Zip Code</h1>
                <input
                  name="zip"
                  type="text"
                  value={this.state.zip}
                  onChange={this.handleInput}
                />
              </div>
            </div>
            <div className="edit-botInfo">
              <div className="input-info">
                <h1>Sq. Ft.</h1>
                <input
                  name="sqft"
                  type="text"
                  value={this.state.sqft}
                  onChange={this.handleInput}
                />
              </div>

              <div className="input-info">
                <h1>Bedrooms</h1>
                <input
                  name="rooms"
                  type="text"
                  value={this.state.rooms}
                  onChange={this.handleInput}
                />
              </div>

              <div className="input-info">
                <h1>Bathrooms</h1>
                <input
                  name="bathrooms"
                  type="text"
                  value={this.state.bathrooms}
                  onChange={this.handleInput}
                />
              </div>
              <div className="input-info">
                <h1>Max</h1>
                <input
                  name="max"
                  type="text"
                  value={this.state.max}
                  onChange={this.handleInput}
                />
              </div>
              <div className="input-info">
                <h1>Year Built</h1>
                <input
                  name="year"
                  type="text"
                  value={this.state.year}
                  onChange={this.handleInput}
                />
              </div>
            </div>
          </div>
          <div className="edit-rightSide">
            <button>Save</button>
          </div>
        </form>
      </div>
    );
  }
}

export default EditProperty;
