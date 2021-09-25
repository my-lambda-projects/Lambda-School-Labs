import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { addVehicle, updateVehicle } from "../../store/actions";
import Form from "react-bootstrap/Form";
import "./VehicleFormDropDown.css";
import { NavLink } from "react-router-dom";
import firebase from "firebase";
import { ReactComponent as Exit } from "../../assets/img/Exit.svg";
import { ReactComponent as BackArrow } from "../../assets/img/back.svg";
import { ReactComponent as PlusSign } from "../../assets/img/lightIcons/plus (1).svg";
// ADD VEHICLE FORM IN THE HAMBURGER DROPDOWN MENU
class VehicleForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //these specifications are in their own object so that specifications can be sent direvtly to the BE
      //this is the object that will be sent to the BE
      specifications: {
        name: "",
        // height: 0, // value that gets sent to the backend, after combinining heightFeet and heightInches into one unit
        heightFeet: undefined, // value that stores the user entry of height in feet
        heightInches: "", // value that stores the user entry of height in inches
        //  width: 0, // these 3 width values follow the same structure as height
        widthFeet: "",
        widthInches: "",
        //   length: 0, // these 3 length values follow the same structure as height
        lengthFeet: "",
        lengthInches: "",
        weight: "", //this will be sent in pounds? check BE docs
        axel_count: "", //integer, unit implied
        class_name: "", //controlled input of one letter
        //created_at: '', //check BE for format, generate date with js
        dual_tires: false, //Bool, checkbox
        trailer: false, //Bool, checkbox
        isSignedIn: false
      }
    };
  }

  componentDidMount() {
    //checks if we are coming from the vehicles tab and therefore if we are editing
    if (this.props.editing) {
      //assigns prefill values of previous entry for the form if we are editing
      this.setState({
        specifications: {
          name: this.props.currentVehicle.name,
          heightFeet: Math.floor(this.props.currentVehicle.height),
          heightInches: Math.round((this.props.currentVehicle.height % 1) * 12),
          widthFeet: Math.floor(this.props.currentVehicle.width),
          widthInches: Math.round((this.props.currentVehicle.width % 1) * 12),
          lengthFeet: Math.floor(this.props.currentVehicle.length),
          lengthInches: Math.round((this.props.currentVehicle.length % 1) * 12),
          weight: this.props.currentVehicle.weight,
          vehicle_class: this.props.currentVehicle.vehicle_class,
          axel_count: this.props.currentVehicle.axel_count,
          dual_tires: this.props.currentVehicle.dual_tires
        }
      });
    }

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
        class_name: event.target.value
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
    let vehicle_class = this.state.specifications.class_name;
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
    console.log("sent", send);
    console.log("ID", this.props.id);
    if (this.props.editing) {
      this.props.updateVehicle(send, this.props.id);
      this.props.editVehicleToggle(this.props.id);
    } else {
      console.log("DO U HIT ME ", this.props);
      this.props.addVehicle(send);
      alert("Vehicle Added!");
      //   this.closeVehicleForm();
      this.props.toggle();
    }
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
    console.log("VEHICLE FORM PROPS", this.props);
    console.log("STATE FROM VEHICLEFORM", this.state);
    return !localStorage.token /*&& !this.state.isSignedIn*/ ? ( //Added checks for Firebase user.
      //Checks if there's a token,if there's one, renders form, if not renders message. -Jerry
      <NavLink to="/login">
        <p>Sign in or create an account to be able to add a vehicle</p>
      </NavLink>
    ) : (
      <>
        <div
          id="dropdown-split-basic-vehicle-new"
          className="hamcolor-vehicle-new"
        >
          <div className="hamend-vehicle-new">RV WAY </div>
          <div className="Exit-vehicles-new" onClick={this.props.toggle}>
            <Exit />
          </div>
        </div>
        <div className="back-new">
          <BackArrow />

          <p
            className="vehicleFormBackContainer-new"
            id="routing-new"
            onClick={this.props.toggle}
          >
            Back
          </p>

          <p className="back-label-new">Add a vehicle</p>
        </div>
        <div className="form-wrapper-new">
          <h3 id="vehicleAddTitle-new">Add a new vehicle</h3>
          <p className="vehicle-spec-new" required>
            Name <span className="required-new">(required)</span>
          </p>
          <div className="measurements-new">
            <input
              className="start-input-div-new"
              type="string"
              required
              name="name"
              placeholder="The Mystery Machine"
              value={this.state.specifications.name}
              onChange={this.handleText}
              id="rv-name-new"
            ></input>
          </div>

          <div className="vehicle-spec-label-new">
            <div className="dimensionsTitle-new">
              <p className="vehicle-spec-new">Height</p>
              <div className="restrictionParent-new">
                <div className="measurementsParent-new">
                  <div className="measurements-new">
                    <p className="measurementsInput-new">FEET</p>

                    <input
                      type="number"
                      min="0"
                      max="100"
                      name="heightFeet"
                      placeholder="0"
                      value={this.state.specifications.heightFeet}
                      onChange={this.handleChange}
                      className="input-boxes-new"
                      required
                      id="heightInput-new"
                    />
                  </div>

                  <div className="plus-new">
                    <PlusSign />
                  </div>

                  <div className="measurements-new">
                    <p className="measurementsInput-new">INCHES</p>
                    <input
                      type="number"
                      min="0"
                      max="11"
                      name="heightInches"
                      placeholder="0"
                      value={this.state.specifications.heightInches}
                      onChange={this.handleChange}
                      className="input-boxes-new"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="dimensionsTitle-new">
              <p className="vehicle-spec-new">Width</p>
              <div className="measurementsParent-new">
                <div className="measurements-new">
                  <p className="measurementsInput-new">FEET</p>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    name="widthFeet"
                    placeholder="0"
                    value={this.state.specifications.widthFeet}
                    onChange={this.handleChange}
                    className="input-boxes-new"
                  />
                </div>

                <div className="plus-new">
                  <PlusSign />
                </div>

                <div className="measurements-new">
                  <p className="measurementsInput-new">INCHES</p>
                  <input
                    type="number"
                    min="0"
                    max="11"
                    name="widthInches"
                    placeholder="0"
                    value={this.state.specifications.widthInches}
                    onChange={this.handleChange}
                    className="input-boxes-new"
                  />
                </div>
              </div>
            </div>
          </div>
          {this.state.specifications.heightFeet === undefined ||
          this.state.specifications.heightFeet === 0 ? (
            <p id="requiredField-new">*Height is required</p>
          ) : null}

          <div className="vehicle-spec-label2-new">
            <div className="dimensionsTitle-new">
              <p className="vehicle-spec-new">Length</p>
              <div className="measurementsParent-new">
                <div className="measurements-new">
                  <p className="measurementsInput-new">FEET</p>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    name="lengthFeet"
                    placeholder="0"
                    value={this.state.specifications.lengthFeet}
                    onChange={this.handleChange}
                    className="input-boxes-new"
                  />
                </div>
                <div className="plus-new">
                  <PlusSign />
                </div>

                <div className="measurements-new">
                  <p className="measurementsInput-new">INCHES</p>
                  <input
                    type="number"
                    min="0"
                    max="11"
                    name="lengthInches"
                    placeholder="0"
                    value={this.state.specifications.lengthInches}
                    onChange={this.handleChange}
                    className="input-boxes-new"
                  />
                </div>
              </div>
            </div>

            <div className="dimensionsTitle-new" id="poundsContainer-new">
              <p className="vehicle-spec-new">Weight</p>
              <div className="measurements-new">
                <p className="measurementsInput-new">POUNDS</p>
                <input
                  type="number"
                  min="0"
                  max="10000"
                  name="weight"
                  placeholder="0"
                  value={this.state.specifications.weight}
                  onChange={this.handleChange}
                  id="input-boxes-pounds-new"
                />
              </div>
            </div>
          </div>

          <div className="form-section-new">
            <div className="measurements-new">
              <p className="measurementsInput-new">AXEL COUNT</p>
              <input
                className="axels"
                type="number"
                min="0"
                max="100"
                name="axel_count"
                placeholder="0"
                value={this.state.specifications.axel_count}
                onChange={this.handleChange}
                className="input-boxes-new"
              ></input>
            </div>

            <div className="tires-check-p-new">
              <div className="tires-p-new">
                <p className="tires-ptag-new">Tires</p>
              </div>
              <div className="tires-check-p2-new">
                <Form.Check
                  name="dual_tires"
                  type="checkbox"
                  checked={this.state.specifications.dual_tires}
                  onChange={this.handleCheck}
                  id={`inline-text-2-new`}
                />
                <p className="tires-ptag-new">I have a dual wheel vehicle</p>
              </div>
            </div>
          </div>

          <p className="vehicle-spec-new">RV TYPE</p>
          <div className="class-radios-new">
            <div className="classAbc-new">
              <div className="rv-radio-new">
                <label className="form-radio-new">
                  <input
                    type="radio"
                    value="ClassA"
                    checked={this.state.specifications.class_name === "ClassA"}
                    onChange={this.handleRadio}
                  />
                  Class A
                </label>
              </div>
              <div className="rv-radio-new">
                <label className="form-radio-new">
                  <input
                    type="radio"
                    value="ClassB"
                    checked={this.state.specifications.class_name === "ClassB"}
                    onChange={this.handleRadio}
                  />
                  Class B
                </label>
              </div>
              <div className="rv-radio-new">
                <label className="form-radio-new">
                  <input
                    type="radio"
                    value="ClassC"
                    checked={this.state.specifications.class_name === "ClassC"}
                    onChange={this.handleRadio}
                  />
                  Class C
                </label>
              </div>
            </div>
            <div className="FithWheelContainer-new">
              <div className="rv-radio-new">
                <label className="form-radio-new">
                  <input
                    type="radio"
                    value="5thWheel"
                    checked={
                      this.state.specifications.class_name === "5thWheel"
                    }
                    onChange={this.handleRadio}
                  />
                  5TH Wheel
                </label>
              </div>
              <div className="rv-radio-tagalong-new">
                <input
                  type="radio"
                  value="tagalong"
                  checked={this.state.specifications.class_name === "tagalong"}
                  onChange={this.handleRadio}
                />
                <p id="tagalongCamper-new">Tagalong Camper</p>
              </div>
            </div>
            <div className="buttons-new">
              <button
                className="btn-submit-new"
                id="cancelButton-new"
                onClick={this.props.selectVehicles}
              >
                Cancel
              </button>
              {this.state.specifications.name === "" ? (
                <button
                  className="btn-submit-new"
                  id="invalidAddButton-new"
                  onClick={this.requiredField}
                >
                  Add
                </button>
              ) : this.state.specifications.heightFeet === undefined ||
                this.state.specifications.heightFeet === 0 ? (
                <button
                  className="btn-submit-new"
                  id="invalidAddButton-new"
                  onClick={this.requiredField}
                >
                  Add
                </button>
              ) : (
                <button
                  className="btn-submit-new"
                  id="validAddButton-new"
                  onClick={this.vehicleSubmit}
                >
                  Add
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
  console.log("state", state);
  return { id: state.data[0].value.user.id };
};

export default withRouter(
  connect(mapStateToProps, { addVehicle, updateVehicle })(VehicleForm)
);
