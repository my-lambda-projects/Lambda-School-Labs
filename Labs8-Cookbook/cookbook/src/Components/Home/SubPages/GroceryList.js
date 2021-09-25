import React, { Component } from "react";
import Loading from "../../SubComponents/Loading.js";
import DayPicker, { DateUtils } from "react-day-picker";
import { graphql } from "react-apollo";
import { GET_RECIPES_QUERY } from "./Recipes";
import GroceryItem from "../../SubComponents/GroceryItem";
import * as math from "mathjs";
import GatedSubscription from "../../SubComponents/GatedSubscription";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { toastMessage } from "../../../utils/toastify";

class GroceryList extends Component {
  static defaultProps = {
    numberOfMonths: 1
  };
  constructor(props) {
    super(props);
    this.state = {
      from: undefined,
      to: undefined,
      groceryList: [],
      groceryListTo: "",
      groceryListFrom: "",
      scheduledMeals: []
    };
  }

  getInitialState() {
    return {
      from: undefined,
      to: undefined
    };
  }

  handleDayClick = (day, { disabled }) => {
    if (disabled) {
      return toastMessage("error", "Cannot select past dates");
    }
    const range = DateUtils.addDayToRange(day, this.state);
    this.setState(range);
  };

  handleResetClick = () => {
    this.setState(this.getInitialState());
  };

  handleItemClick = index => {
    let updatedList = this.state.groceryList.slice();
    updatedList[index].isCompleted = !updatedList[index].isCompleted;
    this.setState({ groceryList: updatedList });
  };

  generateList = () => {
    if (this.props.data.loading) {
      return <Loading></Loading>;
    }

    //temporaryholder for scheduled recipes
    let recipeNames = [];

    if (this.props.data.recipes && this.props.data.recipes.length) {
      const ingredients = [];
      // loop through all of the user's recipes
      this.props.data.recipes.forEach(recipe =>
        //loop through all of the events for each recipe
        recipe.events.forEach(event => {
          //convert the date strings to date objects for later comparisons
          let eventDate = new Date(event.date);
          let startDate = new Date(this.state.from);
          let stopDate = new Date(this.state.to);

          //if the event's date lies between the chosen start and stop date
          // map through each ingredient and show the quantity and name
          if (eventDate >= startDate && eventDate <= stopDate) {
            recipe.ingredients.forEach(ingredient => {
              if (ingredient.name in ingredients) {
                const curQuantity = ingredients[ingredient.name];
                const newQuantity = ingredient.quantity;
                const totalQuantity = math
                  .add(math.fraction(curQuantity), math.fraction(newQuantity))
                  .toFraction(true);
                ingredients[ingredient.name] = totalQuantity;
              } else {
                ingredients[ingredient.name] = ingredient.quantity;
              }
            });
            // adds each scheduled recipe that meets criteria into an array
            recipeNames.push(recipe);
          }
        })
      );

      const ingredient_list = Object.keys(ingredients).map(i => {
        return {
          id: i.id,
          name: i,
          quantity: ingredients[i],
          isCompleted: false
        };
      });

      this.setState({ groceryList: ingredient_list });
      // set state to be used for grocery list display date rage
      this.setState({
        groceryListTo: this.state.to,
        groceryListFrom: this.state.from
      });
      //add schedules recipes to state
      this.setState({ scheduledMeals: recipeNames });
    }
    return null;
  };

  render() {
    const { from, to } = this.state;
    const modifiers = { start: from, end: to };
    // maps through each item in the grovcery list & error checking if GL has no values
    const grocery_list = this.state.groceryList.length ? (
      <div className="item-list">
        {this.state.groceryList.map((i, idx) => (
          <GroceryItem
            key={idx}
            index={idx}
            ingredient={i}
            handleItemClick={this.handleItemClick}
          />
        ))}
      </div>
    ) : (
      <div className="no-list-text">
        Oh no! It looks like there are no meals scheduled for these dates.
        Please refer to your{" "}
        <Link className="link" to="/home/calendar">
          calendar
        </Link>{" "}
        if you would like to reschedule any of your current meals, or check out
        your{" "}
        <Link className="link" to="/home/recipes">
          recipe database
        </Link>{" "}
        to add more meals to your schedule.
      </div>
    );
    // displays text in header if no grocery list has been generated yet
    const groceryDateRange = this.state.groceryListTo ? (
      <div>
        {this.state.groceryListFrom.toLocaleDateString()} -{" "}
        {this.state.groceryListTo.toLocaleDateString()}
      </div>
    ) : (
      <div>No grocery list generated yet.</div>
    );

    // shows grocery list items header if there are items in the list
    const groceryListHeader = this.state.groceryList.length ? (
      <span className="grocery-header">Grocery List:</span>
    ) : null;

    return (
      <GatedSubscription>
        <div className="grocery-list-page">
          <Helmet>
            <title>GroceryList | COOKBOOK</title>
          </Helmet>
          <div className="gen-list-container">
            <p className="reset-gen-buttons">
              <span className="text">
                {!from && !to && "Please select the first day."}
                {from && !to && "Please select the last day."}
                {from &&
                  to &&
                  `Schedule for ${from.toLocaleDateString()} to
                        ${to.toLocaleDateString()}`}{" "}
              </span>
              {from &&
                to && (
                  <button className="reset" onClick={this.handleResetClick}>
                    Reset
                  </button>
                )}
              <button onClick={this.generateList} className="generate">
                Generate List
              </button>
            </p>
            <DayPicker
              id="grocery-list-calendar"
              numberOfMonths={this.props.numberOfMonths}
              selectedDays={[from, { from, to }]}
              modifiers={modifiers}
              onDayClick={this.handleDayClick}
              disabledDays={{ before: new Date() }}
            />
          </div>
          <div className="list">
            <div className="list-header">{groceryDateRange}</div>
            {groceryListHeader}
            <div className="scroll-container">
              {/* {schedMealsHeader}
              {scheduledMeals} */}
              {grocery_list}
            </div>
          </div>
        </div>
      </GatedSubscription>
    );
  }
}

export default graphql(GET_RECIPES_QUERY)(GroceryList);
