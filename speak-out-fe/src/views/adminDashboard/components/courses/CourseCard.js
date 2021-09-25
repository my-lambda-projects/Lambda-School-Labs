import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter, useParams, useHistory } from 'react-router-dom';
import { getCourseById } from '../../../../actions';
import CourseInformationTab from './courseCardTabs/CourseInformationTab.js';
import EnrolledStudentsTab from './courseCardTabs/EnrolledStudentsTab.js';
import { Tab, Image, Header, Icon } from 'semantic-ui-react';

import '../mainStyle/mainCard.scss';
import 'antd/dist/antd.css';
import 'semantic-ui-css/semantic.min.css';

const CourseCard = props => {
  const { push } = useHistory()
  const { courseID } = useParams()
  
  useEffect(() => {
    props.getCourseById(courseID);
  }, []);

  const panes = [
    {
      menuItem: 'COURSE INFORMATION',
      render: () => (
        <Tab.Pane attached={false}>
          {
            <CourseInformationTab
              courseID={courseID}
              setCourseView={props.setCourseView}
            />
          }
        </Tab.Pane>
      )
    },
    {
      menuItem: 'ENROLLED STUDENTS',
      render: () => (
        <Tab.Pane attached={false}>
          {<EnrolledStudentsTab courseID={courseID} />}
        </Tab.Pane>
      )
    }
  ];

  const goBack = () => {
    push('/dashboard/courses')
  };

  //working
  //had to add empdy string b/c it was returning empty string and toUpperCase undefined
  let courseProps = props.courseById.course_type || '';
  let course_type = courseProps.charAt(0).toUpperCase() + courseProps.slice(1);

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
          {course_type}
          <div className="headerDiv">
            <div>
              <div className="headerSeparateDiv"> {props.courseById.term}</div>
              <div className="headerSeparateDiv">
                {props.courseById.teacher}
              </div>
            </div>
          </div>
        </Header>
      </div>
      <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    courseById: state.coursesTableReducer.courseById,
  };
};

export default withRouter(
  connect(mapStateToProps, { getCourseById })(CourseCard)
);
