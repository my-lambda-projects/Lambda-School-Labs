import React from 'react';
//import axios from 'axios';

import { Redirect } from 'react-router'

class Redirected extends React.Component {
	constructor(props){
		super(props);
		this.state = {};
	}

	componentDidMount(){
		
	}

	render() {
		return (
			<Redirect to="/events_create"/>
		)
	}
}

export default Redirected;
