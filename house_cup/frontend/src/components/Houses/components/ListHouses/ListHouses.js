import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getHousesBySchool } from '../../../../actions';

import House from '../House/House';
import './ListHouses.css';

class ListHouses extends Component {

  constructor(props) {
    super(props);
    this.state = {
      houses: props.houses,
    };
  }

  async componentWillMount() {
    await this.props.getHousesBySchool(this.props.history);
  }

  async componentWillReceiveProps(props) {
    await this.setState({
      houses: [...props.houses],
    });
  }

  render() {
    return (
      <div className="ListHouses Table">
        <h3 className="table__title">Created Houses</h3>
        <div className="Table__row Table__row--head" >
          <div className="Table__column">House Name</div>
          <div className="Table__column Table__column--color-swatch">Color</div>
          <div className="Table__column">Mascot</div>
          <div className="Table__column Table__column--action" />
          <div className="Table__column Table__column--action" />
        </div>
        {
          this.state.houses.map((house) => {
            return (
              <House
                key={house._id}
                house={house}
              />
            );
          })
        }
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return state;
};

export default withRouter(connect(mapStateToProps, { getHousesBySchool })(ListHouses));
