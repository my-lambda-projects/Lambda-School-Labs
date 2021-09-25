import React, { useState, useEffect } from 'react';
import axiosWithAuth from '../../../utils/axiosWithAuth';
import { useHistory } from 'react-router-dom';
import {  Table } from 'antd';
import { timeConverter } from '../../../utils/helpers';

import './staffDashboard.scss';

function StaffDashboard() {
	const [staffCourses, setStaffCourses] = useState([]);
	const [staff, setStaff] = useState({});
	const { push } = useHistory();

	// Get userId from JWT
	let token = localStorage.getItem('token');
	let tokenData = JSON.parse(atob(token.split('.')[1]));

	let user = tokenData.subject;

	//Get staffId from userId
	useEffect(() => {
		axiosWithAuth()
			.get(`/staffdashboard/${user}`)
			.then(res => {
				setStaff(res.data);
			})
			.catch(err => {
				console.log(err);
			});
	}, [user]);

	//Get staff courses with staffId
	useEffect(() => {
		if (staff.staff_id) {
			axiosWithAuth()
				.get(`/staff/${staff.staff_id}/courses`)
				.then(res => {
					setStaffCourses(res.data);
				})
				.catch(err => console.log(err));
		}
	}, [staff]);

	const staffCourseColumns = [
		{
			title: 'ID',
			dataIndex: 'course_id',
			key: 1,
		},
		{
			title: 'Schedule',
			dataIndex: 'course_schedule',
			key: 7,
		},
		{
			title: 'Start Time',
			dataIndex: 'start_time',
			key: 8,
			render: (value, row, index) => {
				return <span>{timeConverter(value)}</span>;
			},
		},
		{
			title: 'End Time',
			dataIndex: 'end_time',
			key: 9,
			render: (value, row, index) => {
				return <span>{timeConverter(value)}</span>;
			},
		},

	];

	return (
		<>
			<div className='staff'>
				{
					<>
						<h1>Welcome {staff.name}. </h1>
						<Table
							dataSource={staffCourses}
							className='coursesTable'
							columns={staffCourseColumns}
							pagination={false}
							rowKey='course_id'
							onRow={(record) => {
								return {
									onClick: event => {
										push(`dashboard/${record.course_id}`);
									},
								};
							}}
						/>
					</>
				}
			</div>
		</>
	);
}

export default StaffDashboard;
