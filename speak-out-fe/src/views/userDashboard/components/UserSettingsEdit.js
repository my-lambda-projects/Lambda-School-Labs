import React, {useState, useEffect} from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import axiosWithAuth from '../../../utils/axiosWithAuth';
import { PrimaryButton, SecondaryButton } from '../../../styles/BtnStyle';
import './UserSettings.scss';

const UserSettingsEdit = () => {
	const [ user , setUser] = useState({})
	const { register, handleSubmit, errors } = useForm();
	
	const history = useHistory();

	const token = localStorage.getItem('token');
	const tokenData = JSON.parse(atob(token.split('.')[1]));
	const { subject } = tokenData;

	useEffect(() => {
		axiosWithAuth()
					.get(`/users/${subject}`)
					.then(res => {
						
						setUser(res.data[0])
					})
					.catch(err => {
						console.log('whoops', err);
					});
			},[])

	const onSubmit = data => {
		axiosWithAuth()
			.put(`/users/${subject}`, data)
			.then(res => {
				history.push(`/dashboard/account-settings`);
			})
			.catch(err => {
				console.log('whoops', err);
			});
	};
	const handleCancel = e => {
		e.preventDefault();
		history.push(`/dashboard/account-settings`);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='edit-container'>
			<h1>Edit Settings</h1>
			<div className='input-group'>
				<label htmlFor='name' className='label'>
					Full Name
				</label>
				<input
					type='text'
					defaultValue={user.name}
					name='name'
          ref={register({ required: true, min: 2, maxLength: 100 })}
          className='form-input'
				/>
				<label htmlFor='email' className='label'>
					Email
				</label>
				<input
					type='email'
					defaultValue={user.email}
					name='email'
          ref={register({ required: true })}
          className='form-input'
				/>
			</div>
			<div className='button-div'>
				<SecondaryButton type='reset' onClick={handleCancel}>
					Cancel
				</SecondaryButton>
				<PrimaryButton className='submit-btn' type='submit'>
					Submit
				</PrimaryButton>
			</div>
		</form>
	);
};

export default UserSettingsEdit;
