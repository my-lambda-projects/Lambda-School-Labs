import React from 'react';
// import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';

import styled from 'styled-components';

// Assets
import arrowDown from '../../../assets/images/arrow-down.png';

const Signout = styled.a`
	color: rgba(0, 0, 0, 0.87);

	&:hover {
		color: #e60000;
		text-decoration: none;
	}
`;

const MenuLink = styled(Link)`
	color: rgba(0, 0, 0, 0.87);

	&:hover {
		color: #0073e6;
		text-decoration: none;
	}
`;

const logoutURL =
	(process.env.REACT_APP_BACKEND || `http://localhost:5000`) + `/signout`;

const styles = theme => ({
	root: {
		display: 'flex'
	},
	profilepic: {
		width: '40px',
		height: '40px',
		borderRadius: '50%'
	}
});

class DropDown extends React.Component {
	state = {
		open: false
	};

	handleToggle = () => {
		this.setState(state => ({ open: !state.open }));
	};

	handleClose = event => {
		if (this.anchorEl.contains(event.target)) {
			return;
		}

		this.setState({ open: false });
	};

	handleClick = target => {
		//<Redirect />;
	};

	render() {
		const { classes } = this.props;
		const { open } = this.state;

		return (
			<div
				className={classes.root}
				style={{ marginRight: '-8px', fontSize: '2rem' }}
			>
				<Button
					buttonRef={node => {
						this.anchorEl = node;
					}}
					aria-owns={open ? 'menu-list-grow' : undefined}
					aria-haspopup="true"
					onClick={this.handleToggle}
					style={{
						outline: 'none',
						padding: '8px 6px 8px 16px',
						margin: '0 0 0 2px'
					}}
				>
					<img
						src={this.props.userInfo.img_url}
						className={classes.profilepic}
						alt={this.props.userInfo.username}
						style={{ background: '#bfbfbf' }}
					/>
					<img
						src={arrowDown}
						alt="arrowDown"
						style={{ width: '15px', margin: '3px 0 0 7px' }}
					/>
				</Button>
				<Popper open={open} anchorEl={this.anchorEl} transition disablePortal>
					{({ TransitionProps, placement }) => (
						<Grow
							{...TransitionProps}
							id="menu-list-grow"
							style={{
								transformOrigin:
									placement === 'bottom' ? 'right top' : 'center bottom'
							}}
						>
							<Paper style={{ marginRight: '55px' }}>
								<ClickAwayListener onClickAway={this.handleClose}>
									<MenuList>
										<MenuLink to={`/ProjectList`}>
											<MenuItem
												onClick={this.handleClose}
												style={{
													fontSize: '1.6rem',
													color: 'inherit',
													textDecoration: 'inherit'
												}}
											>
												My Profile
											</MenuItem>
										</MenuLink>
										<MenuLink to={`/settings`}>
											<MenuItem
												onClick={this.handleClose}
												style={{
													fontSize: '1.6rem',
													color: 'inherit',
													textDecoration: 'inherit'
												}}
											>
												Profile Settings
											</MenuItem>
										</MenuLink>
										<MenuLink to={`/newproject`}>
											<MenuItem
												onClick={this.handleClose}
												style={{
													fontSize: '1.6rem',
													color: 'inherit',
													textDecoration: 'inherit'
												}}
											>
												New Project
											</MenuItem>
										</MenuLink>
										<Signout href={logoutURL}>
											<MenuItem
												onClick={this.handleClose}
												style={{
													fontSize: '1.6rem',
													color: 'inherit',
													textDecoration: 'inherit'
												}}
											>
												Signout
											</MenuItem>
										</Signout>
									</MenuList>
								</ClickAwayListener>
							</Paper>
						</Grow>
					)}
				</Popper>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	userInfo: state.loggedInReducer.userInfo
});

export default compose(
	withStyles(styles),
	connect(mapStateToProps)
)(DropDown);
