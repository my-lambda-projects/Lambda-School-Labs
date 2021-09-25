import React from 'react';
import { Menu } from 'semantic-ui-react';
import ourColors from '../ColorScheme';

// This class display Tab to toggle between
// My own recipes and other people's recipes

class DisplayTab extends React.Component {
  state = { activeItem: 'Your Own' };

  handleItemClick = (e, { name, own }) => {
    this.setState({ activeItem: name });
    this.props.personalCheck(own);
  };

  render() {
    const { activeItem } = this.state;

    return (
      <Menu tabular className='tab2'>
        <Menu.Item
          name='Your Own'
          own
          active={activeItem === 'Your Own'}
          style={
            activeItem === 'Your Own'
              ? {
                  background: ourColors.formColor,
                  color: 'black'
                }
              : null
          }
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name='Other'
          active={activeItem === 'Other'}
          style={
            activeItem === 'Other'
              ? {
                  background: ourColors.formColor,
                  color: 'black'
                }
              : null
          }
          onClick={this.handleItemClick}
        />
      </Menu>
    );
  }
}

export default DisplayTab;
