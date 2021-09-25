import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';
import Button from '@material-ui/core/Button';
// import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import axios from 'axios';
import Switch from 'react-input-switch';
// import Typography from '@material-ui/core/Typography';
import 'typeface-roboto';
import './../WorkOrders/workorders.css';

const decode = require('jwt-decode');


const url = 'https://tenantly-back.herokuapp.com/stripe/charge' 

const styles ={
  button:
  {
  alignSelf: 'center', 
  width: '25%'},
  
}

class CheckoutForm extends Component {
  constructor(props) {
     super(props)
    this.state = {
      complete: false,
      name: "",
      cost: '',
      altCost: '',
      value: 0,
    };
    this.submit = this.submit.bind(this);
  }

  successPayment = () => {
		alert('Payment Successful');
	};

	errorPayment = (data) => {
		alert('Payment Error');
		console.log(data);
	};
  
  inputHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  
  componentDidMount() {
    const token = localStorage.getItem('jwtToken');
		const id = decode(token).id;
    axios
    // ****Please change to public url when deploying
      // .get(`https://tenantly-back.herokuapp.com/users/${id}`)
      .get(`https://tenantly-back.herokuapp.com/tenants/${id}`)
			.then((user) => {
				console.log(user);
        this.setState({ name: user.data.firstName});
        this.setState({ cost: user.data.cost});
        this.setState({ property: user.data.property_id});

			})
  }
  
  async submit(ev) {
    ev.preventDefault();
    if (this.state.altCost){
    let {token} = await this.props.stripe.createToken({name: this.state.name});
    axios
    .post(url, {
      description: this.state.property,
      source: token.id,
      currency: 'USD',
      amount: this.state.altCost * 100
      
    })
    .then(this.props.charge)
    .then(this.successPayment) 
    .catch(this.errorPayment);
    this.setState({ altCost: ''});
  } 
  else {
    let {token} = await this.props.stripe.createToken({name: this.state.name});
    axios
    .post(url, {
      description: this.state.property,
      source: token.id,
      currency: 'USD',
      amount: this.state.cost * 100
      
    })
    .then(this.props.charge)
    .then(this.successPayment) 
    .catch(this.errorPayment);
    this.setState({ altCost: ''});
  } }

  


  render() {
    console.log(this.state.altCost)
    if (this.state.complete) return <h1>Purchase Complete</h1>;

    if (this.state.value === 0) return (
    
      <div className="checkoutform">
        <div className="slider">
         <Switch value={this.state.value} onChange={value => this.setState({ value })} /><p>Pay in Installments</p>
        </div>
        <Input placeholder="name" name="name" value={this.state.name}  className='checkoutinput'/>
        <CardElement className='checkout-line' style={{base: {fontSize: '18px'}}} />
        <Button variant='contained' color='primary' className='button' onClick={this.submit}>Pay Full Amount (${this.state.cost/100})</Button>
      </div>
      
    );

    
  
    if (this.state.value === 1) return (
      <div className="checkoutform">
        <div className="slider">
          <Switch value={this.state.value} onChange={value => this.setState({ value })} /><p>Pay Full</p>
        </div>
        <Input placeholder="name" name="name" value={this.state.name}  className='checkoutinput'/>
        <Input placeholder="INSTALLMENT AMOUNT" name="altCost" value={this.state.altCost} onChange={this.inputHandler} className='checkoutinput'/>
        <CardElement style={{base: {fontSize: '18px'}}} />
        <Button variant='contained' color='primary' className='button' onClick={this.submit}>Pay ${this.state.altCost} today!</Button>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);