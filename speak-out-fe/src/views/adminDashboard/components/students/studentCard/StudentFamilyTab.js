import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getStudentById } from '../../../../../actions';
import { getStudentsInFamily } from '../../../../userDashboard/getStudentsinFamily';
import { withRouter } from 'react-router-dom';
import StudentRegForm from './StudentRegForm';
import {
	FormWrap,
	Div,
	TextDiv,
	FormSet,
	Label
} from '../../mainStyle/styledComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

const StudentFamilyTab = props => {
	const [studentAddForm, setStudentAddForm] = useState(false);
	const [family, setFamily] = useState([]);
	let userID = props.studentById.user_id;
	let studentID = props.studentById.student_id;
	let filterFamily = family.filter((member) => {
		return member.id !== studentID;
	})

	useEffect(() => {
		props.getStudentById(props.studentID);
	}, []);

	useEffect(() => {
		getStudentsInFamily(userID)
			.then(res => {
				setFamily(res);
			})
			.catch(err => {
				console.log("Error in retrieving students: ", err)
			})
	}, [props.studentList]);

	const handleAddButton = () => {
		setStudentAddForm(!studentAddForm);
  };

	return (
		<div>
			{!props.isEditing ? (
				<>
					<FormWrap>
						<FormSet>
							<Label>
								<h3>Family Information</h3>
							</Label>
							<Div>
								<div style={{ gridColumn: 'span 2' }}>
									<Label>Primary Emergency Contact Name</Label>
									<TextDiv>
										{(props.studentById &&
											props.studentById.primary_emergency_contact_name) ||
											'-'}
									</TextDiv>
								</div>
								<div>
									<Label>Relationship</Label>
									<TextDiv>
										{(props.studentById &&
											props.studentById.primary_emergency_relationship) ||
											'-'}
									</TextDiv>
								</div>
								<div>
									<Label>Emergency Number</Label>
									<TextDiv>
										{(props.studentById &&
											props.studentById.primary_emergency_phone) ||
											'-'}
									</TextDiv>
								</div>
								<div style={{ gridColumn: 'span 2' }}>
									<Label>Emergency Contact Name</Label>
									<TextDiv>
										{(props.studentById &&
											props.studentById.emergency_contact_name) ||
											'-'}
									</TextDiv>
								</div>
								<div>
									<Label>Relationship</Label>
									<TextDiv>
										{(props.studentById &&
											props.studentById.emergency_relationship) ||
											'-'}
									</TextDiv>
								</div>
								<div>
									<Label>Emergency Number</Label>
									<TextDiv>
										{(props.studentById && props.studentById.emergency_phone) ||
											'-'}
									</TextDiv>
								</div>
							</Div>
						</FormSet>
					</FormWrap>
					<FormWrap>
						{/* List all students besides the selected student for this user_id */}
						<Label>
							<h3>Registered Family Members</h3>
						</Label>
						{filterFamily.map((member) => (
							<TextDiv>
								<b>{member.first_name} {member.additional_names}</b>
								<br></br>
								<b>ID:</b> {member.cpr} | <b>Gender:</b> {member.gender} | <b>Birthdate:</b> {new Date(member.birthdate).toISOString().split('T')[0]} | <b>Student ID:</b> {member.id}
							</TextDiv>
						))}
					</FormWrap>
				</>
			) : (
				null
			)}
			{!studentAddForm ? (
				<div
          className='create-new-entry'
          onClick={handleAddButton}
          style={{ cursor: 'pointer', color: '#26ABBD' }}
        >
          <div style={{ marginRight: '10px' }}>Create New Student</div>
          <div>
            <FontAwesomeIcon
              style={{ width: '25px', height: '25px', cursor: 'pointer' }}
              icon={faPlusCircle}
              size='lg'
            />
          </div>
        </div>
			) : (
				<StudentRegForm setStudentAddForm={setStudentAddForm} {...props} />
			)}
		</div>
	);
};

const mapStateToProps = state => {
	return {
		isLoading: state.studentByIdReducer.isLoading,
		studentById: state.studentByIdReducer.studentById,
		studentList: state.studentTableReducer.studentList
	};
};

export default withRouter(
	connect(mapStateToProps, {
		getStudentById
	})(StudentFamilyTab)
);
