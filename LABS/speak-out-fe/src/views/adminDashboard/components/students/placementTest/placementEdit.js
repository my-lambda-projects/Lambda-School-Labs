import React from 'react';
import { connect } from 'react-redux';
import { editPlacementTestById } from '../../../../../actions/adminDashboardActions/placementTestAction';
import { withRouter } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { CancelButton, AddButton, ButtonDiv, Div4, FormSet, FormWrap, Input, DisabledInput, Label } from '../../mainStyle/styledComponent.js';
// import { getDateStringENGBFormat } from "../../../../../utils/helpers";
// import axiosWithAuth from '../../../../../utils/axiosWithAuth';

import '../../mainStyle/mainTable.scss';
import './placementTest.scss';


const PlacementEdit = props => {
    const { register, errors, handleSubmit } = useForm();

    const record = props.oralPlacementTestById[0];

    let testDate = new Date(record.test_date).toISOString().split('T')[0];

    const submitNow = data => {
        const studentID = props.studentID;
        let editData = {
            id: record.id,
            test_date: data.test_date,
            student_id: studentID,
            test: data.test,
            level_id: data.level_id,
            fluency: data.fluency || null,
            accuracy: data.accuracy || null,
            comprehension: data.comprehension || null,
            writing_level: data.writing_level || null,
            notes: data.notes || null
        }
        props.editPlacementTestById(record.id, editData);
        props.setEditTest(false);
    }
    
    const handleCancel = e => {
        e.preventDefault();
        props.setEditTest(false);
    }
   
    return(
        <FormWrap onSubmit={handleSubmit(submitNow)}>
            <FormSet>
                <Div4>
                    <div>
                        <Label>Test Date</Label>
                        <Input type="date" name="test_date" defaultValue={testDate} border={errors.test_date && '2px solid red'} ref={register({required: true})} />
                            {errors.test_date && errors.test_date.type === "required" && "Test Date is Required"}
                    </div>
                    <div>
                        <Label>Student ID</Label>
                        <DisabledInput style={{ marginTop: "6px" }} type="number" name="student_id" value={props.studentID} border={errors.student_id && '2px solid red'} ref={register({required: true })} disabled/>
                            {errors.student_id && errors.student_id.type === "required" && 'Student ID is Required'}
                    </div>
                    <div>
                        <Label>Test</Label>
                        <Input type="text" name="test" defaultValue={record.test} border={errors.test && '2px solid red'} ref={register({required: true })} />
                            {errors.test && errors.test.type === "required" && 'Test is Required'}	
                    </div> 
                    <div>
                        <Label>Level</Label>
                        <Input type="number" name="level_id" defaultValue={record.level_id} border={errors.level_id && '2px solid red'} ref={register({required: true })} />
                            {errors.level_id && errors.level_id.type === "required" && 'Level is Required'}
                    </div> 
                    <div>
                        <Label>Fluency</Label>
                        <Input type="number" name="fluency" placeholder="#" defaultValue={record.fluency} border={errors.fluency && '2px solid red'} ref={register({required: false })} />
                    </div> 
                    <div>
                        <Label>Accuracy</Label>
                        <Input type="number" name="accuracy" placeholder="#" defaultValue={record.accuracy} border={errors.accuracy && '2px solid red'} ref={register({required: false })} />
                    </div> 
                    <div>
                        <Label>Comprehension</Label>
                        <Input type="number" name="comprehension" placeholder="#" defaultValue={record.comprehension} border={errors.comprehension && '2px solid red'} ref={register({required: false })} />
                    </div> 
                    <div>
                        <Label>Writing Level</Label>
                        <Input type="text" name="writing_level" placeholder="#" defaultValue={record.writing_level} border={errors.writing_level && '2px solid red'}  ref={register({required: false })} />
                    </div> 
                    <div style={{ gridColumn: "1 / -1" }}>
                        <Label>Notes</Label>
                        <div>
                            <Input type="textarea" name="notes" defaultValue={record.notes} border={errors.notes && '2px solid red'} ref={register({required: false })} />
                        </div>
                    </div>     
                </Div4>
            </FormSet>
            <ButtonDiv>
                <CancelButton onClick={handleCancel}>
                    Cancel
                </CancelButton>
                <AddButton onClick={handleSubmit(submitNow)} type='submit'>Edit</AddButton>
            </ButtonDiv>
        </FormWrap>
    )
}

const mapStateToProps = state => {
    return {
        isLoading: state.isLoading,
        isTestAdding: state.isTestAdding,
        isTestAdded: state.isTestAdded
    };
  };
  
  export default withRouter(
    connect(
      mapStateToProps,
      { editPlacementTestById }
  )(PlacementEdit)
  )
