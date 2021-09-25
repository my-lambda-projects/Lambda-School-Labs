import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getStudentById, toggleEditComponent } from '../../../../../actions';
import { withRouter, useParams, useHistory } from 'react-router-dom';
import StudentInformationTab from './StudentInformationTab';
import StudentCoursesTab from './StudentCoursesTab';
import StudentFamilyTab from './StudentFamilyTab';
import PlacementTest from '../placementTest/placementTest';
import PlacementForm from '../placementTest/placementForm';
import { Tab } from 'semantic-ui-react';
import { Header, Image, Icon } from 'semantic-ui-react';
import StudentProgressTab from '../studentProgress/StudentProgressTab';

import 'antd/dist/antd.css';
import '../../mainStyle/mainCard.scss';

const StudentCard = props => {
	const { push } = useHistory()
	const { studentID } = useParams()
	useEffect(() => {
		props.getStudentById(studentID);
	}, [studentID]);

	const studentPanes = [
		{
			menuItem: 'STUDENT INFORMATION',
			render: () => (
				<Tab.Pane attached={false}>
					<StudentInformationTab
						studentID={studentID}
					/>
				</Tab.Pane>
			)
		},
		{
			menuItem: 'COURSES',
			render: () => (
				<Tab.Pane attached={false}>
					{<StudentCoursesTab studentID={studentID} />}
				</Tab.Pane>
			)
		},
		{
			menuItem: 'PROGRESS',
			render: () => (
				<Tab.Pane attached={false}>
					<StudentProgressTab studentID={studentID} />
				</Tab.Pane>
			)
		},
		{
			menuItem: 'FAMILY',
			render: () => (
				<Tab.Pane attached={false}>
					<StudentFamilyTab studentID={studentID} />
				</Tab.Pane>
			)
		},
		{
			menuItem: 'PLACEMENT TEST',
			render: () => (
				<Tab.Pane attached={false}>
					<PlacementTest studentID={studentID} placementTestById={{}} />
					{/* <PlacementForm studentID={studentID} placementTestById={{}} /> */}
				</Tab.Pane>
			)
		}
	];

	const goBack = () => {
		push('/dashboard/students')
	};

	return (
		<div>
			<div
				className="back-button"
				onClick={goBack}
				style={{ cursor: 'pointer', width: '10%' }}
			>
				<Icon name="angle left" />
				Back
			</div>
			<div className="card-title">
				<Image
					src="https://react.semantic-ui.com/images/wireframe/square-image.png"
					circular
					size="small"
				/>

				<Header as="h2">
					{props.studentById && props.studentById.first_name}{' '}
					{props.studentById && props.studentById.additional_names}
					<div className="headerDiv">
						<div>
							<div className="headerSeparateDiv">
								CPR # {props.studentById && props.studentById.cpr}
							</div>
							<div className="headerSeparateDiv">
								STUDENT ID {props.studentById && props.studentById.student_id}
							</div>
						</div>
					</div>
				</Header>
			</div>
			<Tab menu={{ secondary: true, pointing: true }} panes={studentPanes} />
		</div>
	);
};

const mapStateToProps = state => {
	return {
		isLoading: state.studentByIdReducer.isLoading,
		studentById: state.studentByIdReducer.studentById,
		isEditing: state.studentByIdReducer.isEditing
	};
};

export default withRouter(
	connect(mapStateToProps, { getStudentById, toggleEditComponent })(StudentCard)
);
