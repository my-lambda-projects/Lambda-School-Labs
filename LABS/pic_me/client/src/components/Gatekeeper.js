import React, { Component } from 'react';
import { connect } from 'react-redux';

import { authenticateUser, resetAuthAttempted } from '../actions';

export default ComposedComponent => {
	class CheckAuthentication extends Component {
		componentDidMount() {
			if (!this.props.authenticated) {
				this.setState({ message: `checking login` });
				this.props.authenticateUser(this.props.history);
				// this.props.history.push('/login');
			}
		}

		componentWillReceiveProps(nextProps) {
			if (nextProps.attempted && !nextProps.authenticated) {
				// setTimeout(_ => {
				this.props.resetAuthAttempted();
				this.props.history.push('/mobil');
				// }, 2000);
			}
		}

		state = {
			message: '',
		};

		render() {
			return (
				<div className="CheckAuthentication">
					{this.props.user ? (
						<ComposedComponent history={this.props.history} />
					) : (
						<h2 style={{ textAlign: 'center' }}>{this.state.message}</h2>
					)}
				</div>
			);
		}
	}

	const mapStateToProps = state => {
		return {
			user: state.auth.user,
			authenticated: state.auth.authenticated,
			// error: state.auth.error,
			attempted: state.auth.attempted,
		};
	};

	return connect(mapStateToProps, { authenticateUser, resetAuthAttempted })(
		CheckAuthentication,
	);
};
