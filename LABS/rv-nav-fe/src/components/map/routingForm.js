import React from 'react';
import Button from 'react-bootstrap/Button';
import RoutingDropdown from '../map/RoutingDropdown.js'
import { connect } from "react-redux";
import "./routingForm.css"


const RoutingForm = (props) => {

  console.log('props on RoutingForm', props)

  return (

      <div className="routingFormDropdownInput">
        <RoutingDropdown addAVehicleForm={props.addAVehicleForm} state={props.state} setState={props.setState}/>
        <form className="route-form" onSubmit={(event) => {
          event.preventDefault()
          props.onChangeHandler()
          }}>
          <div className="start-input-div">
            <span className="choose-a-starting-point">Choose a starting point...</span>
            <input
              className="route-input"
              id="start"
              required
              type="text"
              placeholder="Chicago, IL"
              name="start"
              value={props.start}
              onChange={props.routeChangeHandler}
            />
          </div>
          <div className="end-input-div">
            <span className="where-are-you-going">Where are you going?</span>
            <input
              className="route-input"
              id="end" required
              type="text"
              placeholder="42 Walaby Way, Sydney"
              name="end"
              value={props.end}
              onChange={props.routeChangeHandler}
            />
          </div>
          {props.end !== '' && props.start !== '' ? 
            <div className='routingFormButton'>
              <Button variant="warning" id="route-button" type="submit" onClick={props.buttonSelect}>Get Directions</Button>
            </div>
            : null
          } 
        </form>
      </div>
  )
}

const mapStateToProps = state => {
  console.log("state in route form", state)
  return {
    selected_id: state.selected_id,
    vehicles: state.vehicles
  }
}

export default connect(
  mapStateToProps
)(RoutingForm)
