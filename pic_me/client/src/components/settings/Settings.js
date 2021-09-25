import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { connect } from "react-redux";
// import { reduxForm, Field } from "redux-form";
// import { settings } from "../actions";
// import Bread from "./Bread";
import Account from './Account';
import Profile from './Profile';
import Deleteaccount from './Deleteaccount';
import { getInfo } from '../../actions';

class Settings extends Component {
	componentWillMount() {
		this.props.getInfo();
		// console.log('auth', this.props.authenticated);
	}

	// componentWillReceiveProps(nextProps) {
	// this.props.getInfo();
	// }

	renderAlert() {
		if (this.props.error) {
			return (
				<div className="alert alert-danger">
					<strong>Oops!</strong> {this.props.error}
				</div>
			);
		} else if (this.props.message) {
			return (
				<div className="alert alert-success">
					<strong>Success!</strong> {this.props.message}
				</div>
			);
		}
	}

	render() {
		return (
			<div className="container">
				{this.renderAlert()}

				<h3>Update profile</h3>
				<hr />
				<Profile />
				<h3>Change email or password</h3>
				<hr />
				<Account />
				<h3>Delete account</h3>
				<hr />
				<p>
					Once you delete your account, there is no going back. Please be
					certain.
				</p>
				<Deleteaccount history={this.props.history} />
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		error: state.auth.error,
		message: state.auth.message,
	};
};

export default connect(mapStateToProps, { getInfo })(Settings);
