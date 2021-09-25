import React, { useState, useEffect } from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';

import { PrimaryButton } from '../../../styles/BtnStyle';
import axiosWithAuth from '../../../utils/axiosWithAuth';

const StaffSettings = () => {
	const { url } = useRouteMatch();
	const history = useHistory();
	const [staffData, setStaffData] = useState({});

	const token = localStorage.getItem('token');
	const tokenData = JSON.parse(atob(token.split('.')[1]));
	const { subject } = tokenData;

	useEffect(() => {
		axiosWithAuth()
			.get(`/staffdashboard/${subject}`)
			.then(res => {
				
				setStaffData(res.data);
			})
			.catch(err => {
				console.log('Something broke!', err);
			});
	}, []);

	const handleSubmit = e => {
		e.preventDefault();
		history.push(`${url}/edit`);
	};

	return (
		<>
			<div className='settings'>
				<h1>Staff Settings</h1>
				<h2 className='settingsItem'> {staffData.name}</h2>
				<h3 className='settingsItem'>Government ID: {staffData.cpr}</h3>
				<h3 className='settingsItem'>Phone: {staffData.mobile_number}</h3>
        <h3 >{staffData.email}</h3>
        <PrimaryButton className='settingsItem edit' onClick={handleSubmit}>Edit</PrimaryButton>
			</div>
		</>
	);
};

export default StaffSettings;
