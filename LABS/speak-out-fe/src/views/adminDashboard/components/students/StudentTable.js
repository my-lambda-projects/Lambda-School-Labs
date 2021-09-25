import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter, useHistory } from 'react-router-dom';
import { getStudentTable } from '../../../../actions';
import { Table, Tag, Spin } from 'antd';
import SearchStundentTable from './SearchStudentTable';
import 'antd/dist/antd.css';
import '../mainStyle/mainTable.scss';

const StudentTable = props => {
  const { push } = useHistory()
  const [form, setForm] = useState(false);

  useEffect(() => {
    props.getStudentTable();
  }, []);

  const studentData = props.studentList.sort((a, b) => {
    return b.id - a.id;
  });
 
  
  // registration_date: "2020-06-01T07:00:00.000Z" (How a students registration date looks)
  const studentStatus = studentData.map(student => {
    const regDate = new Date(student.registration_date)
    const month = regDate.getMonth();
    const currentMonth = new Date().getMonth()
    if(month <= currentMonth && !(month < currentMonth - 1)) {
      return {
        ...student,
        status: student.status ? [...student.status, 'new'] : ['new']
      }
    } else {
      return {
        ...student,
        status: []
      }
    }
  })

  const studentEnrolled = studentStatus.map(student => {
    if(student.enrolled === false) {
      return {
        ...student,
        status: [...student.status, 'unenrolled']
      }
    } else {
      return {
        ...student,
        status: [...student.status, 'enrolled']
      }
    }
  })

  const studentTableColumns = [
    {
      title: 'Student ID',
      dataIndex: 'student_id',
      key: 1,
    },
    {
      title: 'CPR',
      dataIndex: 'cpr',
      key: 2,
    },
    {
      title: 'First Name',
      dataIndex: 'first_name',
      key: 3,
    },
    {
      title: 'Additional Names',
      dataIndex: 'additional_names',
      key: 4,
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: status => (
        <>
          {status.map(tag => {
            let color;
            switch(tag) {
              case 'new':
                color = 'geekblue'
                break;
              case 'enrolled':
                color = 'green'
                break;
              case 'unenrolled':
                color = 'red'
                break;
              default:
                return null;
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 5,
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone_number',
      key: 6,
    },
  ];

  return (
    <div>
        <h2 style={{textAlign: "left", marginLeft: "1.3rem"}}>
          Student Table
        </h2>
      <div className='row-above'>
        <div>
          <SearchStundentTable />
        </div>
      </div>

      {props.isLoading ? (
        <Spin style={{ marginTop: '150px' }} size='large' />
      ) : (
        <Table
          className='rowHover'
          dataSource={studentEnrolled}
          columns={studentTableColumns}
          pagination={false}
          rowKey='id'
          onRow={(record, rowIndex) => {
            return {
              onClick: event => {
                push(`/dashboard/students/${record.student_id}`)
              },
            };
          }}
        />
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    isLoading: state.studentTableReducer.isLoading,
    studentList: state.studentTableReducer.studentList,
    error: state.studentTableReducer.error,
  };
};

export default withRouter(
  connect(mapStateToProps, { getStudentTable })(StudentTable)
);
