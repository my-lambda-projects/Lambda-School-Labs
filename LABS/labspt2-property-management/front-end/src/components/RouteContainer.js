// import React, { Component } from 'react';

// import { Route } from 'react-router-dom';
// // import { Link } from 'react-router-dom';
// import PropertyList from './properties/propertyList';
// import TenantSideMenu from './tenantViews/tenantSideMenu';
// import SideMenu from './adminViews/adminSideMenu';
// import Workorderlist from './WorkOrders/workorderList';
// import Workorderform from './WorkOrders/workorderform';
// import AddProperty from './properties/addProperty';
// import DisplayProperty from './properties/displayProperty';
// import EditProperty from './properties/editProperty';
// import TenantSettings from './tenantViews/tenantSettings';
// import TenantDashboard from './tenantViews/tenantDashboard';
// import TenantPayments from './tenantViews/tenantPayments';
// import Billing from './adminViews/adminBilling.js';
// import AdminSettings from './adminViews/adminSettings';
// import Login from './auth/login';
// import Register from './auth/register';
// import LandingView from './LandingPage/LandingView';
// import Pricing from './LandingPage/Pricing';

// import AddTenant from './AddTenant/addTenant';

// class RouteContainer extends Component {
// 	state = {
// 		loggedIn: null
// 	};

// 	componentDidMount() {
// 		this.setState({loggedIn: this.props.loggedIn})
// 	}

// render() {
//     		if (!this.state.loggedIn) {
// 			return (
// 				<div>
// 					<Route exact path={'/'} component={LandingView} />
// 					<Route exact path={'/register'} component={Register} />
// 					<Route path={'/register/plan'} component={Pricing} />
// 					<Route exact path={'/login'} render={(props) => <Login {...props} authenticate={this.authenticate} />} />
// 				</div>
// 			);
// 		} else if (this.isAdmin()) {
// 			return (
// 				<div className="dashboard-container">
// 					<div className="left-side">
// 						<Route path="/" render={() => <SideMenu logOut={this.logOut} />} />
// 					</div>
// 					<div className="right-side">
// 						<Route path="/properties" component={PropertyList} />
// 						<Route exact path="/billing" component={Billing} />
// 						<Route path="/worklist" component={Workorderlist} />
// 						<Route path="/view-property/:id" component={DisplayProperty} />
// 						<Route path="/add-property" component={AddProperty} />
// 						<Route exact path="/add-tenant" component={AddTenant} />
// 						<Route exact path="/edit/:id" component={EditProperty} />
// 						<Route exact path="/workorders/form" component={Workorderform} />
// 						<Route exact path="/settings" component={AdminSettings} />
// 					</div>
// 				</div>
// 			);
// 		} else if (!this.isAdmin()) {
// 			return (
// 				<div className="dashboard-container">
// 					<div className="left-side">
// 						<Route path="/" render={() => <TenantSideMenu logOut={this.logOut} />} />
// 					</div>
// 					<div className="right-side">
// 						<Route path="/dashboard" component={TenantDashboard} />
// 						<Route exact path="/payments" component={TenantPayments} />
// 						<Route exact path="/maintenance" component={Workorderform} />
// 						<Route exact path="/settings" component={TenantSettings} />
// 					</div>
// 				</div>
// 			);
// 		}
// 	}
// }

// export default RouteContainer;