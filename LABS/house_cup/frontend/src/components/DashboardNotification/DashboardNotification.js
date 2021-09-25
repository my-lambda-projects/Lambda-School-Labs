import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DashboardNotification.css';

class DashboardNotification extends Component {

  constructor(props) {
    super(props);
    this.state = {
      type: props.type || 'info',
      title: props.title || null,
    };
  }

  render() {
    return (
      <div className="DashboardNotification" data-type={this.state.type}>
        {
          (this.state.title !== null)
            ? <div className="DashboardNotification__title">{this.state.title}</div>
            : null
        }
        <div className="DashboardNotification__message">
          { this.props.children }
        </div>
      </div>
    );
  }

}

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardNotification);
