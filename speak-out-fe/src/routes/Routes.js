import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../authentication/Login';
import DashboardView from '../views';
import Register from '../authentication/Register';
import Student from '../views/userDashboard/components/Student/Student';
import ProtectedRoute from './ProtectedRoute';
import Marketing from '../views/marketing/Marketing';

function Routes() {
	return (
		<>
			<Switch>
				<ProtectedRoute path='/dashboard' component={DashboardView} />
				<Route exact path='/' render={() => <Marketing page='home' />} />
				<Route
					path='/schedules'
					render={() => <Marketing page='course_structure' />}
				/>
				<Route path='/courses' render={() => <Marketing page='courses' />} />
				<Route path='/about' render={() => <Marketing page='about' />} />
				<Route path='/student/:id' component={Student} />
				<Route path='/login' render={() => <Login />} />
				<Route path='/register' render={() => <Register />} />
			</Switch>
		</>
	);
}
export default Routes;
