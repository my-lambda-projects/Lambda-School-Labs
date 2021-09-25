import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import StaffDashboardHeader from './StaffDashboardHeader';
import StaffDashboard from './StaffDashboard';
import Footer from '../../marketing/components/Footer';
import './staffDashboard.scss';
import StaffCourseCard from './StaffCourseCard';
import StaffSettings from './StaffSettings';
import StaffSettingsEdit from './StaffSettingsEdit';

function Index() {
	let { path } = useRouteMatch();

	return (
		<div className='staffDashboard'>
			<StaffDashboardHeader />
			<Switch>
				<Route exact path={path}>
					<StaffDashboard />
				</Route>
				<Route exact path={`${path}/account-settings`}>
					<StaffSettings />
				</Route>
				<Route  path={`${path}/account-settings/edit`}>
					<StaffSettingsEdit />
				</Route>
				<Route path={`${path}/:courseId`}>
					<StaffCourseCard />
				</Route>
			</Switch>
			<Footer />
		</div>
	);
}

export default Index;
