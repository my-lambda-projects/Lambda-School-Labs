import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { profile, resetErrors } from '../../actions';
// import { load as loadData } from '../reducers/profile';
// import Bread from "./Bread";

class Profile extends Component {
	componentWillMount() {
		this.props.resetErrors();
		// this.props.load(this.props.user);
		// this.props.load(this.props.user);
	}

	// componentWillReceiveProps() {
	// this.props.load(this.props.user);
	// }

	profileFormHandler = ({ firstName, lastName, nickNames }) => {
		this.props.profile(firstName, lastName, nickNames);
	};

	render() {
		// const { load, pristine, submitting } = this.props;
		const { pristine, submitting } = this.props;

		return (
			<div className="Profile">
				<form onSubmit={this.props.handleSubmit(this.profileFormHandler)}>
					{/* <div className="form-group col-md-6">
						<button
							className="btn btn-primary"
							type="button"
							onClick={_ => load(this.props.user)}
						>
							Show account data
						</button>
					</div> */}
					<div className="form-group col-md-6">
						<label>First name</label>
						<Field
							className="form-control"
							name="firstName"
							component="input"
							type="text"
						/>
					</div>

					<div className="form-group col-md-6">
						<label>Last name</label>
						<Field
							className="form-control"
							name="lastName"
							component="input"
							type="text"
						/>
					</div>

					<div className="form-group col-md-6">
						<label>Nick names</label>
						<Field
							className="form-control"
							name="nickNames"
							component="input"
							type="text"
						/>
					</div>

					<div className="form-group col-md-6">
						<button
							action="submit"
							disabled={pristine || submitting}
							className="btn btn-primary"
						>
							Edit Profile
						</button>
					</div>
				</form>
			</div>
		);
	}
}

Profile = reduxForm({
	form: 'profile',
	fields: ['firstName', 'lastName', 'nickNames'],
	enableReinitialize: true,
	// keepDirtyOnReinitialize: true,
})(Profile);

Profile = connect(
	state => ({
		authenticated: state.auth.authenticated,
		error: state.auth.error,
		// user: state.user,
		initialValues: state.user,
	}),
	// { load: loadData, profile, resetErrors },
	{ profile, resetErrors },
)(Profile);

export default Profile;

// const mapStateToProps = state => ({
// 	authenticated: state.auth.authenticated,
// 	error: state.auth.error,
// 	user: state.user,
// 	initialValues: state.profile.data,
// });

// Profile = connect(mapStateToProps, {
// 	profile,
// 	load: loadData,
// })(Profile);

// export default reduxForm({
// 	form: 'profile',
// 	fields: ['firstName', 'lastName', 'nickNames'],
// 	enableReinitialize: true,
// 	keepDirtyOnReinitialize: true,
// })(Profile);
