import React from 'react';
import { Form, Input, Button, Card } from 'antd';


import axios from 'axios';
const FormItem = Form.Item;

class Login extends React.Component {
    constructor(props) {
				super(props);
				this.state = {
					username: '',
					password: '',
					message: 'Registered users can sign in here.',
				};
				this.handleChange = this.handleChange.bind(this);
				this.handleLogin = this.handleLogin.bind(this);
        //this.handleConflictSubmit = this.handleConflictSubmit.bind(this);        
		}
		handleChange(e) {
			this.setState({
					[e.target.name]: e.target.value,
			});
	}
    handleLogin = (event) => {
				event.preventDefault();
				if (!this.state.username || !this.state.password) {
					this.setState({
						error: true,
						message: 'Please provide registered username and password',
					});
				} else {
					const {
						username,
						password,
					} = this.state;
	
					console.log("Username, password state: ",this.state);
					
					console.log("Username at local storage: ",localStorage.getItem(username));
					axios.post(`http://127.0.0.1:8000/auth/login/`, {
							username,
							password,
						})
					.then((res) => {
						console.log("Username at local storage in success: ",localStorage.getItem(username));
						console.log("success", res);
						localStorage.setItem('token', res.data.jwt);
						localStorage.setItem('username', this.state.username);
						console.log("just username:", res.data.username);
						console.log("after successful axios call", {status: res.status});
						this.setState({
							error: false,
						});
						if(username) {
							this.props.history.push('/recipe');
						}
						
					})
					.catch(err => {
						console.log("Username at local storage in error: ",localStorage.getItem(username));
						this.setState({
							message: err.response.data.message,
					   });
						// ("You need to register befoalertre you Sign in");
						console.log("there was an error", err);
						this.setState({
							password: '',
						});
					}
				)
				}
				
        // this.Auth.login(this.state.username, this.state.password)
        // .then(res => {
        //     this.props.history.replace('/');
        // })
        // .catch(err => {
        //     alert(err);
        // })
	}
    render() {
        return (
			
            <div style={{ background: '#ECECEC', padding: '30px' }}>
				<div style={{ color: '#990000', padding: '30px', fontSize: '30px' }}>{this.state.message}</div>
                <Card title="Login" bordered={false} style={{ width: 350}}>
                <Form onSubmit={(event) => this.handleLogin(event)}>
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
                    <FormItem>
						<Button 
							type="primary" 
							htmlType="submit" 
							> 
							Sign In
						</Button>
                    </FormItem>
                </Form>
				</Card>
            </div>
        )
    }
}
export default Login;