import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { filterStaffTable } from '../../../../actions';

const SearchStaffTable = props => {
  const handleSearchInput = e => {
    const searchTerm = e.target.value;
    props.filterStaffTable(searchTerm);
  };
  return (
    <>
      <input
        className='row-above-input'
        type='text'
        name='Search'
        placeholder='Search by ID, Staff name, Phone number etc...'
        value={props.searchTerm}
        onChange={handleSearchInput}
      />
    </>
  );
};

const mapStateToProps = state => {
  return {
    searchTerm: state.staffTableReducer.searchTerm,
  };
};

export default withRouter(
  connect(mapStateToProps, { filterStaffTable })(SearchStaffTable)
);
