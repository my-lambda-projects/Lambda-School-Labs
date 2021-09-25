import React, { Component } from 'react';
import CheckoutForm from './checkoutForm';
import {Elements, StripeProvider} from 'react-stripe-elements';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import './../WorkOrders/workorders.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
const decode = require('jwt-decode');

const url = 'https://tenantly-back.herokuapp.com/stripe/charges'
// const url = 'https://tenantly-back.herokuapp.com/stripe/charges';

export default class tenantPayments extends Component {
	constructor(props) {
    super(props);
    this.state = {
      charges: []
    };
    
	}

	componentDidMount() {
		axios.get(url).then((response) => this.setState({ charges: response.data })).catch((error) => {
			console.error('Server Error', error);
		});
		const token = localStorage.getItem('jwtToken');
		const id = decode(token).id;
		axios
			.get(`https://tenantly-back.herokuapp.com/tenants/${id}`)
			.then((user) => {
				this.setState({ user: user.data.firstName });
				this.setState({ userLast: user.data.lastName });
			})
	}
	

	updatestate =() => {
		axios.get(url).then((response) => this.setState({ charges: response.data })).catch((error) => {
			console.error('Server Error', error);
		});
	}

	convertToTime =(e) =>{
		const d = new Date(e * 1000)
		return d.toLocaleString();
}

	
	
	
	render(){
		const fonts = [{ cssSrc: "https://fonts.googleapis.com/css?family=Podkova:400" }]
		return (
		  <StripeProvider apiKey="pk_test_uGZWgKZiorkYlZ8MsxYEIrA2">
		<div className='payment-container'>
			<Grid container spacing={24} className='flex-cards' >
			<Grid item sm={6} xs={12} >
			<Card className = 'form-card'>
			  <h1>Make a Payment</h1>
			  <Elements className='name-card' fonts={fonts}>
				<CheckoutForm  charge={this.updatestate} />
				
			  </Elements>
			</Card>
			</Grid>
			<Grid item sm={6} xs={12} >

			<Card>
						
					<Paper elevation={1} className="payment-history">
						{this.state.charges.map((charge) => 
						<div>
							{this.state.user === charge.billing_details.name &&
						<div>		
												
						<CardHeader className="card-header" variant='h1' title={charge.billing_details.name} />
						
						<div className='flex-component'>
				
						<div>
						<Typography className="payments" variant='h4' component='h2'>Amount Paid: ${charge.amount / 100}.00</Typography>
						<Typography className="payments" variant='h4'>Date: {this.convertToTime(charge.created)}</Typography>
						
						</div>
		
						<FontAwesomeIcon icon={faCheckCircle} color="forestgreen" size="x" />
						
						</div>
											
						</div>	
							}
							</div>					
						)}
					</Paper>
					
				</Card>				
			</Grid>


			</Grid>
			</div>	
		  </StripeProvider>
		);
	  }
	}