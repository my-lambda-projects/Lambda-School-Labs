import React from 'react'
import { withAlert } from 'react-alert'
import {connect} from 'react-redux';
import {reset} from '../../store/actions/authActions.js';


class ErrorAlert extends React.Component {
	constructor(){
		super();
		this.state = {
			alert: alert
		};
	}

	componentDidMount(){
		this.props.alert.show(this.props.error)
		this.props.reset()
	}

	render() {
		return (
			<div></div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		error: state.auth.authError
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		reset: () => dispatch(reset())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withAlert()(ErrorAlert));