import React, { Component } from "react";
import styled from "styled-components";
import "./VehicleLoginForm.scss";
import { ReactComponent as BackArrow } from "../../assets/img/back.svg";

const Header = styled.div`
  height: 80px;
  width: auto
  background: #2A2E43;
`;

const Text = styled.span`
  position: absolute;
  left: 0.74%;
  // right: 90.31%;
  top: 1.25%;
  bottom: 12.5%;
  color: rgba(53, 195, 226, 0.95);
  font-size: 36px;
  font-weight: bold;
  font-family: Heebo;
  height: 60px;
`;

class VehicleInfo extends Component {
  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    const {
      handleRadio,
      handleChange,
      handleCheck,
      firstName,
      name,
      heightFeet,
      heightInches,
      widthFeet,
      widthInches,
      lengthFeet,
      lengthInches,
      weight,
      axel_count,
      vehicle_class,
      dual_tires,
      trailer,
      isSignedIn
    } = this.props;

    return (
      <div className="register-wrapper">
        <Header className="rv-way-header">
          <Text className="rv-way-header-text">RV WAY</Text>
        </Header>

        <div className="register-main">
          <form className="register-main-form">
            <div className="go-back-div">
              <a className="go-back">
                <BackArrow />
                <span
                  className="LoginFormBackArrow"
                  id="routing"
                  onClick={this.back}
                >
                  Back
                </span>
              </a>
            </div>
            <div className="greeting">
              <h4>
                <b>It's great to meet you, {firstName}!</b>
              </h4>

              <h4>Let's talk about your vehicle...</h4>
            </div>

            <div className="Vehicle-Info-Wrapper">
              <div className="Vehicle-Name">
                <p>Vehicle Name</p>
                <input
                  className="vehicleRegisterInput"
                  type="string"
                  name="name"
                  value={name}
                  onChange={handleChange("name")}
                  placeholder=""
                />
              </div>

              <h6 className="VDLabel">
                <b>Vehicle Dimensions</b>
              </h6>

              <div className="Vehicle-Info">
                <div className="Vehicle-Info-Size-1st">
                  <div className="VDMeasurements">
                    <p>Height</p>
                    <p>Width</p>
                  </div>

                  <div className="registerInputBoxes-Wrapper1">
                    <input
                      className="registerInputBoxes"
                      type="number"
                      min="0"
                      max="100"
                      name="heightFeet"
                      value={heightFeet}
                      onChange={handleChange("heightFeet")}
                      placeholder=""
                    />
                    <p className="inputLabels">ft.</p>
                    <input
                      className="registerInputBoxes"
                      type="number"
                      min="0"
                      max="11"
                      name="heightInches"
                      value={heightInches}
                      onChange={handleChange("heightInches")}
                      placeholder=""
                    />
                    <p className="inputLabels">in.</p>
                  </div>
                  <div className="registerInputBoxes-Wrapper2">
                    <input
                      className="registerInputBoxes"
                      type="number"
                      min="0"
                      max="100"
                      name="widthFeet"
                      value={widthFeet}
                      onChange={handleChange("widthFeet")}
                      placeholder=""
                    />
                    <p className="inputLabels">ft.</p>
                    <input
                      className="registerInputBoxes"
                      type="number"
                      min="0"
                      max="11"
                      name="widthInches"
                      value={widthInches}
                      onChange={handleChange("widthInches")}
                      placeholder=""
                    />
                    <p className="inputLabels">in.</p>
                  </div>
                </div>

                <div className="Vehicle-Info-Size-2nd">
                  <div className="VDMeasurements">
                    <p>Length</p>
                    <p>Weight</p>
                  </div>

                  <div className="registerInputBoxes-Wrapper3">
                    <input
                      className="registerInputBoxes"
                      type="number"
                      min="0"
                      max="100"
                      name="lengthFeet"
                      value={lengthFeet}
                      onChange={handleChange("lengthFeet")}
                      placeholder=""
                    />
                    <p className="inputLabels">ft.</p>
                    <input
                      className="registerInputBoxes"
                      type="number"
                      min="0"
                      max="11"
                      name="lengthInches"
                      value={lengthInches}
                      onChange={handleChange("lengthInches")}
                      placeholder=""
                    />
                    <p className="inputLabels">in.</p>
                  </div>

                  <div className="registerInputBoxes-Wrapper4">
                    <input
                      className="registerInputBoxes"
                      type="number"
                      min="0"
                      name="weight"
                      value={weight}
                      onChange={handleChange("weight")}
                      placeholder=""
                    />
                    <p className="inputLabels">lbs.</p>
                  </div>
                </div>

                <div className="Vehicle-Info-Size-3rd">
                  <div className="axle">
                    <p>Axle Count</p>
                    <input
                      className="registerInputBoxes"
                      type="number"
                      min="0"
                      max="8"
                      name="axel_count"
                      value={axel_count}
                      onChange={handleChange("axel_count")}
                      placeholder=""
                    />
                  </div>
                  <div className="tires">
                    <label className="tiresLabel">
                      <p className="check">Tires</p>
                      <input
                        className="registerCheckbox"
                        type="checkbox"
                        checked={dual_tires}
                        name="dual_tires"
                        onChange={handleCheck}
                        value={dual_tires}
                      />
                      I have a dual wheel vehicle
                    </label>
                  </div>
                </div>

                <p className="classType">RV Type</p>
                <div className="Vehicle-Info-Size-4th">
                  <label>
                    <input
                      type="radio"
                      value="ClassA"
                      name="class_A"
                      checked={vehicle_class === "ClassA"}
                      onChange={handleRadio}
                    />
                    Class A
                  </label>
                  <label>
                    <input
                      className="label"
                      type="radio"
                      value="ClassB"
                      name="class_B"
                      checked={vehicle_class === "ClassB"}
                      onChange={handleRadio}
                    />
                    Class B
                  </label>
                  <label>
                    <input
                      className="label"
                      type="radio"
                      value="ClassC"
                      name="class_C"
                      checked={vehicle_class === "ClassC"}
                      onChange={handleRadio}
                    />
                    Class C
                  </label>
                  <label>
                    <input
                      // className="label"
                      type="radio"
                      value="5thWheel"
                      name="fifth_wheel"
                      checked={vehicle_class === "5thWheel"}
                      onChange={handleRadio}
                    />
                    5th wheel
                  </label>
                  <label>
                    <input
                      className="label1"
                      type="radio"
                      value="PullBehind"
                      name="pull_behind"
                      checked={vehicle_class === "PullBehind"}
                      onChange={handleRadio}
                    />
                    Pull behind
                  </label>
                </div>

                <button
                  className="register-lets-go-button"
                  variant="warning"
                  type="submit"
                  onClick={this.continue}
                >
                  Add to My Vehicles
                </button>

                <div className="already-have-an-account">
                  <a>
                    <span onClick={this.continue}>Skip this step</span>
                  </a>
                </div>
              </div>
            </div>
            {/* Vehicle Info ENDS here */}
          </form>
        </div>
      </div>
    );
  }
}

export default VehicleInfo;
