import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { addVehicle, updateVehicle } from "../../store/actions";
import Form from "react-bootstrap/Form";
import "./UpdateVehicleForm.css";
import { NavLink } from "react-router-dom";
import firebase from "firebase";
import { ReactComponent as Exit } from "../../assets/img/Exit.svg";
import { ReactComponent as BackArrow } from "../../assets/img/back.svg";
import { ReactComponent as PlusSign } from "../../assets/img/lightIcons/plus (1).svg";
// FORM FOR UPDATING YOUR VEHICLE
class VehicleForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //these specifications are in their own object so that specifications can be sent direvtly to the BE
      //this is the object that will be sent to the BE
      specifications: {
        name: "",
        height: "", // value that gets sent to the backend, after combinining heightFeet and heightInches into one unit
        heightFeet: undefined, // value that stores the user entry of height in feet
        heightInches: "", // value that stores the user entry of height in inches
        width: "", // these 3 width values follow the same structure as height
        widthFeet: "",
        widthInches: "",
        length: "", // these 3 length values follow the same structure as height
        lengthFeet: "",
        lengthInches: "",
        weight: "", //this will be sent in pounds? check BE docs
        axel_count: "", //integer, unit implied
        vehicle_class: "", //controlled input of one letter
        //created_at: '', //check BE for format, generate date with js
        dual_tires: false, //Bool, checkbox
        trailer: false, //Bool, checkbox
        isSignedIn: false
      }
    };
  }

  componentDidMount() {
    // //checks if we are coming from the vehicles tab and therefore if we are editing
    // if (this.props.editing) {
    //   //assigns prefill values of previous entry for the form if we are editing
    //   this.setState({
    //     specifications: {
    //       name: this.props.currentVehicle.name,
    //       heightFeet: Math.floor(this.props.currentVehicle.height),
    //       heightInches: Math.round((this.props.currentVehicle.height % 1) * 12),
    //       widthFeet: Math.floor(this.props.currentVehicle.width),
    //       widthInches: Math.round((this.props.currentVehicle.width % 1) * 12),
    //       lengthFeet: Math.floor(this.props.currentVehicle.length),
    //       lengthInches: Math.round((this.props.currentVehicle.length % 1) * 12),
    //       weight: this.props.currentVehicle.weight,
    //       vehicle_class: this.props.currentVehicle.vehicle_class,
    //       axel_count: this.props.currentVehicle.axel_count,
    //       dual_tires: this.props.currentVehicle.dual_tires
    //     }
    //   });
    // }

    // axios
    //   .get(`${process.env.REACT_APP_BASE_URL}/vehicle`, {
    //     headers: { Authorization: localStorage.getItem("token") },
    //     "Content-Type": "application/json"
    //   })
    //   .then(res => {
    //     console.log("update vehicle res", res.data); // data was created successfully and logs to console

    this.setState({
      specifications: this.props.specifications
    });
    console.log("update Specifications", this.state.specifications);
    console.log("update Specifications in props", this.props.specifications);

    //   })
    //   .catch(err => {
    //     console.log("get vehicle err", err); // there was an error creating the data and logs to console
    //   });

    // this.props.vehicles.vehicles &&
    //   this.props.vehicles.vehicles.map(e => {
    //     this.props.Update(e.id)
    //   })

    this.unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged(user => this.setState({ isSignedIn: !!user }));
  }

  //handles input of numbers and converts into the right data type of int
  handleChange = event => {
    this.setState({
      specifications: {
        ...this.state.specifications,
        [event.target.name]: parseInt(event.target.value)
      }
    });
  };

  //handles text only input
  handleText = event => {
    this.setState({
      specifications: {
        ...this.state.specifications,
        [event.target.name]: event.target.value
      }
    });
  };

  //assigns state to a value based on whether a box is checked
  handleCheck = event => {
    //const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    this.setState({
      specifications: {
        ...this.state.specifications,
        [event.target.name]: event.target.checked
      }
    });
  };

  //assigns state to a value based on which radio button has been clicked
  handleRadio = event => {
    //const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    this.setState({
      specifications: {
        ...this.state.specifications,
        vehicle_class: event.target.value
      }
    });
  };

  //   closeVehicleForm = () =>
  //     this.props.setState({
  //       vehicleForm: "off",
  //       routing: "on",
  //       vehicles: "off",
  //       directions: "off"
  //     });

  //occurs when the submit button is clicked
  //converts inputs from user to correct values to send to the backend, then send them
  vehicleSubmit = event => {
    //     event.preventDefault();
    //     let div = document.getElementsByClassName("mainSidebarContainer")[0];
    //     div.style.margin = "25px";
    //     div.style.height = "335px";

    // this.props.setState({
    //   ...this.props.state,
    //   vehicleForm: "off",
    //   routing: "on",
    //   vehicles: "off",
    //   directions: "off"
    // });

    // let menu = document.querySelector(
    //   ".btn-group-vertical > .btn, .btn-group > .btn"
    // );
    // menu.style.backgroundColor = "white";

    // event.preventDefault();
    //Google analytics tracking
    window.gtag("event", "create vehicle", {
      event_category: "submit",
      event_label: "create vehicle"
    });

    let height = this.combineDistanceUnits(
      this.state.specifications.heightInches,
      this.state.specifications.heightFeet
    );
    let width = this.combineDistanceUnits(
      this.state.specifications.widthInches,
      this.state.specifications.widthFeet
    );
    let length = this.combineDistanceUnits(
      this.state.specifications.lengthInches,
      this.state.specifications.lengthFeet
    );
    let weight = this.state.specifications.weight;
    let axel_count = this.state.specifications.axel_count;
    let vehicle_class = this.state.specifications.vehicle_class;
    let trailer = this.state.specifications.trailer;
    if (vehicle_class === "Trailer") {
      vehicle_class = "";
      trailer = true;
    }
    if (weight === "") {
      weight = 0;
    }
    if (axel_count === "") {
      axel_count = 0;
    }
    //make sure all values entered are sent as the correct data type to the back end
    parseFloat(height);
    parseFloat(length);
    parseFloat(width);
    parseFloat(weight);
    parseInt(axel_count);

    //send is the object that is sent to the web backend to be stored
    //it is made using values from the form, some of which are processed and converted before being assigned to the keys here
    let send = {
      name: this.state.specifications.name,
      height: height,
      width: width,
      length: length,
      weight: weight,
      axel_count: axel_count,
      vehicle_class: vehicle_class,
      trailer: trailer,
      dual_tires: this.state.specifications.dual_tires,
      user_id: this.props.id
    };
    // console.log("sent", send);
    // console.log("ID", this.props.id);

    this.props.updateVehicle(send, this.props.specifications.id);
    alert("Vehicle Updated!");
    this.props.toggleUpdateForm();
    this.setState({
      // specifications: {
      //   name: "",
      //   heightFeet: "",
      //   heightInches: "",
      //   widthFeet: "",
      //   widthInches: "",
      //   lengthFeet: "",
      //   lengthInches: "",
      //   weight: "",
      //   axel_count: "",
      //   class_name: "",
      //   dual_tires: false,
      //   trailer: false
      // }
    });
  };

  //combines feet and inch units into feet only, to be sent to the backend
  combineDistanceUnits = (inchesIn, feetIn) => {
    let inches = inchesIn;
    let feet = feetIn;
    if (feet === "") {
      feet = 0;
    }
    if (inches === "") {
      inches = 0;
    }
    const inchesCombined = feet + inches / 12;
    return inchesCombined;
  };


  render() {
    console.log("UPDATE FORM PROPS", this.props);
    // console.log("VEHICLE FORM PROPS", this.props);
    // console.log("STATE FROM VEHICLEFORM", this.state);
    return !localStorage.token /*&& !this.state.isSignedIn*/ ? ( //Added checks for Firebase user.
      //Checks if there's a token,if there's one, renders form, if not renders message. -Jerry
      <NavLink to="/login">
        <p>Sign in or create an account to be able to add a vehicle</p>
      </NavLink>
    ) : (
      <>
        <div
          id="dropdown-split-basic-vehicle-update"
          className="hamcolor-vehicle-update"
        >
          <div className="hamend-vehicle-update">RV WAY </div>
          <div
            className="Exit-vehicles-update"
            onClick={this.props.toggleUpdateForm}
          >
            <Exit />
          </div>
        </div>
        <div className="back-update">
          <BackArrow />

          <p
            className="vehicleFormBackContainer-update"
            id="routing-update"
            onClick={this.props.toggleUpdateForm}
          >
            Back
          </p>

          <p className="back-label-update">Edit Vehicle</p>
        </div>
        <div className="form-wrapper-update">
          <h3 id="vehicleAddTitle-update">Edit Vehicle information</h3>
          <p className="vehicle-spec-update" required>
            Name <span className="required-update">(required)</span>
          </p>
          <div className="measurements-update">
            <input
              className="start-input-div-update"
              type="string"
              required
              name="name"
              placeholder="The Mystery Machine"
              value={this.state.specifications.name}
              onChange={this.handleText}
              id="rv-name-update"
            ></input>
          </div>

          <div className="vehicle-spec-label-update">
            <div className="dimensionsTitle-update">
              <p className="vehicle-spec-update">Height</p>
              <div className="restrictionParent-update">
                <div className="measurementsParent-update">
                  <div className="measurements-update">
                    <p className="measurementsInput-update">FEET</p>

                    <input
                      type="number"
                      min="0"
                      max="100"
                      name="heightFeet"
                      placeholder="0"
                      value={this.state.specifications.heightFeet}
                      onChange={this.handleChange}
                      className="input-boxes-update"
                      required
                      id="heightInput-update"
                    />
                  </div>

                  <div className="plus-update">
                    <PlusSign />
                  </div>

                  <div className="measurements-update">
                    <p className="measurementsInput-update">INCHES</p>
                    <input
                      type="number"
                      min="0"
                      max="11"
                      name="heightInches"
                      placeholder="0"
                      value={this.state.specifications.heightInches}
                      onChange={this.handleChange}
                      className="input-boxes-update"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="dimensionsTitle-update">
              <p className="vehicle-spec-update">Width</p>
              <div className="measurementsParent-update">
                <div className="measurements-update">
                  <p className="measurementsInput-update">FEET</p>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    name="widthFeet"
                    placeholder="0"
                    value={this.state.specifications.widthFeet}
                    onChange={this.handleChange}
                    className="input-boxes-update"
                  />
                </div>

                <div className="plus-update">
                  <PlusSign />
                </div>

                <div className="measurements-update">
                  <p className="measurementsInput-update">INCHES</p>
                  <input
                    type="number"
                    min="0"
                    max="11"
                    name="widthInches"
                    placeholder="0"
                    value={this.state.specifications.widthInches}
                    onChange={this.handleChange}
                    className="input-boxes-update"
                  />
                </div>
              </div>
            </div>
          </div>
          {this.state.specifications.heightFeet === undefined ||
          this.state.specifications.heightFeet === 0 ? (
            <p id="requiredField-update">*Height is required</p>
          ) : null}

          <div className="vehicle-spec-label2-update">
            <div className="dimensionsTitle-update">
              <p className="vehicle-spec-update">Length</p>
              <div className="measurementsParent-update">
                <div className="measurements-update">
                  <p className="measurementsInput-update">FEET</p>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    name="lengthFeet"
                    placeholder="0"
                    value={this.state.specifications.lengthFeet}
                    onChange={this.handleChange}
                    className="input-boxes-update"
                  />
                </div>
                <div className="plus-update">
                  <PlusSign />
                </div>

                <div className="measurements-update">
                  <p className="measurementsInput-update">INCHES</p>
                  <input
                    type="number"
                    min="0"
                    max="11"
                    name="lengthInches"
                    placeholder="0"
                    value={this.state.specifications.lengthInches}
                    onChange={this.handleChange}
                    className="input-boxes-update"
                  />
                </div>
              </div>
            </div>

            <div className="dimensionsTitle-update" id="poundsContainer-update">
              <p className="vehicle-spec-update">Weight</p>
              <div className="measurements-update">
                <p className="measurementsInput-update">POUNDS</p>
                <input
                  type="number"
                  min="0"
                  max="10000"
                  name="weight"
                  placeholder="0"
                  value={this.state.specifications.weight}
                  onChange={this.handleChange}
                  id="input-boxes-pounds-update"
                />
              </div>
            </div>
          </div>

          <div className="form-section-update">
            <div className="measurements-update">
              <p className="measurementsInput-update">AXEL COUNT</p>
              <input
                className="axels"
                type="number"
                min="0"
                max="100"
                name="axel_count"
                placeholder="0"
                value={this.state.specifications.axel_count}
                onChange={this.handleChange}
                className="input-boxes-update"
              ></input>
            </div>

            <div className="tires-check-p-update">
              <div className="tires-p-update">
                <p className="tires-ptag-update">Tires</p>
              </div>
              <div className="tires-check-p2-update">
                <Form.Check
                  name="dual_tires"
                  type="checkbox"
                  checked={this.state.specifications.dual_tires}
                  onChange={this.handleCheck}
                  id={`inline-text-2-update`}
                />
                <p className="tires-ptag-update">I have a dual wheel vehicle</p>
              </div>
            </div>
          </div>

          <p className="vehicle-spec-update">RV TYPE</p>
          <div className="class-radios-update">
            <div className="classAbc-update">
              <div className="rv-radio-update">
                <label className="form-radio-update">
                  <input
                    type="radio"
                    value="ClassA"
                    checked={
                      this.state.specifications.vehicle_class === "ClassA"
                    }
                    onChange={this.handleRadio}
                  />
                  Class A
                </label>
              </div>
              <div className="rv-radio-update">
                <label className="form-radio-update">
                  <input
                    type="radio"
                    value="ClassB"
                    checked={
                      this.state.specifications.vehicle_class === "ClassB"
                    }
                    onChange={this.handleRadio}
                  />
                  Class B
                </label>
              </div>
              <div className="rv-radio-update">
                <label className="form-radio-update">
                  <input
                    type="radio"
                    value="ClassC"
                    checked={
                      this.state.specifications.vehicle_class === "ClassC"
                    }
                    onChange={this.handleRadio}
                  />
                  Class C
                </label>
              </div>
            </div>
            <div className="FithWheelContainer-update">
              <div className="rv-radio-update">
                <label className="form-radio-update">
                  <input
                    type="radio"
                    value="5thWheel"
                    checked={
                      this.state.specifications.vehicle_class === "5thWheel"
                    }
                    onChange={this.handleRadio}
                  />
                  5TH Wheel
                </label>
              </div>
              <div className="rv-radio-tagalong-update">
                <input
                  type="radio"
                  value="tagalong"
                  checked={
                    this.state.specifications.vehicle_class === "tagalong"
                  }
                  onChange={this.handleRadio}
                />
                <p id="tagalongCamper-update">Tagalong Camper</p>
              </div>
            </div>
            <div className="buttons-update">
              <button
                className="btn-submit-update"
                id="cancelButton-update"
                onClick={this.props.toggleUpdateForm}
              >
                Cancel
              </button>
              {this.state.specifications.name === "" ? (
                <button
                  className="btn-submit-update"
                  id="invalidAddButton-update"
                  onClick={this.requiredField}
                >
                  Save
                </button>
              ) : this.state.specifications.heightFeet === undefined ||
                this.state.specifications.heightFeet === 0 ? (
                <button
                  className="btn-submit-update"
                  id="invalidAddButton-update"
                  onClick={this.requiredField}
                >
                  Save
                </button>
              ) : (
                <button
                  className="btn-submit-update"
                  id="validAddButton-update"
                  onClick={this.vehicleSubmit}
                >
                  Save
                </button>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}

// const mapStateToProps = state => ({});
const mapStateToProps = state => {
  //  vehicles: state.vehicles

  return { id: state.data[0].value.user.id };
};

export default withRouter(
  connect(mapStateToProps, { addVehicle, updateVehicle })(VehicleForm)
);
