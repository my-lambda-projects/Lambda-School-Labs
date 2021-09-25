import React, { useState } from "react";
import { connect } from "react-redux";
import { getVehicles, addVehicle } from "../../store/actions";
import { selectVehicle } from "../../store/actions/selectVehicle.js";
import VehicleForm from "../vehicleForm/VehicleForm.js";

//CSS STYLES
import "../map/routingForm.css";
import "./routingDropdown.scss";

const RoutingDropdown = props => {
  console.log("RoutingDropdown props", props);

  const [state, setState] = useState({
    //Boolean for dropdown window to hide and show
    dropdown: false
  });

  const [currRV, setCurrRV] = useState("");

  const selected = id => {
    props.selectVehicle(id);
  };

  const currentRV = id => {
    setCurrRV(id);
  };

  const dropdownToggle = () => {
    //toggles dropdown
    setState({ ...state, dropdown: !state.dropdown });
  };

  return (
    <div className="dropdownContainer">
      {props.state.routing === "on" ? (
        <div className="dropdown-menu-class">
          <span className="what-vehcile-are-you-routing-with">
            What vehicle are you routing with?
          </span>
          <div className="dd-wrapper" onClick={dropdownToggle}>
            <ul className="dd-list">
              <div className="addAVehicleTitle">
                <p>{currRV}</p>
                <div id="arrowDown"></div>
              </div>

              <div className="vehiclesListContainer">
                {state.dropdown === true ? (
                  <div className="vehiclesList">
                    <section>
                      <p onClick={props.addAVehicleForm}>Add a vehicle...</p>
                    </section>
                    {/* That's right Jerry two functions are being called on the same on click!! How do you like me now!?  🤣🤣*/}
                    <div id="vehicleOptions">
                      {props.vehicles &&
                        props.vehicles.map((rv, index) => (
                          <li
                            key={index}
                            onClick={() => {
                              selected(rv.id);
                              currentRV(rv.name);
                            }}
                          >
                            {rv.name}
                          </li>
                        ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </ul>
          </div>
        </div>
      ) : (
        <VehicleForm />
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  vehicles: state.vehicles.vehicles,
  selected_id: state.selected_id
});

export default connect(mapStateToProps, {
  getVehicles,
  selectVehicle,
  addVehicle
})(RoutingDropdown);
