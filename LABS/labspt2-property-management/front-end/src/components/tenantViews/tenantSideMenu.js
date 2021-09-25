import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../assets/css/general.css';
import Logo from './../../assets/images/logo.png';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import LandingView from '../../components/LandingPage/LandingView';
import { Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faHardHat, faMoneyCheckAlt, faColumns, faCog } from '@fortawesome/free-solid-svg-icons';

const drawerWidth = 200;

const styles = (theme) => ({
	root: {
		display: 'flex'
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create([ 'width', 'margin' ], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		})
	},
	appBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create([ 'width', 'margin' ], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen
		})
	},
	menuButton: {
		marginLeft: 12,
		marginRight: 36
	},
	hide: {
		display: 'none'
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
		whiteSpace: 'nowrap'
	},
	drawerOpen: {
		width: drawerWidth,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen
		})
	},
	drawerClose: {
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		}),
		overflowX: 'hidden',
		width: theme.spacing.unit * 7 + 1,
		[theme.breakpoints.up('sm')]: {
			width: theme.spacing.unit * 7 + 1
		}
	},
	toolbar: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: '0 0px',
		...theme.mixins.toolbar
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing.unit * 3
	}
});

class TenantSideMenu extends Component {
	constructor(props) {
		super();
		this.state = {
			admin: true,
			open: false
		};
	}

	handleDrawerOpen = () => {
		this.setState({ open: true });
	};

	handleDrawerClose = () => {
		this.setState({ open: false });
	};

	// logOut = () => {
	// 	console.log(this.props);
	// 	localStorage.removeItem('jwtToken');
	// 	this.setState({ loggedIn: false });
	// 	this.props.history.push('/');
	// 	// window.location.reload();
	// };

	render() {
		const { loggedIn } = this.state;
		if (loggedIn === false) {
			return <Link push to="/login" />;
		} else {
			const { classes, theme } = this.props;

			return (
				<div className={classes.root}>
					<CssBaseline />
					<Route exact path={'/'} component={LandingView} />
					<AppBar
						position="fixed"
						className={classNames(classes.appBar, {
							[classes.appBarShift]: this.state.open
						})}
					>
						<Toolbar disableGutters={!this.state.open} className="Toolbar">
							<IconButton
								color="#FC7869"
								aria-label="Open drawer"
								onClick={this.handleDrawerOpen}
								className={classNames(classes.menuButton, {
									[classes.hide]: this.state.open
								})}
							>
								<MenuIcon />
							</IconButton>
							<Typography variant="h6" color="inherit" noWrap>
								<div className="flex-top-bar">
									<img src={Logo} className="dashboardLogo" alt="Dash logo" />

									<Link to={'/'} className="log-out">
										<ListItem button onClick={this.props.logOut}>
											<FontAwesomeIcon icon={faSignOutAlt} color="slategray" size="2x" />
										</ListItem>
									</Link>
								</div>
							</Typography>
						</Toolbar>
					</AppBar>
					<Drawer
						variant="permanent"
						className={classNames(classes.drawer, {
							[classes.drawerOpen]: this.state.open,
							[classes.drawerClose]: !this.state.open
						})}
						classes={{
							paper: classNames({
								[classes.drawerOpen]: this.state.open,
								[classes.drawerClose]: !this.state.open
							})
						}}
						open={this.state.open}
					>
						<div className={classes.toolbar}>
							<IconButton onClick={this.handleDrawerClose}>
								{theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
							</IconButton>
						</div>
						<Divider />

						<List>
							<Link to={'/dashboard'} className="list">
								<ListItem button>
									<ListItemIcon>
										<FontAwesomeIcon icon={faColumns} />
									</ListItemIcon>
									<ListItemText primary={'Dashboard'} />
								</ListItem>
							</Link>
						</List>

						<List>
							<Link to={'/payments'} className="list">
								<ListItem button>
									<ListItemIcon>
										<FontAwesomeIcon icon={faMoneyCheckAlt} />
									</ListItemIcon>
									<ListItemText primary={'Payments'} />
								</ListItem>
							</Link>
						</List>

						<List>
							<Link to={'/maintenance'} className="list">
								<ListItem button>
									<ListItemIcon>
										<FontAwesomeIcon icon={faHardHat} />
									</ListItemIcon>
									<ListItemText primary={'Maintenance'} />
								</ListItem>
							</Link>
						</List>

						<List>
							<Link to={'/settings'} className="list">
								<ListItem button>
									<ListItemIcon>
										<FontAwesomeIcon icon={faCog} />
									</ListItemIcon>
									<ListItemText primary={'Settings'} />
								</ListItem>
							</Link>
						</List>
					</Drawer>
				</div>
			);
		}
	}
}

TenantSideMenu.propTypes = {
	classes: PropTypes.object.isRequired,
	theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(TenantSideMenu);
