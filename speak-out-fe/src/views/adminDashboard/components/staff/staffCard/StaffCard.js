import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getStaffById, toggleEditComponent } from '../../../../../actions';
import { withRouter, useParams, useHistory } from 'react-router-dom';
import StaffInformationTab from './StaffInformationTab';
import StaffCoursesTab from './StaffCoursesTab';
import { Header, Image, Icon, Tab } from 'semantic-ui-react';
import 'antd/dist/antd.css';
import '../../mainStyle/mainCard.scss';

const StaffCard = props => {
  const { push } = useHistory()
  const { staffID } = useParams()

  useEffect(() => {
    props.getStaffById(staffID);
  }, [staffID]);

  const panes = [
    {
      menuItem: 'STAFF INFORMATION',
      render: () => (
        <Tab.Pane attached={false}>
          <StaffInformationTab
            staffID={staffID}
          />
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'COURSES',
      render: () => (
        <Tab.Pane attached={false}>
          {<StaffCoursesTab staffID={staffID} teacher={props.staffById.name} />}
        </Tab.Pane>
      ),
    },
  ];

  const goBack = () => {
    push('/dashboard/staff')
  };

  return (
    <div>
      <div className='card'>
        <div
          className='back-button'
          onClick={goBack}
          style={{ cursor: 'pointer', width: '10%' }}
        >
          <Icon name='angle left' />
          Back
        </div>
        <div className='card-title'>
          <Image
            src='https://react.semantic-ui.com/images/wireframe/square-image.png'
            circular
            size='small'
          />

          <Header as='h2'>
            {props.staffById && props.staffById.name}
            <div className='headerDiv'>
              <div>
                <div className='headerSeparateDiv'>
                  CPR # {props.staffById && props.staffById.cpr}
                </div>
                <div className='headerSeparateDiv'>
                  Staff ID: {props.staffById && props.staffById.staff_id}
                </div>
              </div>
            </div>
          </Header>
        </div>
        <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    isLoading: state.staffByIdReducer.isLoading,
    staffById: state.staffByIdReducer.staffById,
    error: state.staffByIdReducer.error,
  };
};

export default withRouter(
  connect(mapStateToProps, { getStaffById, toggleEditComponent })(StaffCard)
);
