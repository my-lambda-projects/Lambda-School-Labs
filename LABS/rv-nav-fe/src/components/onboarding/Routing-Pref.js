import React, { Component } from "react";
import "./Routing-Pref.css";
import styled from "styled-components";
import OnboardLoad from "../auth/loading/LoadingPage";

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

class RoutingPref extends Component {
  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    console.log("STATE", this.props.state);
    console.log("PROPS", this.props);
    const {
      handleCheck,
      onSubmit,
      DirtRoads,
      SteepGrade,
      Potholes
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
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.241 18.52L4.36195 12.64C4.25139 12.5733 4.16 12.4791 4.09657 12.3666C4.03314 12.2542 3.99989 12.1272 4.00001 11.998C3.99924 11.8654 4.03373 11.7349 4.09999 11.62C4.13421 11.5572 4.17725 11.4996 4.22792 11.449C4.25232 11.4246 4.27839 11.4019 4.30592 11.381L10.2379 5.44904C10.3787 5.30853 10.5695 5.22961 10.7684 5.22961C10.9674 5.22961 11.1582 5.30853 11.299 5.44904C11.4395 5.58984 11.5184 5.78063 11.5184 5.97954C11.5184 6.17845 11.4395 6.36924 11.299 6.51004L6.55995 11.248H19.2479C19.3465 11.248 19.4441 11.2675 19.5352 11.3052C19.6262 11.343 19.709 11.3983 19.7787 11.4681C19.8484 11.5378 19.9035 11.6206 19.9412 11.7117C19.9788 11.8028 19.9981 11.9005 19.9979 11.999C19.9979 12.198 19.919 12.3887 19.7783 12.5294C19.6377 12.67 19.4468 12.749 19.2479 12.749H6.5879L11.299 17.46C11.4395 17.6008 11.5184 17.7916 11.5184 17.9905C11.5184 18.1895 11.4395 18.3802 11.299 18.521C11.2292 18.5907 11.1464 18.6459 11.0553 18.6835C10.9642 18.721 10.8665 18.7403 10.768 18.74C10.5701 18.7392 10.3807 18.6601 10.241 18.52Z"
                    fill="#00B2D9"
                  />
                </svg>{" "}
                <span className="go-back" onClick={this.back}>
                  Back
                </span>
              </a>
            </div>
            <div className="register-header">
              <h2 className="register-welcome-home">
                Tell us about your routing preferences!
              </h2>
            </div>
            <div className="avoid">
              <span>I want to avoid</span>
            </div>
            <div className="register-input-and-button">
              <div>
                <label htmlFor="DirtRoads" className="register-main-form-label">
                  <input
                    onChange={handleCheck}
                    name="DirtRoads"
                    id="DirtRoads"
                    type="checkbox"
                    className="checkboxes"
                    value={DirtRoads}
                    checked={DirtRoads}
                  ></input>
                  <span className="checkbox-custom"></span>
                  <span className="checkbox-options">
                    Dirt Roads longer than 2 miles
                  </span>
                </label>
              </div>

              <div>
                <label htmlFor="Steep" className="register-main-form-label">
                  <input
                    name="SteepGrade"
                    id="Steep"
                    type="checkbox"
                    className="checkboxes"
                    value={SteepGrade}
                    checked={SteepGrade}
                    onChange={handleCheck}
                  ></input>
                  <span className="checkbox-custom"></span>
                  <span className="checkbox-options">
                    Grades steeper than 10%
                  </span>
                </label>
              </div>

              <div>
                <label htmlFor="Potholes" className="register-main-form-label">
                  <input
                    className="checkboxes"
                    name="Potholes"
                    id="Potholes"
                    type="checkbox"
                    value={Potholes}
                    checked={Potholes}
                    onChange={handleCheck}
                  ></input>
                  <span className="checkbox-custom"></span>
                  <span className="checkbox-options">Potholes</span>
                </label>
              </div>

              <button
                className="register-lets-go-button"
                variant="warning"
                type="submit"
                onClick={onSubmit}
              >
                Add to My Preferences
              </button>

              <div className="already-have-an-account">
                {/* <a id="sign-in" href="/map">
                  <span>Skip this step</span>
                </a> */}
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default RoutingPref;
