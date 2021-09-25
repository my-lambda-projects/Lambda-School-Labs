import React, {useState, useEffect} from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import axiosWithAuth from '../../../utils/axiosWithAuth';
import './UserSettings.scss';
import { PrimaryButton } from '../../../styles/BtnStyle';

const UserSettings = () => {
	const { url } = useRouteMatch();
	const history = useHistory();
	const [ user , setUser] = useState({})

	// Extracting User details from user's token
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
		


	const handleSubmit = e => {
		e.preventDefault();
		history.push(`${url}/edit`);
	};

	return (
		<div className='settings-container'>
			<h1>Review Settings</h1>
			<div className='input-group'>
				<label>Full Name:</label>
				<p>{user.name}</p>
				<label>Email:</label>
				<p>{user.email}</p>
			</div>
			<PrimaryButton onClick={handleSubmit}>Edit</PrimaryButton>
		</div>
	);
};

export default UserSettings;
