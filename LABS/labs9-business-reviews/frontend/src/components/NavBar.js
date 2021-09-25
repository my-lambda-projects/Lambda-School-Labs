import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { backendLink } from '../assets/config';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const NavBarStyles = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	height: 130px;
	background: #142e41;
	font-size: 1.25rem;
	.logo {
		height: 100px;
		width: 100px;
		margin-left: 50px;
		border-radius: 100px;
	}
	.nav_links {
		display: flex;
		justify-content: space-between;
		width: 50%;
		height: auto;
	}
	a,
	p {
		color: white;
		text-decoration: none;
		cursor: pointer;
	}
	.menu__user {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 15%;
		margin-right: 20px;
		.menu__user--profile--image {
			width: 50px;
			height: 50px;
			border-radius: 100px;
		}
	}

	@media (max-width: 900px) {
		flex-direction: column;
		height: auto;
		padding-top: 20px;
		background: white;
		.logo {
			width: 200px;
			height: 200px;
			margin: 0 auto;
		}
		.nav_links {
			text-align: center;
			flex-direction: column;
			justify-content: center;
			width: 100%;
			margin-top: 20px;
			a {
				width: 100%;
				border-bottom: 2px solid white;
				padding: 20px 0px;
				background: #142e41;

				:hover {
					background: white;
					color: #142e41;
				}
			}
		}
		.menu__user {
			box-sizing: border-box;
			width: 100%;
			flex-direction: row;
			text-align: center;
			justify-content: space-between;
			margin-right: 0;
			background: #142e41;
			.menu__user--profile--image {
				background: #142e41;
				width: 50px;
				height: 50px;
				border-radius: 0px;
				margin: 0;
				padding: 0;
			}
			.img--link {
				width: 50%;
				padding: 0;
				margin: 0;
			}
			p,
			.menu__user--text {
				box-sizing: border-box;
				background: #142e41;
				width: 50%;
				padding: 20px 0px;
				margin: 0;
				:hover {
					background: white;
					color: #142e41;
				}
			}
		}
	}
`;

class NavBar extends React.Component {
	state = { user: {}, loggedIn: false };
	handleLogout = async () => {
		const res = await axios.get(`${backendLink}/api/user/logout`, {
			withCredentials: 'include'
		});
		res.status === 200 ? this.setState({ loggedIn: false }) : console.log('Error Logging Out');
	};
	async componentDidMount() {
		const res = await axios.get(`${backendLink}/api/user/me`, {
			withCredentials: 'include'
		});
		if (!res.data.user) return this.setState({ loggedIn: false });
		const [ user ] = res.data.user;
		this.setState({ user, loggedIn: true });
	}
	render() {
		return (
			<NavBarStyles>
				<div className="logo_container">
					<a href="/">
						<img src={logo} alt="logo" className="logo" />
					</a>
				</div>
				<div className="nav_links">
					<a href="/#Businesses">businesses</a>
					<a href="/#Reviewers">reviewers</a>
					<a href="/billing">go pro ✔</a>
				</div>
				<div className="menu__user">
					{!this.state.loggedIn ? (
						<React.Fragment>
							<Link to="/login" className="menu__user--text">
								sign in
							</Link>
							<Link to="/register" className="menu__user--text">
								sign up
							</Link>
						</React.Fragment>
					) : (
						<React.Fragment>
							<Link to={`/user/${this.state.user.id}`} className="img--link">
								<img
									src={this.state.user.gravatar}
									alt="My Profile"
									className="menu__user--profile--image"
								/>
							</Link>

							<p onClick={this.handleLogout}>sign out</p>
						</React.Fragment>
					)}
				</div>
			</NavBarStyles>
		);
	}
}

export default NavBar;
