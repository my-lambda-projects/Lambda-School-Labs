import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { 
	editStudentById, 
	editStudentDropDown, 
	toggleEditComponent, 
	createNewStudent 
} from '../../../../../actions';
import { withRouter } from 'react-router-dom';
import 'react-dropdown/style.css';
import '../../mainStyle/mainTable.scss';
import { 
	FormWrap, 
	Input, 
	Div, 
	FormSet, 
	ButtonDiv, 
	CancelButton, 
	SaveButton, 
	Label 
} from '../../mainStyle/styledComponent';
import '../../../../../styles/table.scss';
import {createDropdown} from '../../../../../utils/helpers';
import { useForm } from 'react-hook-form';

const StudentRegForm = props => {
	const student = props.studentById;
	const { errors, register, handleSubmit } = useForm();

	const submitNow = (data) => {
		props.createNewStudent(data);
		props.setStudentAddForm(false);
	}

	useEffect(() => { props.editStudentDropDown(); }, []);

	const handleCancel = e => {
		e.preventDefault();
		props.setStudentAddForm(false);
	};

	const yesNoDropdown = [
		{ label: 'Yes', value: true },
		{ label: 'No', value: false }
	];

	return (
		<FormWrap onSubmit={handleSubmit(submitNow)}>
			<FormSet>
				<Div>
					<div>
						<Label>ID</Label>
						<div>
							<Input type="text" placeholder="xxxxxxxxxx" border={errors.cpr && '2px solid red'}  name="cpr" ref={register({required: true, minLength: 9, maxLength: 9})} />
							{errors.cpr && errors.cpr.type === "required" && 'ID is required.'}
							{errors.cpr && (errors.cpr.type === "minLength" || errors.cpr.type === "maxLength") && 'ID needs to be 9 characters'}
						</div>
					</div>
					<div>
						<Label>First Name</Label>
						<div>
							 <Input type="text"  border={errors.first_name && '2px solid red'}  name="first_name" ref={register({required: true, maxLength: 80})} />
							 {errors.first_name && errors.first_name.type === "required" && 'First name is required.'}
						</div>
					</div>
					<div>
						<Label>Additional Names</Label>
						<div>
							{/* regex pattern: 1 or more words, separated by spaces. Optional space at end so error border doesn't come up while typing more names. */}
							<Input type="text" border={errors.additional_names && '2px solid red'} name="additional_names" defaultValue={student.additional_names} ref={register({required: true, pattern: /^([a-zA-Z]+ +){0,}([a-zA-Z]+ ?)$/i })} />
							{errors.additional_names && errors.additional_names.type === "required" && 'Additional Names are required.'}
							{errors.additional_names && errors.additional_names.type === "pattern" && 'Enter at least 1 additional name.'}
						</div>
					</div>
					<div>
						<Label>Gender</Label>
						<div>
							<select className='dropDown' name="gender" ref={register({ required: true })}>
        						<option value="F">F</option>
        						<option value="M">M</option>
      						</select>
						</div>
					</div>
					<div>
						<Label>Phone Number</Label>
						<div>
							<Input type="tel" border={errors.phone_number && '2px solid red'} name="phone_number" defaultValue={student.phone_number} ref={register({required: true, maxLength: 100})} />
							{errors.phone_number && errors.phone_number.type === "required" && 'Phone Number is required.'}	
						</div>
					</div>
					<div>
					<Label>Email</Label>
						<div>
							<Input type="text" border={errors.email && '2px solid red'} name="email" ref={register({required: true, pattern: /^\S+@\S+$/i})} />
							{errors.email && 'Email is required.'}
						</div>
					</div>
					<div>
						<Label>Birth Date</Label>
						<div>
							<Input type="date" border={errors.birthdate && '2px solid red'} name="birthdate" ref={register({required: true})} />
							{errors.birthdate && 'Birth Date is required.'}
						</div>
					</div>
					<div>
						<Label>School Name</Label>
						<div>
							<Input type="text" border={errors.school_name && '2px solid red'}  name="school_name" ref={register({required: true})} />
							{errors.school_name && 'School Name is required.'}
						</div>
					</div>
					<div>
						<Label>School Grade</Label>
						<div>
							<Input className='dropDown' name="school_grade" ref={register({ required: false })} />
						</div>
					</div>
					<div style={{ gridColumn: 'span 3' }}>
						<Label>Address</Label>
						<div>
							<Input type='text' border={errors.address && '2px solid red'} name="address" defaultValue={student.address} ref={register({required: true})} />
							{errors.address && "Address is required."}
						</div>
					</div>
					<div style={{ gridColumn: 'span 2' }}>
						<Label>Primary Emergency Contact Name</Label>
						<div>
							<Input type="text" border={errors.primary_emergency_contact_name && '2px solid red'} name="primary_emergency_contact_name" defaultValue={student.primary_emergency_contact_name} ref={register({required: true})} />
							{errors.primary_emergency_contact_name && 'Primary Emergency Contact Name is required.'}
						</div>
					</div>
					<div>
						<Label>Relationship</Label>
						<div>
							<Input type="text" border={errors.primary_emergency_relationship && '2px solid red'} name="primary_emergency_relationship" defaultValue={student.primary_emergency_relationship} ref={register({required: true})} />
							{errors.primary_emergency_relationship && 'Primary Emergency Relationship is required.'}
						</div>
					</div>
					<div>
						<Label>Emergency Number</Label>
						<div>
							<Input type="tel" border={errors.primary_emergency_phone && '2px solid red'} name="primary_emergency_phone" defaultValue={student.primary_emergency_phone} ref={register({required: true})} />
							{errors.primary_emergency_phone && errors.primary_emergency_phone.type === "required" && 'Primary Emergency Phone is required.'}
						</div>
					</div>
					<div style={{ gridColumn: 'span 2' }}>
						<Label>Emergency Contact Name</Label>
						<div>
							<Input style={{ width: '100%' }} type="text" name="emergency_contact_name" defaultValue={student.emergency_contact_name} ref={register} />
						</div>
					</div>
					<div>
						<Label>Relationship</Label>
						<div>
							<Input type="text"  name="emergency_relationship" defaultValue={student.emergency_relationship} ref={register} />
						</div>
					</div>
					<div>
						<Label>Emergency Number</Label>
						<div>
							<Input type="tel" name="emergency_phone" defaultValue={student.emergency_phone} ref={register} />
						</div>
					</div>
					<div>
						<Label>Grade Updated</Label>
						<div>
							<Input type="date" name="grade_updated" ref={register()} />
						</div>
					</div>
					<div>
						<Label>No Call</Label>
						<div>
							<select className='dropDown' name="no_call" defaultValue={student.no_call} ref={register({ required: true })}>
								{createDropdown(yesNoDropdown)}
							</select>
						</div>
					</div>
					<div>
						<Label>Delinquent</Label>
						<div>
							<select className='dropDown' name="delinquent" defaultValue={student.delinquent} ref={register({ required: true })}>
								{createDropdown(yesNoDropdown)}
							</select>
						</div>
					</div>
					<div>
						<Label>Expelled</Label>
						<div>
							<select className='dropDown' name="expelled" defaultValue={student.expelled} ref={register({ required: true })}>
								{createDropdown(yesNoDropdown)}
							</select>
						</div>
					</div>
					<div style={{ gridColumn: 'span 4' }}>
						<Label>Notes</Label>
						<div>
							<textarea type="text" name="notes" ref={register} className="student-form-notes"/>
						</div>
						<div>
							<Input type="hidden" name="user_id" defaultValue={student.user_id} ref={register({required: true})} />
						</div>
					</div>
				</Div>
			</FormSet>
			<ButtonDiv>
				<CancelButton onClick={handleCancel}>Cancel</CancelButton>
				<SaveButton type="submit">
					Create
				</SaveButton>
			</ButtonDiv>
		</FormWrap>
	);
};

const mapStateToProps = state => {
	return {
		studentById: state.studentByIdReducer.studentById,
		error: state.studentByIdReducer.error,
		schoolGradeTable: state.studentByIdReducer.schoolGradeTable,
	};
};

export default withRouter(
	connect(mapStateToProps, {
		editStudentById,
		createNewStudent,
		toggleEditComponent,
		editStudentDropDown,
	})(StudentRegForm)
);