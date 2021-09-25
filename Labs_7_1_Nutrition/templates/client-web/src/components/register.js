import React from 'react';
import { Form, Input, Button, Card, Affix } from 'antd';

import axios from 'axios';
const FormItem = Form.Item;

class Login extends React.Component {
    constructor(props) {
				super(props);
				this.state = {
					username: '',
					password: '',
					confirmPassword: '',
					email: '',
					message: 'All fields are required.',
				};
				this.handleChange = this.handleChange.bind(this);
				//this.handleNewUser = this.handleNewUser.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);       
			}

		handleChange(e) {
			this.setState({
					[e.target.name]: e.target.value,
			});
		}

    handleFormSubmit = (event) => {
				event.preventDefault();
				const {
					username,
					password,
					confirmPassword,
					email,
				} = this.state;
				console.log("username:", username);
			console.log("password:", password);
			console.log("confirmPassword:",confirmPassword );
			if(password !== confirmPassword)
			 {
				this.setState({
					message:" Password mismatch"
			   });
					return;
				}
					this.setState({
						username,
						password,
						confirmPassword,
						email,
					});
					localStorage.setItem('username', this.state.username);
					//this.props.history.push('/recipe'); // this line will be there till axios not post to backend.
        	axios.post('http://127.0.0.1:8000/auth/register/', {
            			username,
						password,
						email,
					})
        	.then((res) => {
					console.log("success", res.data);
					//send this username and jwt to check in db then store into local storage
					localStorage.setItem('username',username);
					localStorage.setItem('token', res.data.jwt);
					
					//localStorage.setItem('username', res.data.newUser.name);
					console.log("after successful axios call", {status: res.status});
					this.props.history.push('/recipe');
				})
        	.catch(err => {
					
					console.log("there was an error", err, err.response);
					console.log("No data returned from backend.that is the above error");
					this.setState({
						
						// message: err.response.data.message
				   });
				}
    	)
    }

    render() {
        return (
            <div style={{ background: '#ECECEC', padding: '30px' }}>
				<div style={{ color: '#990000', padding: '30px', fontSize: '30px' }}>{this.state.message}</div>	
				<Card title="Register " bordered={false} style={{ width: 350}}>
                <Form onSubmit={(event) => this.handleFormSubmit(event)}>
                    <FormItem label="Username : ">
												<Input 
													name="username" 
													placeholder="Username..."
													onChange={this.handleChange}/>
                    </FormItem>
					<FormItem label="Password : ">
							<Input 
								name="password" 
								placeholder="Mix of 8 chars, numbers and symbols..." 
								onChange={this.handleChange}/>
                    </FormItem>
                    <FormItem label="Confirm Password : ">
						<Input 
							name="confirmPassword" 
							placeholder="Same as above..." 
							onChange={this.handleChange}/>
                    </FormItem>
					<FormItem label="Email : ">
						<Input 
							name="email" 
							placeholder="Type in valid email..." 
							onChange={this.handleChange}/>
                    </FormItem>
                    <FormItem>
						<Button 
							type="primary" 
							htmlType="submit" 
							//onClick={this.handleNewUser}
							> 
							Sign Up
							</Button>
                    </FormItem>
                </Form>
				</Card>
            </div>
        )
    }
}
export default Login;