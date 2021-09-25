import React from 'react';
import { NavLink } from 'react-router-dom';

class SignupPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
        };
    }

    handleInput = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleSubmit = e => {
        // localStorage.setItem('username', this.state.username)
        // window.location.reload();
    }

    render() {
        return (
            <div className='landing-page'>
                <div className='signup-page'>
                    <div className="login-box">
                        <p className="title">House Cup Tracker</p>
                        <form onSubmit={this.handleSubmit} className="loginInput">
                            <input
                                type="text"
                                name="fullname"
                                placeholder="Full Name"
                                value={this.state.username}
                                onChange={this.handleInput}
                            />
                            <input
                                type="text"
                                name="email"
                                placeholder="Email"
                                value={this.state.username}
                                onChange={this.handleInput}
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={this.state.password}
                                onChange={this.handleInput}
                            />
                        </form>
                        <NavLink to='/signup'>
                            <button onClick={this.handleSubmit} className="button signup-button-2">Sign up</button>
                        </NavLink>
                        <div className='or-container'>
                            <div className='line'></div>
                            <p id='or'> OR </p>
                            <div className='line'></div>
                        </div>
                        <button className="button google-button">Login with Google</button>
                        <button className="button facebook-button">Login with Facebook</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default SignupPage;