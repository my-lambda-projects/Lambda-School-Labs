/* eslint-disable */

import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { getCard } from '../actions';
import Breadcrumbs from './breadcrumbs';

class Card extends Component {
  componentDidMount() {
    this.props.getCard(this.props.match.params.id);
  }

  render() {
    const id = this.props.match.params.id;

    if (!this.props.card) {
      return <h2>Loading Card...</h2>;
    }
    return (
      <div>
        <div className="card">
          <Breadcrumbs props={this.props.match.url} />
          <h3>Details for {this.props.card.title}</h3>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    card: state.card
  }
}

export default withRouter(connect(mapStateToProps, { getCard })(Card));
