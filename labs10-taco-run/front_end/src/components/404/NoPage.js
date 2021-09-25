import React from 'react';
//import axios from 'axios';
import './css/font-awesome.min.css'
import './css/style.css'
import { Link } from 'react-router-dom';
import './custom.css';

class NoPage extends React.Component {
	constructor(props){
		super(props);
		this.state = {};
	}

	componentDidMount(){}

	restart = () => {
		this.props.history.push("/events")
		window.location.reload();
	}

	render() {
		return (
			<div id="notfound">
				<div class="notfound-bg"></div>
				<div class="notfound">
					<div class="notfound-404">
						<h1>404</h1>
					</div>
					<h2>Oops! Page Not Found</h2>
					<div class="notfound-social">
						<a href="#"><i class="fa fa-facebook"></i></a>
						<a href="#"><i class="fa fa-twitter"></i></a>
						<a href="#"><i class="fa fa-pinterest"></i></a>
						<a href="#"><i class="fa fa-google-plus"></i></a>
					</div>
					<div className="goBack" onClick={this.restart}>Back To Events</div>
				</div>
			</div>
		)
	}
}

export default NoPage;
// This templates was made by Colorlib (https://colorlib.com)