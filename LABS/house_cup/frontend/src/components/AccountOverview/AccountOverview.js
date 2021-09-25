import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserRoles } from '../../actions';
import './AccountOverview.css';
import SchoolInfoOverview from './components/SchoolInfoOverview/SchoolInfoOverview';

class AccountOverview extends Component {
  render() {
    return (
      <div className="Overview">
        <SchoolInfoOverview />
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = {
  getUserRoles,
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountOverview);
