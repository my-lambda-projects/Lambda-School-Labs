import React from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axiosWithAuth from '../../../../../utils/axiosWithAuth';
import {
  ButtonDiv,
  CancelButton,
  SaveButton,
  Input,
  Textarea,
  Select,
} from '../../../../adminDashboard/components/mainStyle/styledComponent';

const StudentEditDetails = props => {
  const dateFormat = 'DD/MM/YYYY';
  const { errors, register, handleSubmit } = useForm();
  let history = useHistory();

  let birthdate;
  switch (props.student.birthdate) {
    case undefined:
      break;
    default:
      birthdate = new Date(props.student.birthdate).toISOString().split('T')[0];
  }

  const submitNow = data => {
    data.cpr = props.student.cpr;
    data.school_grade = props.student.school_grade;
    data.user_id = props.student.user_id;

    axiosWithAuth()
      .put(`/student/${props.student.student_id}`, data)
      .then(res => {
        history.push(`/student/${props.student.student_id}`);
      });
  };

  const handleCancel = () => {
    history.push('/student/:id');
  };

  return (
    <>
      <form onSubmit={handleSubmit(submitNow)}>
        <div className="editTitle">
          <h1>
            <input
              type="text"
              className={errors.first_name && 'input-error'}
              name="first_name"
              defaultValue={props.student.first_name}
              ref={register({ required: true, maxLength: 80 })}
            />
            {errors.first_name &&
              errors.first_name.type === 'required' &&
              'First name is required.'}
          </h1>
          &emsp;
          <h1>
            <input
              type="text"
              className={errors.additional_names && 'input-error'}
              name="additional_names"
              defaultValue={props.student.additional_names}
              ref={register({ required: true, maxLength: 80 })}
            />
            {errors.additional_names &&
              errors.additional_names.type === 'required' &&
              'Additional Name(s) are required.'}
          </h1>
        </div>
        <div className="editBox">
          <div className="editInfoBox">
            <h2>Details</h2>
            <hr></hr>
            <div className="editSubBox">
              <div>
                <h3>Student General Info:</h3>
                <h4>
                  <strong>Birth Date: </strong>
                  <Input
                    className={errors.birthdate && 'input-error'}
                    type="date"
                    name="birthdate"
                    defaultValue={birthdate}
                    format={dateFormat}
                    ref={register({ required: true })}
                  />
                  {errors.birthdate && 'Birth Date is required'}
                </h4>
                <h4>
                  <strong>Gender: </strong>
                  <Select
                    className="dropdown"
                    name="gender"
                    defaultValue={props.student.gender}
                    ref={register({ required: true })}
                  >
                    <option value="F">Female</option>
                    <option value="M">Male</option>
                  </Select>
                </h4>
                <h4>
                  <strong>School Name: </strong>
                  <Input
                    type="text"
                    className={errors.school_name && 'input-error'}
                    name="school_name"
                    defaultValue={props.student.school_name}
                    ref={register({ required: true })}
                  />
                  {errors.school_name && 'School Name is required.'}
                </h4>
              </div>
              <div>
                <h3>Student Contact Info:</h3>
                <h4>
                  <strong>Email: </strong>
                  <Input
                    type="text"
                    className={errors.email && 'input-error'}
                    name="email"
                    defaultValue={props.student.email}
                    ref={register({ required: true, pattern: /^\S+@\S+$/i })}
                  />
                  {errors.email && 'Email is required.'}
                </h4>
                <h4>
                  <strong>Phone Number: </strong>
                  <Input
                    type="tel"
                    classname={errors.phone_number && 'input-error'}
                    name="phone_number"
                    defaultValue={props.student.phone_number}
                    ref={register({ required: true, maxLength: 15 })}
                  />
                  {errors.phone_number &&
                    errors.phone_number.type === 'required' &&
                    'Phone Number is required.'}
                </h4>
                <h4>
                  <strong>Address: </strong>
                  <Input
                    type="text"
                    className={errors.address && 'address-error'}
                    name="address"
                    defaultValue={props.student.address}
                    ref={register({ required: true })}
                  />
                  {errors.address && 'Address is required.'}
                </h4>
              </div>
            </div>
          </div>
          <div className="editInfoBox">
            <h2>Contacts</h2>
            <hr></hr>
            <div className="editSubBox">
              <div>
                <h3>Primary Contact:</h3>
                <h4>
                  <strong>Name: </strong>
                  <Input
                    type="text"
                    className={errors.primary_emergency_contact_name && 'input-error'}
                    name="primary_emergency_contact_name"
                    defaultValue={props.student.primary_emergency_contact_name}
                    ref={register({ required: true })}
                  />
                  {errors.primary_emergency_contact_name &&
                    'Primary Emergency Contact Name is required.'}
                </h4>
                <h4>
                  <strong>Relationship: </strong>
                  <Input
                    type="text"
                    className={errors.primary_emergency_relationship && 'input-error'}
                    name="primary_emergency_relationship"
                    defaultValue={props.student.primary_emergency_contact_name}
                    ref={register({ required: true })}
                  />
                  {errors.primary_emergency_relationship &&
                    'Primary Emergency Relationship is required.'}
                </h4>
                <h4>
                  <strong>Phone Number: </strong>
                  <Input
                    type="tel"
                    className={errors.primary_emergency_phone && 'input-error'}
                    name="primary_emergency_phone"
                    defaultValue={props.student.primary_emergency_phone}
                    ref={register({ required: true })}
                  />
                  {errors.primary_emergency_phone &&
                    errors.primary_emergency_phone.type === 'required' &&
                    'Primary Emergency Phone is required.'}
                </h4>
              </div>
              <div>
                <h3>Secondary Contact:</h3>
                <h4>
                  <strong>Name: </strong>
                  <Input
                    type="text"
                    className={errors.emergency_contact_name && 'input-error'}
                    name="emergency_contact_name"
                    defaultValue={props.student.emergency_contact_name}
                    ref={register}
                  />
                </h4>
                <h4>
                  <strong>Relationship: </strong>
                  <Input
                    type="text"
                    className={errors.emergency_relationship && 'input-error'}
                    name="emergency_relationship"
                    defaultValue={props.student.emergency_contact_name}
                    ref={register}
                  />
                </h4>
                <h4>
                  <strong>Phone Number: </strong>
                  <Input
                    type="tel"
                    className={errors.emergency_phone && 'input-error'}
                    name="emergency_phone"
                    defaultValue={props.student.emergency_phone}
                    ref={register}
                  />
                </h4>
              </div>
            </div>
          </div>
        </div>
        <div className="editBox">
          <div className="editInfoBox">
            <h2>Notes</h2>
            <hr></hr>
            <div>
              <h4>
                <strong>Notes: </strong>
                <Textarea
                  type="text"
                  className="student-form-notes"
                  name="notes"
                  defaultValue={props.student.notes}
                  ref={register}
                />
              </h4>
            </div>
          </div>
        </div>
        <div className="studentEditButton">
          <ButtonDiv>
            <CancelButton onClick={handleCancel}>Cancel</CancelButton>
            <SaveButton>Save</SaveButton>
          </ButtonDiv>
        </div>
      </form>
    </>
  );
};

export default StudentEditDetails;
