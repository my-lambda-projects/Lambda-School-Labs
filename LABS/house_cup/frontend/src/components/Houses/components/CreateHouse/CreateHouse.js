import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SketchPicker } from 'react-color';
import { withRouter } from 'react-router-dom';
import { addHouse } from '../../../../actions';
import './CreateHouse.css';

class CreateHouse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayColorPicker: false,
      color: '#F17013',
      newHouseName: '',
      newHouseMascot: '',
    };
  }

  handleInput = async (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    await this.setState({
      [name]: value,
    });
  };

  handleClick = async () => {
    await this.setState({
      displayColorPicker: !this.state.displayColorPicker,
    });
  };

  handleClose = async () => {
    await this.setState({
      displayColorPicker: false,
    });
  };

  handleChange = async (color) => {
    await this.setState({
      color: color.hex,
    });
  };

  addHouse = async (e) => {
    e.preventDefault();
    const house = {
      name: this.state.newHouseName,
      color: this.state.color,
      mascot: this.state.newHouseMascot,
    };
    await this.props.addHouse(house, this.props.history);
    this.props.history.push('/houses');
  }

  render() {
    const styles = {
      popover: {
        position: 'absolute',
        zIndex: '2',
      },
    };
    return (
      <div className="CreateHouse">
        <form onSubmit={this.addHouse}>
          <h3 className="form__title">Add New House</h3>
          <div className="CreateHouse__row">
            <div className="CreateHouse__input">
              <label htmlFor="CreateHouse__Name">House Name</label>
              <input
                id="CreateHouse__Name"
                type="text"
                name="newHouseName"
                onChange={this.handleInput}
                placeholder="Name"
              />
            </div>
          </div>
          <div className="CreateHouse__row">
            <div className="CreateHouse__input">
              <label htmlFor="CreateHouse__Mascot">Mascot</label>
              <input
                id="CreateHouse__Mascot"
                type="text"
                name="newHouseMascot"
                onChange={this.handleInput}
                placeholder="Mascot"
              />
            </div>
            <div className="CreateHouse__input CreateHouse__input--color">
              <label htmlFor="CreateHouse__Color">Color</label>
              <div 
                id="CreateHouse__Color"
                className="Swatch"
                onClick={this.handleClick}
                data-updating="true"
              >
                <div className="Swatch__color" style={{ background: this.state.color }} />
              </div>
              {
                this.state.displayColorPicker ? (
                  <div style={styles.popover}>
                    <div className="cover" onClick={this.handleClose} />
                    <SketchPicker
                      color={this.state.color}
                      onChange={this.handleChange}
                    />
                  </div>
                ) : null
              }
            </div>
          </div>
          <button>Add House</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    houses: state.houses,
  };
};

export default withRouter(connect(mapStateToProps, { addHouse })(CreateHouse));
