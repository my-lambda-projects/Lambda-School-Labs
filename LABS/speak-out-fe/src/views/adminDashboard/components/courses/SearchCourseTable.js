import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { filterCourseTable } from '../../../../actions';

const SearchCourseTable = props => {
  const handleSearchInput = e => {
    const searchTerm = e.target.value;
    props.filterCourseTable(searchTerm);
  };
  return (
    <>
      <input
        className='row-above-input'
        type='text'
        name='Search'
        placeholder='Search by ID, Term, Group Type, School Grade etc...'
        value={props.searchTerm}
        onChange={handleSearchInput}
      />
    </>
  );
};

const mapStateToProps = state => {
  return {
    searchTerm: state.coursesTableReducer.searchTerm,
  };
};

export default withRouter(
  connect(mapStateToProps, { filterCourseTable })(SearchCourseTable)
);
