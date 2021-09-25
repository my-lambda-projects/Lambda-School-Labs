import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import { PrimaryButton, SecondaryButton } from '../../../styles/BtnStyle';
import axiosWithAuth from '../../../utils/axiosWithAuth';

const StaffSettingsEdit = () => {
	const { register, handleSubmit, errors } = useForm();
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

	const onSubmit = data => {
		data = { ...staffData, ...data };
		axiosWithAuth()
			.put(`/staff/${staffData.staff_id}`, data)
			.then(res => {
				history.push(`/dashboard/account-settings`);
			})
			.catch(err => console.log(err));
	};

	const handleCancel = e => {
		e.preventDefault();
		history.push(`/dashboard/account-settings`);
	};

	return (
		<div className='staffEdit'>
			<form classname='staffEditForm' onSubmit={handleSubmit(onSubmit)}>
				<h1>Account Edit</h1>
				<label className='editfield'>Full Name:</label>
				<input
					type='text'
					name='name'
					defaultValue={staffData.name}
					ref={register}
				/>

				<label className='editfield'>Government ID: </label>
				<input
					type='text'
					name='cpr'
					defaultValue={staffData.cpr}
					ref={register}
				/>

				<label className='editfield'>Phone:</label>
				<input
					type='text'
					name='mobile_number'
					defaultValue={staffData.mobile_number}
					ref={register}
				/>

				<label className='editfield'>Email:</label>
				<input
					type='email'
					name='email'
					defaultValue={staffData.email}
					ref={register}
				/>
				<div className='button-div'>
					<SecondaryButton type='reset' onClick={handleCancel}>
						Cancel
					</SecondaryButton>
					<PrimaryButton className='submit-btn' type='submit'>
						Submit
					</PrimaryButton>
				</div>
			</form>
		</div>
	);
};

export default StaffSettingsEdit;
