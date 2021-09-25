import React, { Component } from 'react';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
// import red from '@material-ui/core/colors/red';
import Divider from '@material-ui/core/Divider';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemText from '@material-ui/core/ListItemText';
import Modal from '@material-ui/core/Modal';
// import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import './workorders.css';
import { create } from 'jss';
import { FormLabel } from '@material-ui/core';
//import { CardContent } from '@material-ui/core';
//import { withStyles } from '@material-ui/core/styles';

// const url = process.env.workOrderCard || `http://localhost:9000/workorders/${this.state.id}`;
// const url = `https://tenantly-back.herokuapp.com/${this.state.id}`;

function rand() {
	return Math.round(Math.random() * 20) - 10;
  }
  
  function getModalStyle() {
	const top = 25;
	const left = 25;
  
	return {
	  justifyContent:'center',
	  alignItems: 'center',
	  top: `${top}%`,
	  left: `${left}%`,
	  transform: `translate(-${top}%, -${left}%)`,
	};
  }

const styles = theme =>({
	card:{
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-around',
		fontWeight: 'bold',
		maxWidth: '100%',
		alignItems: 'center',
	},


	radiogroup: {
		flexDirection: 'row',
		margin: `${theme.spacing.unit}px 0`,
		fontSize: '2rem'
		
	},
	radiobuttons: {
		display: 'flex',
		flexDirection: 'row',
		fontSize: '3rem',
	},
	image: {
		alignSelf: 'center',
		verticalAlign: 'middle',
		height: '75%',
		width: '75%',
		//padding:'56.25%',

	},
	button:{
		marginBottom: '2%',
	},
	typography:{
		margin: '2% 0 2% 0',
		fontSize: '2.25rem'
	},
	formlabel:{
		fontSize: '2rem'
	}
})

class Workordercard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: props.work.id,
			property: props.work.property_id,
			tenant: props.work.tenant_id,
			description: props.work.description,
			phone: props.work.phone,
			unsupervisedEntry: props.work.entry,
			status: props.work.status,
			open: false,
			button: true,
			tenantname:'',
			
		};
	}

	//Radio Button Status

	inputs = [ 'Pending', 'In Progress', 'Completed' ];

	//Updates the status of the radio button and sends a put request to the database to reflect the change in work order status
	statushandler = (e) => {
		this.setState({
			status: e.target.value
		});

		let updatedworkorder = {
			property_id: this.state.property,
			tenant_id: this.state.tenant,
			landlord_id:'',
			description: this.state.description,
			phone: this.state.phone,
			entry: this.state.entry,
			status: e.target.value
		};

		axios
			.put(`https://tenantly-back.herokuapp.com/workorders/${this.state.id}`, updatedworkorder)
			.then((response) => {
				console.log('success');
			})
			.catch((error) => {
				console.log(error);
			});
	};

	

	componentDidMount() {
		this.tenantname()
		this.buttonhandler()
	}

	buttonhandler = () => {
		const exists=this.props.work.image==='none'? true : false;
		this.setState({button: exists})
	}

	tenantname = () => {
		axios
      .get(`https://tenantly-back.herokuapp.com/tenants/${this.state.tenant}`)
			.then((response) => {
				let tenantworkorder = response.data
				this.setState({
					tenantname: tenantworkorder.firstName
				})
			})
	}


	handleOpen = () => {
		this.setState({ open: true });
	  };
	
	handleClose = () => {
		this.setState({ open: false });
	  };

	render() {
		const { classes } = this.props;
		return (
			<Card className={classes.card} raised={true}>
			
				<Modal  style={getModalStyle()}  open={this.state.open}
						  onClose={this.handleClose}
				>
				<CardMedia className={classes.image} image={this.props.work.image} />
				</Modal>
				
				
				
				<CardContent>
				<Typography className={classes.typography} variant="title">
						{this.props.work.description}
						
				</Typography>

				<Typography className={classes.typography}variant="h1">
						Name: {this.state.tenantname}
				</Typography>
				

				
				<Typography className={classes.typography} variant="h1">
						Phone Number: {this.props.work.phone}
				</Typography>

				

				<Typography className={classes.typography} variant="h1">
					{`Unsupervised Entry is ${this.props.work.entry ? 'Allowed' : 'Not Allowed'}`} 
					</Typography>	
					
					
					
					
					{/* Radio button form */}
					<FormControl>
					<FormLabel className={classes.formlabel}>Work Status</FormLabel>
					<RadioGroup name="workstatus" area-label="Work Status" value={this.state.status}  onChange={this.statushandler} className={classes.radiogroup} row>
					
					<div className={classes.radiobuttons}>
					{this.inputs.map((values, i) => (
						
						<div key={i}>
							<FormControlLabel  className={classes.radiobuttons}  value={values} control={<Radio  checked={this.state.status === values}/>} label={values}/>
							

							
						</div>
						
					))}
					</div>
					</RadioGroup>
					</FormControl>
					
					</CardContent>
					<Button className={classes.button} disabled={this.state.button} variant="contained" color="secondary" onClick={this.handleOpen}>Show Image</Button>
			</Card>
		);
	}
}
export default withStyles(styles)(Workordercard);