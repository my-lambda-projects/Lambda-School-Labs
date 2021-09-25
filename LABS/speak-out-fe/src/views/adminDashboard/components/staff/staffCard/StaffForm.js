import React, { useEffect } from 'react';
import {useForm} from 'react-hook-form'
import { connect } from 'react-redux';
import { editStaffById, toggleStaffEditComponent } from '../../../../../actions';
import { withRouter } from 'react-router-dom';
import { FormWrap,Input,  Div, FormSet, ButtonDiv, CancelButton, SaveButton, Label } from '../../mainStyle/styledComponent';

import "../../../../../styles/table.scss"

const StaffForm = props => {
  const { staffID } = props;
  const { register, errors, handleSubmit} = useForm();

  const submitNow = data => {
    
    props.editStaffById(staffID, data);
  }

  let birthdate = new Date(props.staffById.birthdate)
    .toISOString()
    .split('T')[0];


  const closeBtn = e => {
    e.preventDefault();
    props.toggleStaffEditComponent();
  };

  return (
    <FormWrap onSubmit={handleSubmit(submitNow)}>
      <FormSet>
        <Div>
          <div>
            <Label>Name</Label>
            <div>
            <Input    
                type='text' name='name' defaultValue={props.staffById.name} ref={register({required:true})} border={errors.name && '2px solid red'}/>
              {errors.name && errors.name.type === "required" && 'Name is Required'}
            </div>
          </div>
          <div>
            <Label>Government ID</Label>
            <div>
              <Input type="text"
              name="cpr" border={errors.cpr && '2px solid red'} defaultValue = {props.staffById.cpr} ref={register({required:true})}/>
              {errors.cpr && errors.cpr.type === "required" && 'CPR is Required'}
            </div>
          </div>
          <div>
            <Label>Mobile Number</Label>
            <div>
              <Input type="text" name="mobile_number" border={errors.mobile_number && '2px solid red'} defaultValue = {props.staffById.mobile_number} ref={register({required:true})}/>
              {errors.mobile_number && errors.mobile_number.type === "required" && 'Mobile Number is Required'}
            </div>
          </div>
          <div>
            <Label>Email</Label>
            <div>
              <Input type="email" name="email" border={errors.email && '2px solid red'} defaultValue = {props.staffById.email} ref={register({required:true})}/>
              {errors.email && errors.email.type === "required" && 'Email is Required'}
            </div>
          </div>
          <div>
            <Label>Accent</Label>
            <div>
              <Input type="text"
              name="accent"  defaultValue = {props.staffById.accent} border={errors.accent && '2px solid red'} ref={register({required:true})}/>
              {errors.accent && errors.accent.type === "required" && 'Accent is Required'}
            </div>
          </div>
          <div>
            <Label>Gender</Label>
            <div>
              <select name="gender" defaultValue={props.staffById.gender} className="dropDown" ref={register}>
                <option value="F">F</option>
                <option value="M">M</option>
              </select>
            </div>
          </div>
          <div>
            <Label>Birthdate</Label>
            <div>
              <Input type="date"
              name="birthdate"
              border={errors.birthdate && '2px solid red'} defaultValue={birthdate} ref={register({required:true})}/>
              {errors.birthdate && errors.birthdate.type === "required" && 'Birthdate is Required'}
            </div>
          </div>
          <div>
            <Label>Teaching Rate</Label>
            <div>
              <Input type="text" name="teaching_rate" border={errors.teaching_rate && '2px solid red'} defaultValue = {props.staffById.teaching_rate } ref={register({required:true})}/>
              {errors.teaching_rate && errors.teaching_rate.type === "required" && 'Teaching Rate is Required'}
            </div>
          </div>
          <div>
            <Label>Admin</Label>
            <div>
            <select name="user_type" defaultValue={props.staffById.user_type} className="dropDown" ref={register}>
                <option value="admin">Yes</option>
                <option value="staff">No</option>
              </select>
            </div>
          </div>
          <div>
            <Label>Active</Label>
            <div>
            <select name="active" defaultValue={props.staffById.active} className="dropDown" ref={register}>
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
            </div>
          </div>
        </Div>
      </FormSet>
      <ButtonDiv>
        <CancelButton onClick={closeBtn}>Cancel</CancelButton>
        <SaveButton type='submit' onclick={handleSubmit}>Save</SaveButton>
      </ButtonDiv>
    </FormWrap>
  );
};

export default withRouter(
  connect(null, { editStaffById, toggleStaffEditComponent })(StaffForm)
);
