import '../../students/studentCard/studentTable.scss';

import {
  Button,
  Input,
  Modal,
  Spin,
  Table
} from 'antd';
import Icon from "@ant-design/icons"
import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getCourseTable } from '../../../../../actions';

const CourseSearchModule = props => {
  const filterInputField = useRef(null);
  useEffect(() => {
    props.getCourseTable();
  }, []);

  useEffect(
    () => {
      // updates the # students confirmed/unconfirmed when
      // student status as been changed
      if (props.studentStatusUpdated)
        props.getCourseTable();
    },
    [props.studentStatusUpdated]
  );

  const [setSearchText] = useState('');
  const [setSearchedColumn] = useState('');

  const handleSearch = (
    selectedKeys,
    confirm,
    dataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = clearFilters => {
    clearFilters();
    setSearchText('');
  };

  function getColumnSearchProps(
    dataIndex,
    placeholderText
  ) {
    return {
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters
      }) =>
        <div style={{ padding: 8 }}>
          <Input
            ref={node => (filterInputField.current = node)}
            placeholder={placeholderText}
            value={selectedKeys[0]}
            onChange={e =>
              setSelectedKeys(
                e.target.value ? [e.target.value] : []
              )}
            onPressEnter={() =>
              handleSearch(
                selectedKeys,
                confirm,
                dataIndex
              )}
            style={{
              width: 188,
              marginBottom: 8,
              display: 'block'
            }}
          />
          <Button
            type="primary"
            onClick={() =>
              handleSearch(
                selectedKeys,
                confirm,
                dataIndex
              )}
            icon="search"
            size="small"
            style={{ width: 90, marginRight: 8 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </div>,
      filterIcon: filtered =>
        <Icon
          type="search"
          style={{
            color: filtered ? '#1890ff' : undefined
          }}
        />,
      onFilter: (value, record) =>
        record[dataIndex]
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase()),
      onFilterDropdownVisibleChange: visible => {
        if (visible) {
          setTimeout(
            () => filterInputField.current.select(),
            10
          );
        }
      }
    };
  }

  const tableColumns = [
    {
      title: 'Course ID',
      dataIndex: 'course_id',
      key: 'course_id',
      ...getColumnSearchProps(
        'course_id',
        'Search Course ID'
      )
    },
    {
      title: 'Term',
      dataIndex: 'term',
      key: 'term',
      ...getColumnSearchProps('term', 'Search Term')
    },
    {
      title: 'Group Type',
      dataIndex: 'group_type',
      key: 'group_type',
      ...getColumnSearchProps(
        'group_type',
        'Search Group Type'
      )
    },
    {
      title: 'Level',
      dataIndex: 'level',
      key: 'level',
      ...getColumnSearchProps('level', 'Search Level')
    },
    {
      title: 'Section',
      dataIndex: 'section',
      key: 'section',
      ...getColumnSearchProps('section', 'Search Section')
    },
    {
      title: 'Course Type',
      dataIndex: 'course_type',
      key: 'course_type',
      ...getColumnSearchProps(
        'course_type',
        'Search Course Type'
      )
    },
    {
      title: 'Course Schedule',
      dataIndex: 'course_schedule',
      key: 'course_schedule',
      ...getColumnSearchProps(
        'course_schedule',
        'Search Course Schedule'
      )
    },
    {
      title: 'Start Time',
      dataIndex: 'start_time',
      key: 'start_time',
      ...getColumnSearchProps(
        'start_time',
        'Search Course Schedule'
      )
    },
    {
      title: 'End Time',
      dataIndex: 'end_time',
      key: 'end_time',
      ...getColumnSearchProps(
        'end_time',
        'Search Course Schedule'
      )
    },
    {
      title: 'Students',
      dataIndex: 'total_students',
      key: 'total_students'
    },
    {
      title: 'Confirmed',
      dataIndex: 'confirmed_students',
      key: 'confirmed_students'
    }
  ];

  const handleOk = () => {
    setTimeout(() => {
      props.setModalVisible({
        loading: false,
        visible: false
      });
    }, 10);
  };

  const handleCancel = () => {
    props.setModalVisible({ visible: false });
  };

  const courseData = (courses) => {
    const list = courses.sort((a, b) => {
      return b.id - a.id;
    });
    const courseList = list.map((course, index) => {
      return { ...course, key: index }
    })
    return courseList;
  }

  const rowSelection = {
    type: 'radio',
    onSelect: record => {
      props.setCourse(record);
    }
  };

  return (
    <div style={{ maxWidth: '100%' }}>
      {props.isLoading
        ? <Spin
            style={{ marginTop: '150px' }}
            size="large"
          />
        : <div>
            <Modal
              width="90%"
              title="Course Search"
              visible={props.modalVisible.visible}
              onOk={handleOk}
              onCancel={handleCancel}
              footer={[
                <Button key="back" onClick={handleCancel}>
                  Return
                </Button>,
                <Button
                  key="submit"
                  type="primary"
                  onClick={handleOk}
                >
                  Submit
                </Button>
              ]}
            >
              <Table
                style={{ MaxWidth: '99%', overflowX: 'scroll'  }}
                dataSource={courseData(props.courseList)}
                columns={tableColumns}
                pagination={true}
                rowSelection={rowSelection}
              />
            </Modal>
          </div>}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    isLoading: state.staffCourseReducer.isLoading,
    courseList: state.coursesTableReducer.courseList,
    studentStatusUpdated: state.studentByIdReducer.isEdited
  };
};

export default withRouter(
  connect(mapStateToProps, { getCourseTable })(
    CourseSearchModule
  )
);
