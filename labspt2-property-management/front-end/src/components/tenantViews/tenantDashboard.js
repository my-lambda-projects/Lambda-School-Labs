import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { Elements, StripeProvider } from 'react-stripe-elements';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import CardHeader from '@material-ui/core/CardHeader';
import Paper from '@material-ui/core/Paper';
import Workordercard from '../WorkOrders/workorderCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faMapMarkerAlt,
	faIdCardAlt,
	faEnvelope,
	faPhone,
	faMoneyBillAlt,
	faTools
} from '@fortawesome/free-solid-svg-icons';
import '../../assets/css/general.css';
import Grid from '@material-ui/core/Grid';
const decode = require('jwt-decode');
const axios = require('axios');

const alertURL = `https://tenantly-back.herokuapp.com/alerts`;
// const url = `http://localhost:9000/alerts`;
const stripeURL = 'https://tenantly-back.herokuapp.com/stripe/charges';
const url = 'https://tenantly-back.herokuapp.com/workorders/';

const styles = {
	card: {
		minWidth: 275
	},
	bullet: {
		display: 'inline-block',
		margin: '0 2px',
		transform: 'scale(0.8)'
	},
	title: {
		fontSize: 14
	},
	pos: {
		marginBottom: 12
	},
	root: {
		width: '100%',
		maxWidth: 360
	}
};

class tenantDashboard extends Component {
	state = {
		houseId: 1,
		residenceOwner: null,
		alerts: [],
		address: '',
		contact: '',
		maintenancePhone: '',
		charges: [],
		cost: '',
		payments: [],
		total: '',
		user: '',
		workorders: [],
		balance: ''
	};

	componentDidMount() {
		this.fetchData();
		const token = localStorage.getItem('jwtToken');
		const id = decode(token).id;
		axios
			.get(`https://tenantly-back.herokuapp.com/workorders/tenant/${id}`)
			.then(
				(response) =>
					this.setState({
						workorders: response.data,
						balance: this.state.cost / 100 - this.state.payments.reduce(this.getSum) / 100
					}),
				console.log('yooooo', this.state.balance)
			)
			.catch((error) => {
				console.error('Server Error', error);
			});
	}

	componentDidUpdate() {
		console.log('Did update');
		this.fetchData();
	}

	fetchData() {
		// Stripe Data
		axios
			.get(stripeURL)
			.then((response) => {
				if (this.state.charges.length !== response.data.length) {
					this.setState({ charges: response.data });
				}
			})
			.catch((error) => {
				console.error('Server Error', error);
			});
		const token = localStorage.getItem('jwtToken');
		const id = decode(token).id;
		console.log(id);
		// go into users to find which residence you live at
		axios
			//.get(`https://tenantly-back.herokuapp.com/users/${id}`)
			.get(`https://tenantly-back.herokuapp.com/tenants/${id}`)
			.then((user) => {
				// console.log(user);
				if (
					this.state.houseId !== user.data.property_id ||
					this.state.user !== user.data.firstName ||
					this.state.cost !== user.data.cost
				) {
					this.setState({ houseId: user.data.property_id, user: user.data.firstName, cost: user.data.cost });
					// console.log(this.state.houseId);
				}
			})
			// go into users residence, grab some information and set it to state, grab owner of residence to supply rest of information
			.then(
				axios
					.get(`https://tenantly-back.herokuapp.com/properties/${this.state.houseId}`)
					.then((res) => {
						let property = res.data;
						// console.log(this.state.residenceOwner === property.owner, this.state.address === property.address);
						if (this.state.residenceOwner !== property.owner || this.state.address !== property.address) {
							this.setState({ residenceOwner: property.owner, address: property.address });
						}
					})
					// 		// find the owner of logged in users residence to supply contact info for owner
					.then(
						axios.get(`https://tenantly-back.herokuapp.com/tenants/${this.state.residenceOwner}`).then((res) => {
							let owner = res.data;
							// console.log(this.state.contact === owner.phone, this.state.contactEmail === owner.email);
							if (this.state.contact !== owner.phone || this.state.contactEmail !== owner.email) {
								this.setState({ contact: owner.phone, contactEmail: owner.email });
							}
						})
					)
			)
			.then(
				// go into alerts and grab each alerts where the houseId matches logged in users residence, set to state
				axios.get(alertURL).then((res) => {
					let alertsObj = res.data.filter((alert) => alert.property_id === this.state.houseId);
					// console.log(alertsObj.length === this.state.alerts.length);
					if (alertsObj.length !== this.state.alerts.length) {
						this.setState({ alerts: alertsObj });
					}
				})
			);
	}

