import React, { Component } from "react";
import { connect } from "react-redux";
//change the route for this
import { addMeal } from "../../store/actions/mealActions.js";
import { withRouter, Link, Route } from "react-router-dom";
// import { Alert } from "reactstrap";
import axios from "axios";

class OneWeather extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="weather-container">
				<p>City: {this.props.weather.name}</p>
				<p>Temp: {this.props.weather.temp}</p>
				<p>Humidity: {this.props.weather.humidity}</p>
				<p>Pressure: {this.props.weather.pressure}</p>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		user: state.userReducer.user,
		ingredient: state.ingredient
	};
};

export default connect(
	mapStateToProps,
	{ addMeal }
)(withRouter(OneWeather));
