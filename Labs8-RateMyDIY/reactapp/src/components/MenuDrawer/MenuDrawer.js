import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
// import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemText from '@material-ui/core/ListItemText';
// import InboxIcon from '@material-ui/icons/MoveToInbox';
// import MailIcon from '@material-ui/icons/Mail';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';

import magnifier from '../../assets/images/magnifier.png';

const loginURL =
	(process.env.REACT_APP_BACKEND || `http://localhost:5000`) + `/signin`;

const logoutURL =
	(process.env.REACT_APP_BACKEND || `http://localhost:5000`) + `/signout`;

const styles = {
	list: {
		width: 250
	},
	fullList: {
		width: 'auto'
	},
	center: {
		display: 'flex',
		justifyContent: 'center'
	},
	profile: {
		width: '40px',
		height: '40px',
		borderRadius: '50%',
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		margin: 'auto'
	},
	arrow: {
		width: '20px',
		height: '20px'
	}
};

const ButtonContainer = styled.div`
	display: flex;
	justify-content: center;
`;

const ImgContainer = styled.div`
	width: 50px;
	height: 50px;
	border-radius: 50%;
	background-color: #fff;
	position: relative;
	margin-top: 8px;
`;

class MenuDrawer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			top: false
		};
	}

	toggleDrawer = (side, open) => () => {
		this.setState({
			[side]: open
		});
	};

	render() {
		const { classes } = this.props;
		let menuList;

		if (!this.props.userInfo.user_id) {
			menuList = (
				<div className={classes.fullList}>
					<List>
						<ListItem className={classes.center}>
							<a href={loginURL}>Signin</a>
						</ListItem>
					</List>
				</div>
			);
		} else {
			if (this.props.sidebar) {
				menuList = (
					<div className={classes.fullList}>
						<List>
							<ListItem className={classes.center}>
								<Link exact="true" to="/">
									Home
								</Link>
							</ListItem>
							<ListItem className={classes.center}>
								<Link to="/search">Search</Link>
							</ListItem>
							<ListItem className={classes.center}>
								<Link to="/ProjectList">My Projects</Link>
							</ListItem>
							<ListItem className={classes.center}>
								<Link to="/ReviewList">My Reviews</Link>
							</ListItem>
							<ListItem className={classes.center}>
								<Link to="/settings">Settings</Link>
							</ListItem>
							<ListItem className={classes.center}>
								<a href={logoutURL}>Signout</a>
							</ListItem>
						</List>
					</div>
				);
			} else {
				menuList = (
					<div className={classes.fullList}>
						<List>
							<ListItem className={classes.center}>
								<Link to={`/ProjectList`}>My Profile</Link>
							</ListItem>
							<ListItem className={classes.center}>
								<Link to={`/settings`}>Profile Settings</Link>
							</ListItem>
							<ListItem className={classes.center}>
								<Link to={`/newproject`}>New Project</Link>
							</ListItem>
							<ListItem className={classes.center}>
								<a href={logoutURL}>Signout</a>
							</ListItem>
						</List>
					</div>
				);
			}
		}

		return (
			<div>
				<ButtonContainer>
					<Button
						onClick={this.toggleDrawer('top', true)}
						style={styles.center}
					>
						{this.props.profile ? (
							<ImgContainer>
								<img
									src={this.props.userInfo.img_url}
									alt=""
									className={classes.profile}
								/>
							</ImgContainer>
						) : (
							<img src={magnifier} alt="" className={classes.arrow} />
						)}
					</Button>
				</ButtonContainer>
				<Drawer
					anchor="top"
					open={this.state.top}
					onClose={this.toggleDrawer('top', false)}
				>
					<div
						tabIndex={0}
						role="button"
						onClick={this.toggleDrawer('top', false)}
						onKeyDown={this.toggleDrawer('top', false)}
					>
						{menuList}
					</div>
				</Drawer>
			</div>
		);
	}
}

MenuDrawer.propTypes = {
	classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	userInfo: state.loggedInReducer.userInfo
});

export default compose(
	withStyles(styles),
	connect(mapStateToProps)
)(MenuDrawer);
