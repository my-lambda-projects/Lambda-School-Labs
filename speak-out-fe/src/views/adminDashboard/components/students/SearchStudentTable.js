import React from 'react';
import { connect } from 'react-redux';
import { withRouter} from 'react-router-dom';
import { filterStudentTable } from '../../../../actions';

const SearchStundentTable = props => {
  
    const handleSearchInput = (e) => {
        const searchTerm = e.target.value;
        props.filterStudentTable(searchTerm)
      
      }
    return (
        <>
            <input
              className="row-above-input"
              type="text"
              name="Search"
              placeholder="Search by ID, name, cpr, etc..."
              value={props.searchTerm}
              onChange={handleSearchInput}
          />
        </>
    )
}

const mapStateToProps = state => {
    return {
      searchTerm: state.studentTableReducer.searchTerm
    };
  };
  
  export default withRouter(
    connect(
      mapStateToProps,
      { filterStudentTable }
    )(SearchStundentTable)
  )