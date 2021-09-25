import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './pledge.css';

class Pledge extends Component {
	constructor() {
		super();
	}

	componentWillMount(){
		if (sessionStorage.getItem('loggedIn')) {
			this.props.history.push('voting');
		}
	}

	linkStyle = { textDecoration: 'none', color: '#234980', fontFamily: 'Open Sans',fontSize: '3.5rem', fontWeight: 700 }

	render() {
		return (
			<div className="pledgeContainer">
				<div className="pledgeCard">
					<p>PLEDGE</p>
					<div className="pledgeBox">
						<div className="pledgeButton">
							<Link style = { this.linkStyle } to={{ pathname: '/newuser', state: { userPledge: 10 }}}>
								<span className="dollar">10</span>
							</Link>
						</div>
						<div className="pledgeButton">
							<Link style = { this.linkStyle } to={{ pathname: '/newuser', state: { userPledge: 25 }}}>
								<span className="dollar">25</span>
							</Link>
						</div>
						<div className="pledgeButton">
							<Link style = { this.linkStyle } to={{ pathname: '/newuser', state: { userPledge: 50 }}}>
								<span className="dollar">50</span>
							</Link>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Pledge;