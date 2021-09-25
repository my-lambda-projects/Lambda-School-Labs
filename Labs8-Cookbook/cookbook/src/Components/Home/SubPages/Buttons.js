import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


class Buttons extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  handleButtonClass = (button) => {
    if (this.props.type === button) {
      return 'button-selected'
    }
    return 'button-not-selected'
  }


  render() {
    return (
      <div className="recipe-buttons">
        <button 
          className={this.handleButtonClass('breakfast')}
          onClick={this.props.mealButtonHandler}
          name="breakfast">
          <FontAwesomeIcon className='icon' icon='coffee'/> breakfast
        </button>
        <button
          className={this.handleButtonClass('lunch')}
          onClick={this.props.mealButtonHandler}
          name="lunch">
          <span style={{fontFamily: 'burger-b', paddingRight: '3px'}}>b</span> lunch
        </button>
        <button
          className={this.handleButtonClass('dinner')}
          onClick={this.props.mealButtonHandler}
          name="dinner">
          <FontAwesomeIcon className='icon' icon='utensils'/> dinner
        </button>
        <button 
          className={this.handleButtonClass('snack')}
          onClick={this.props.mealButtonHandler}
          name="snack">
          <FontAwesomeIcon className='icon' icon='apple-alt'/> snack
        </button>
        <button 
          className={this.handleButtonClass('dessert')}
          onClick={this.props.mealButtonHandler}
          name="dessert">
          <FontAwesomeIcon className='icon' icon='cookie-bite'/> dessert
        </button>
      </div>
    )
  }
}

export default Buttons;