	convertToTime = (e) => {
		const d = new Date(e * 1000);
		return d.toLocaleString();
	};

	getSum = (total, num) => {
		return total + num;
	};

	render() {
		var today = new Date();
		var priorDate = new Date().setDate(today.getDate() - 30);
		priorDate = priorDate.toString();
		// console.log('Original data: ', priorDate);
		priorDate = priorDate.slice(0, -3);
		priorDate = parseInt(priorDate);
		// console.log('After truncate: ', priorDate)

		return (
			<div className="tenant-dash">
				<Grid item sm={12} className="tenant-button">
					{/* This pulls the stripe info and the Outstanding payments for the user based on payments made in the last 30 days. */}
					<StripeProvider apiKey="pk_test_uGZWgKZiorkYlZ8MsxYEIrA2">
						<Paper elevation={1} className="paperBorder">
							<div className="outstanding"> Outstanding Balance</div>
							<div className="currentOutstanding">
								{this.state.charges.map((charge) => (
									<div>
										{priorDate < charge.created &&
										this.state.user === charge.billing_details.name && (
											<p>
												<p className="hidden">{this.state.payments.push(charge.amount)}</p>
												{/* Prior date is {priorDate} charge made  {charge.created}. */}
												{/* Current user {this.state.user} charge made to {charge.billing_details.name}. */}
												<div className="outstanding"> Outstanding Balance</div>
												{/* <div className="outstandingBalance">${this.state.balance}</div> */}
												
												<div className="outstandingBalance">
													${this.state.cost / 100 - this.state.payments.reduce(this.getSum) / 100}
												</div>
												{/* {console.log(this.state.payments)} */}
											</p>
										)}
									</div>
								))}
							</div>
						</Paper>
					</StripeProvider>

					<Card>
						<Link to="/payments">
							<Button variant="extended" color="default" className="dash-button">
								<FontAwesomeIcon icon={faMoneyBillAlt} />&nbsp;&nbsp;Make a Payment
							</Button>
						</Link>
					</Card>
					<Card>
						<Link to="/maintenance">
							<Button variant="extended" color="default" className="dash-button">
								<FontAwesomeIcon icon={faTools} />&nbsp;&nbsp;Submit a Workorder
							</Button>
						</Link>
					</Card>
				</Grid>
				<Grid item sm={12}>
					<List>
						<ListItem>
							<Avatar>
								<FontAwesomeIcon icon={faMapMarkerAlt} />
							</Avatar>
							<div className="dash-info">Address: {this.state.address}</div>
						</ListItem>

						<ListItem>
							<Avatar>
								<FontAwesomeIcon icon={faIdCardAlt} />
							</Avatar>
							<div className="dash-info">Contact Info: {this.state.contact}</div>
						</ListItem>

						<ListItem>
							<Avatar>
								<FontAwesomeIcon icon={faEnvelope} />
							</Avatar>
							<div className="dash-info">Contact Email: {this.state.contactEmail}</div>
						</ListItem>

						<ListItem>
							<Avatar>
								<FontAwesomeIcon icon={faPhone} />
							</Avatar>
							<div className="dash-info">24/7 Phone: {this.state.maintenancePhone}</div>
						</ListItem>
					</List>
				</Grid>
			</div>
		);
	}
}

tenantDashboard.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(tenantDashboard);
