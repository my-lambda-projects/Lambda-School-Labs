import React, { Component } from "react";
import "./../../assets/css/dashboardComp.css";
import "./../../assets/css/general.css";
import axios from "axios";
import Image from "../../assets/images/blue-on-dark.png";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import FormHelperText from "@material-ui/core/FormHelperText";
import InputLabel from "@material-ui/core/InputLabel";
import { withStyles, withTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import "../../assets/css/general.css";
import { Button } from "@material-ui/core";
import {Elements, StripeProvider} from 'react-stripe-elements';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import './../WorkOrders/workorders.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faSt } from '@fortawesome/free-solid-svg-icons';
const decode = require('jwt-decode');
// const url = process.env.properties || 'http://localhost:9000/properties';
const url = `https://tenantly-back.herokuapp.com/properties`;
const url2 = `https://tenantly-back.herokuapp.com/billing`;
const url3 = 'https://tenantly-back.herokuapp.com/stripe/charges'



const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
  root: {
    margin: "0 auto",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    backgroundColor: "black",
    fontSize: "2em",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      justifyContent: "center"
    }
  },

  button: {
    width: "100%"
  }
});

class Billing extends Component {
  state = {
    properties: [],
    billing: [],
    propertySelected: [],
    charges: [],
    selected:''
  };

  handleInputChange = prop => event => {
    this.setState({ [prop]: event.target.value })
    this.setState({ selected: event.target.value })
  };

  

  setBilling = () => {
    axios
      .get(url2)
      .then(response =>
        this.setState({ billing: response.data }, function() {
          console.log(this.state.billing);
        })
      )
      .catch(err => {
        console.error("Server Error", err);
      });
  };

  componentDidMount() {
    axios
      .get(url)
      .then(response =>
        this.setState({ properties: response.data }, function() {
          
          this.setBilling();
        })
      )
      .catch(err => {
        console.error("Server Error", err);
      });

      axios.get(url3).then((response) => this.setState({ charges: response.data })).catch((error) => {
        console.error('Server Error', error);
      });
      const token = localStorage.getItem('jwtToken');
      const id = decode(token).id;
      axios
        .get(`https://tenantly-back.herokuapp.com/landlord/${id}`)
        .then((user) => {
          this.setState({ user: user.data.firstName });
          this.setState({ userLast: user.data.lastName });
        })
  }

 

  updatestate =() => {
		axios.get(url3).then((response) => this.setState({ charges: response.data })).catch((error) => {
			console.error('Server Error', error);
		});
	}

	convertToTime =(e) =>{
		const d = new Date(e * 1000)
		return d.toLocaleString();
}


  fetchProperty = (id) => {
  	axios
  		.get(`https://tenantly-back.herokuapp.com/properties/${id}`)
  		.then((response) => {
  			this.setState({ property2: response.data });
  		})
  		.catch((error) => {
  			console.error(error);
  		});
  };

  clickFunction() {
  	console.log(document.getElementById('property-native-required').selectedIndex)
  }

  handleChange(value) {this.setState({ selected: value });}

  


  render() {
  const { classes } = this.props;
  
    return (
<div className="billing">
<div className="billingColumn1">
					<Card className="billing-card1">
						<FormControl className='Dropdown'>
						<Typography className='Input-header'>
							Select a Property to View Payment History
						</Typography>
						<Select
              native
              className='DropdownItem'
							value={this.state.property}
							onChange={this.handleInputChange(this.value)}
							name="Property"
							inputProps={{
							id: 'property-native-required',
							}}
						>
							<option value={0} />
							{this.state.properties.map((property, index) => (
							<option className='DropdownItem' key={index} value={property.name} >
								{property.name}
							</option>
							))}
						</Select>
						<FormHelperText>{this.state.selected}</FormHelperText>
						</FormControl>
            </Card>
            
          <Card className="billing-card2">      
            <a href="https://connect.stripe.com/oauth/authorize?response_type=code&client_id=ca_Eh0R1RXhYNXEq9z56aVKr04CVDrJvxMc&scope=read_write">
            <Button variant="contained" className={classes.button}>
              <FontAwesomeIcon icon={faCheckCircle} color="white" size="2x" /> Connect Stripe
            </Button>
            </a>
				  </Card>
       
			</div>
            <div className="billingColumn2">
            <StripeProvider apiKey="pk_test_uGZWgKZiorkYlZ8MsxYEIrA2">
            <div className='payment-container'>
              

              <Card>
                    
                  <Paper elevation={1} className="payment-history">
                  <Typography variant="h4" component="h2">
                    Rent History
                  </Typography>
                    {this.state.charges.map((charge) => 
                    <div>
                      {this.state.selected == charge.description &&
                    <div>							
                    <CardHeader className="card-header" variant='h1' title={charge.billing_details.name} />
                    <Divider/>
                    <div className='flex-component'>
                
                    <div>
                    <Typography className="payments" variant='h4' component='h2'>Amount Paid: ${charge.amount / 100}.00</Typography>
                    <Typography className="payments" variant='h4'>Date: {this.convertToTime(charge.created)}</Typography>
                    </div>

                    <FontAwesomeIcon icon={faCheckCircle} color="forestgreen" size="1x" />
                    </div>
                              
                    </div>	
                      }
                      </div>					
                    )}
                  </Paper>
                  
                </Card>				

              </div>	
              </StripeProvider>
              </div>
      </div>  
    );
  }
}

export default withStyles(styles)(Billing);
