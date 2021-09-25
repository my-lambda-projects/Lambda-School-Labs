import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { reduxForm, Field } from 'redux-form';
import { reduxForm } from 'redux-form';
import { deleteaccount } from '../../actions';

class Deleteaccount extends Component {
	componentWillMount() {
		// console.log('auth', this.props.authenticated);
	}

	// deleteFormHandler = ({ email, password }) => {
	deleteFormHandler = _ => {
		this.props.deleteaccount(this.props.history);
	};

	renderAlert() {
		if (this.props.response) {
			return <div className="alert alert-danger">{this.props.response}</div>;
		}
	}

	render() {
		return (
			<div className="Deleteaccount">
				{this.renderAlert()}
				<div>
					<form onSubmit={this.props.handleSubmit(this.deleteFormHandler)}>
						{/* <div className="form-group col-md-6">
							<label>email</label>
							<Field
								className="form-control"
								name="email"
								component="input"
								type="text"
							/>
						</div>

						<div className="form-group col-md-6">
							<label>password</label>
							<Field
								className="form-control"
								name="password"
								component="input"
								type="password"
							/>
						</div> */}

						<div className="form-group col-md-6">
							<button action="submit" className="btn btn-danger">
								Delete account
							</button>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	authenticated: state.auth.authenticated,
	error: state.auth.error,
});

Deleteaccount = connect(mapStateToProps, {
	deleteaccount,
})(Deleteaccount);

export default reduxForm({
	form: 'deleteaccount',
	// fields: ['email', 'password'],
	fields: [],
})(Deleteaccount);
