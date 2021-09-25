import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Glyphicon } from 'react-bootstrap';
import { SketchPicker } from 'react-color';
import { deleteHouse, updateHouse } from '../../../../actions';

class House extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.house._id,
      name: props.house.name,
      color: props.house.color,
      mascot: props.house.mascot,
      isUpdating: false,
      displayColorPicker: false,
    };
    console.warn('css selector :nth-child() is not working on .Table__row :: because of an extra <div />');
  }

  async componentWillMount(props) {
    const {
      id, name, mascot, color,
    } = this.state;
    await this.setState({
      id,
      name,
      color,
      mascot,
    });
  }

  toggleUpdateMode = async () => {
    await this.setState({
      isUpdating: !this.state.isUpdating,
    });
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

  deleteHouse = async () => {
    await this.props.deleteHouse(this.state.id, this.props.history);
  }
  
  updateHouse = async (e) => {
    e.preventDefault();
    await this.props.updateHouse(this.state, this.props.history);
    this.toggleUpdateMode(e);
  }

  render() {
    const updating = this.state.isUpdating;
    const styles = {
      popover: {
        position: 'absolute',
        zIndex: '2',
      },
    };
    return (
      <div>
        {updating ? (
          <form
            className="Table__row" 
            style={{ paddingLeft: 0 }}
            onSubmit={(e) => this.updateHouse(e)}
          >
            <input
              className="Table__column"
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleInput}
            />
            <div 
              className="Table__column Table__column--color-swatch Swatch"
              data-updating={updating}
              onClick={this.handleClick}
            >
              <div className="Swatch__color" style={{ background: this.state.color }} />
            </div>
            {this.state.displayColorPicker ? (
              <div style={styles.popover}>
                <div className="cover" onClick={this.handleClose} />
                <SketchPicker
                  color={this.state.color}
                  onChange={this.handleChange}
                />
              </div>
            ) : null}
            <input
              className="Table__column"
              type="text"
              name="mascot"
              value={this.state.mascot}
              onChange={this.handleInput}
            />
            <button className="Table__column Table__column--action Table__column--action-confirm">
              Update
            </button>
          </form>
        )
        : (
          <div className="Table__row" >
            <div className="Table__column">
              {this.state.name}
            </div>
            <div className="Table__column Table__column--color-swatch Swatch">
              <div className="Swatch__color" style={{ background: this.state.color }} />
            </div>
            <div className="Table__column">
              {this.state.mascot}
            </div>
            <div
              className="Table__column Table__column--action Table__column--action-edit"
              onClick={this.toggleUpdateMode}
            >
              <Glyphicon glyph="pencil" />
            </div>
            <div
              className="Table__column Table__column--action  Table__column--action-delete"              
              onClick={this.deleteHouse}
            >
              <Glyphicon glyph="trash"/>
            </div>
          </div>)
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default withRouter(connect(mapStateToProps, { deleteHouse, updateHouse })(House));

