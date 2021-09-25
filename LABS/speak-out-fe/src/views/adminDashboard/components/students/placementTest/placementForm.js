import React from 'react';
import { connect } from 'react-redux';
import { addPlacementTest } from '../../../../../actions/adminDashboardActions/placementTestAction';
import { withRouter } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { CancelButton, AddButton, ButtonDiv, Div4, FormSet, FormWrap, Input, DisabledInput, Label } from '../../mainStyle/styledComponent.js';

import '../../mainStyle/mainTable.scss';
import './placementTest.scss';


const PlacementForm = props => {
    const { register, errors, handleSubmit } = useForm();

    const submitNow = data => {
        const studentID = props.studentID;
        let sendData = {
            test_date: data.test_date,
            test_type: 2,
            student_id: studentID,
            test: data.test,
            level_id: data.level_id,
            fluency: data.fluency || null,
            accuracy: data.accuracy || null,
            comprehension: data.comprehension || null,
            writing_level: data.writing_level || null,
            answers: null,
            notes: data.notes || null
        }
        props.addPlacementTest(sendData);
        props.setAddTest(!props.addTest);
    }
    
    const handleCancel = e => {
        e.preventDefault();
        props.setAddTest(false);
    }
   
    return(
        <FormWrap onSubmit={handleSubmit(submitNow)}>
            <FormSet>
                <Div4>
                    <div>
                        <Label>Test Date</Label>
                        <Input type="date" name="test_date" border={errors.test_date && '2px solid red'} ref={register({required: true})} />
                            {errors.test_date && errors.test_date.type === "required" && "Test Date is Required"}
                    </div>
                    <div>
                        <Label>Student ID</Label>
                        <DisabledInput style={{ marginTop: "6px" }} type="number" name="student_id" defaultValue={props.studentID} border={errors.student_id && '2px solid red'} ref={register({required: true })} disabled/>
                            {errors.student_id && errors.student_id.type === "required" && 'Student ID is Required'}
                    </div>
                    <div>
                        <Label>Test</Label>
                        <Input type="text" name="test" placeholder="Primary/Intermediate" border={errors.test && '2px solid red'} ref={register({required: true })} />
                            {errors.test && errors.test.type === "required" && 'Test is Required'}	
                    </div> 
                    <div>
                        <Label>Level</Label>
                        <Input type="number" name="level_id" placeholder="#" border={errors.level_id && '2px solid red'} ref={register({required: true })} />
                            {errors.level_id && errors.level_id.type === "required" && 'Level is Required'}
                    </div> 
                    <div>
                        <Label>Fluency</Label>
                        <Input type="number" name="fluency" placeholder="#" border={errors.fluency && '2px solid red'} ref={register({required: false })} />
                    </div> 
                    <div>
                        <Label>Accuracy</Label>
                        <Input type="number" name="accuracy" placeholder="#" border={errors.accuracy && '2px solid red'} ref={register({required: false })} />
                    </div> 
                    <div>
                        <Label>Comprehension</Label>
                        <Input type="number" name="comprehension" placeholder="#" border={errors.comprehension && '2px solid red'} ref={register({required: false })} />
                    </div> 
                    <div>
                        <Label>Writing Level</Label>
                        <Input type="text" name="writing_level" placeholder="#" border={errors.writing_level && '2px solid red'} ref={register({required: false })} />
                    </div> 
                    <div style={{ gridColumn: "1 / -1" }}>
                        <Label>Notes</Label>
                        <div>
                            <Input type="textarea" name="notes" placeholder="Enter notes about student or test" border={errors.notes && '2px solid red'} ref={register({required: false })} />
                        </div>
                    </div>    
                </Div4>
            </FormSet>
            <ButtonDiv>
                <CancelButton onClick={handleCancel}>
                    Cancel
                </CancelButton>
                <AddButton type='submit'>Add</AddButton>
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
      { addPlacementTest }
  )(PlacementForm)
  )
