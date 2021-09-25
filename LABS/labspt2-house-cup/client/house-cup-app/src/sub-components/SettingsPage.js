import React, { Component } from 'react';
import DisplayBox from './Styles/Display';
import Button from './Styles/Display';
import SideMenu from './SideMenu';
import auth from '../utils/Auth';
import axios from 'axios';

class SettingsPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			newPassword: '',
			message: '',
			showBox: false
		};
	}

	componentDidMount() {
      this.setState({message:''})
	}

	updateUser = (newPassword) => {
		const { getAccessToken } = auth;
		console.log(`New password`, newPassword);
		const headers = { Authorization: `Bearer ${getAccessToken()}` };
		axios.patch('http://localhost:5000/users/update', newPassword, { headers })
			.then(res => {
				console.log(`settings line 30`, res.data.msg);
				this.setState({
					 message:res.data.msg
				})
			})
			.catch(err => {
				console.log(`Line 29 settingspage error`, err);
				this.setState({
					 message: (<ul><li className="error">Enter a valid password:</li>
					               <li>At least 8 characters length</li>
					               <li>Lower case letters(A-Z)</li>
												 <li>Upper case letters(a-z)</li>
			                   <li>Numbers(0-9)</li>
												 <li>Special characters(!@#$%^&*)</li></ul>)
				})
			});
	};

	handleInput = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handleSubmit = (event) => {
		event.preventDefault();
		const updatedUser = { password: this.state.newPassword }
		this.updateUser(updatedUser)
		this.setState({
			email: '',
			password: '',
			newPassword: ''
		});
	}

	toggleBox = () => {
	  setTimeout( ()=>{		
	    	this.setState({showBox: !this.state.showBox});		
		},1400)
	
 }

hideDisplay = () => {
	 this.setState({
			 showBox: false,
			 message:''
	 })
}
 
	render() {
		return (
			<div className="settings-page">
				<SideMenu />
				<div className="settings">
					<div>
						<h2 className="settings-title">Update Your Info</h2>
					</div>
					<form className="settings-input-container" onSubmit={this.handleSubmit}>
						<input name="email"
							type="email"
							className="Input"
							placeholder="Your email"
							value={this.state.email}
							onChange={this.handleInput} required />
						<input name="password"
							type="password"
							className="Input"
							placeholder="Old Password"
							value={this.state.password}
							onChange={this.handleInput} required />
						<input name="newPassword"
							type="password"
							className="Input"
							placeholder="New Password"
							value={this.state.newPassword}
							onChange={this.handleInput} required />
						<button className="save-button" 
						        type="submit" 
										value="Save"
										onClick={this.toggleBox}>Save</button>
					</form>
					<DisplayBox  style={{display: (this.state.showBox && this.state.message) ? 'flex' : 'none' }}> 					          										    
									    	 <div className="para"><strong>Password Update Details&#58;</strong></div> 
												 <div className="para">{this.state.message}</div>  										    
										<div className="content">                                                     
                         <Button className='no-button' onClick={this.hideDisplay}>OK</Button> 
										</div>                   
          </DisplayBox> 
				</div>
			</div>
		);
	}
}

export default SettingsPage;