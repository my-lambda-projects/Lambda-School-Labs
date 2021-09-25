import React, { Component } from "react";
import moment from "moment";
import BigCalendar from "react-big-calendar";
import gql from "graphql-tag";
import { Query, graphql, compose } from "react-apollo";
import Modal from "../../SubComponents/Modal";
import DatePicker from "../../SubComponents/DatePicker.js";
import Buttons from "./Buttons";
import Loading from "../../SubComponents/Loading.js";
import { GET_RECIPES_QUERY } from "./Recipes";
import { Helmet } from "react-helmet";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { toastMessage } from "../../../utils/toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const propTypes = {};

// mutation from prisma/gql to persist DELETE functionality to backend

const DELETE_EVENT_MUTATION = gql`
  mutation($where: EventWhereUniqueInput!) {
    deleteEvent(where: $where) {
      id
      mealType
      date
    }
  }
`;

// query from prisma/gql to GET data from backend

const QUERY_RECIPE_EVENT = gql`
  query {
    events {
      id
      date
      mealType
      recipe {
        id
        title
      }
    }
  }
`;

// mutation from prisma/gql to POST/UPDATE data from here to backend

const CREATE_EVENT_MUTATION = gql`
  mutation($date: String!, $mealType: String!, $recipe: String!) {
    createEvent(date: $date, mealType: $mealType, recipe: $recipe) {
      id
      mealType
      date
      recipe {
        id
        title
      }
    }
  }
`;

const localizer = BigCalendar.momentLocalizer(moment); // a localizer for BigCalendar - gets current local time in realtime

class RecipeCalendar extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      currentEvent: {},
      type: "",
      showModal: false,
      onDates: [],
      search: "",
      filter: new Set([])
    };
  }

  handlePickDate = dates => {
    this.setState({ onDates: dates }); // updates current date to new selected date
  };

  toggleModal = event => {
    this.setState({
      showModal: !this.state.showModal, // changes the current event to new selected event
      currentEvent: event
    });
  };

  mealButtonHandler = e => {
    e.preventDefault();
    if (this.state.type === e.target.name) {
      // changes the current type of meal of event based on the target name of the button that is click ex; 'Lunch'
      this.setState({ type: "" });
    } else {
      this.setState({ type: e.target.name });
    }
  };

  handleSearch = e => {
    this.setState({ [e.target.name]: e.target.value }); // search function that updates based on value of each key input
  };

  handleFilter = meal => {
    let newFilter = new Set(this.state.filter);
    if (newFilter.has(meal)) newFilter.delete(meal);
    else newFilter.add(meal);

    this.setState({ filter: newFilter });
  };

  filterButtonClassName = meal => {
    return this.state.filter.has(meal)
      ? "button-selected"
      : "button-not-selected";
  };

  deleteHandler = async () => {
    try {
      await this.props.deleteEvent({
        variables: { where: { id: this.state.currentEvent.id } },
        refetchQueries: [
          { query: QUERY_RECIPE_EVENT },
          { query: GET_RECIPES_QUERY }
        ]
      });
      toastMessage("success", "Deleted meal succesfully!");
    } catch (error) {
      console.log(error.message);
      toastMessage("error", "There was an error! Failed to delete meal.");
    }
  };

  onEventSave = () => {
    // save function within Modal, gets the data from event onClick and saves based on onEventSave onclick, data that is updated can include meal type and date
    if (this.state.onDates.length || this.state.type) {
      let events = [];
      if (!this.state.onDates.length) {
        events.push({
          date: this.state.currentEvent.start,
          mealType: this.state.type
        });
      } else {
        this.state.onDates.forEach(i => {
          const event = {
            date: i,
            mealType: this.state.type || this.state.currentEvent.resource,
            recipe: this.state.currentEvent.recipeId
          };
          events.push(event);
        });
      }

      try {
        events.forEach(async (data, index) => {
          if (index === events.length - 1) {
            await this.props.createEvent({
              variables: data,
              refetchQueries: [
                { query: QUERY_RECIPE_EVENT },
                { query: GET_RECIPES_QUERY }
              ]
            });
          } else {
            await this.props.createEvent({
              variables: data
            });
          }
        });
        toastMessage("success", "Updated meal succesfully!");
      } catch (error) {
        console.log("onSave error: ", error.message);
        toastMessage("error", "There was an error! Failed to update meal");
      }
    } else {
      toastMessage("error", "Please select meal and date");
    }
  };

  getDates = () => {
    let dates = [];
    for (let i = 7; i >= 2; i--) {
      dates.push(
        new Date(
          moment()
            .subtract(i, "days")
            .startOf("day")
        )
      );
    }
    const yesterday = new Date(
      moment()
        .subtract(1, "days")
        .endOf("day")
    );
    dates.push(yesterday);
    return dates;
  };

  duplicateMeals = searchedEvents => {
    try {
      //Get dates from last week
      const lastWeekDates = this.getDates();
      const from = lastWeekDates[0];
      const to = lastWeekDates[lastWeekDates.length - 1];

      const lastWeekEvents = searchedEvents.filter(
        event => new Date(event.date) >= from && new Date(event.date) <= to
      );

      lastWeekEvents.forEach(async event => {
        const eventVariables = {
          mealType: event.mealType,
          date: moment(event.date)
            .add(7, "d")
            .toISOString(),
          recipe: event.recipe.id
        };

        await this.props.createEvent({
          variables: eventVariables,
          refetchQueries: [{ query: QUERY_RECIPE_EVENT }]
        });
      });

      toastMessage("success", "Duplicated meals successfullly!");
    } catch (error) {
      toastMessage("error", "There was an error! Failed to duplicate meal");
    }
  };

  render() {
    return (
      // calling the query from gql, passes data from backend to front-end
      <Query query={QUERY_RECIPE_EVENT}>
        {({ loading, error, data }) => {
          if (loading) return <Loading />;
          if (error) return <div>Error</div>;

          // search function to filter events based on title name, not case sensitive
          let searchedEvents = data.events.filter(event => {
            return (
              event.recipe.title
                .toLowerCase()
                .indexOf(this.state.search.toLowerCase()) !== -1 &&
              ((this.state.filter.size &&
                this.state.filter.has(event.mealType)) ||
                !this.state.filter.size)
            );
          });

          // mapping out data to be rendered to screen
          const events = searchedEvents.map(event => {
            return {
              id: event.id,
              start: event.date,
              end: event.date,
              resource: event.mealType,
              title: event.recipe.title,
              recipeId: event.recipe.id
            };
          });
          return (
            <div className="calendar-page-container">
              <Helmet>
                <title>Calendar | COOKBOOK</title>
              </Helmet>
              <div className="calendar-container">
                <div className="search-filter-bar">
                  <div className="search-input">
                    <input
                      type="text"
                      name="search"
                      placeholder="search"
                      className="recipes-search"
                      onChange={this.handleSearch}
                      value={this.state.search}
                    />
                    <span className="searchicon" />
                  </div>
                  <div className="recipesFilterContainer">
                    <button
                      className={this.filterButtonClassName("breakfast")}
                      onClick={() => this.handleFilter("breakfast")}
                    >
                      <FontAwesomeIcon icon="coffee" /> breakfast
                    </button>
                    <button
                      className={this.filterButtonClassName("lunch")}
                      onClick={() => this.handleFilter("lunch")}
                    >
                      <span style={{ fontFamily: "burger-b" }}>b</span> lunch
                    </button>
                    <button
                      className={this.filterButtonClassName("dinner")}
                      onClick={() => this.handleFilter("dinner")}
                    >
                      <FontAwesomeIcon icon="utensils" /> dinner
                    </button>
                    <button
                      className={this.filterButtonClassName("snack")}
                      onClick={() => this.handleFilter("snack")}
                    >
                      <FontAwesomeIcon icon="apple-alt" /> snack
                    </button>
                    <button
                      className={this.filterButtonClassName("dessert")}
                      onClick={() => this.handleFilter("dessert")}
                    >
                      <FontAwesomeIcon icon="cookie-bite" /> dessert
                    </button>
                  </div>
                </div>
                <div className="btn-wrapper">
                  <button
                    className="duplicate-btn"
                    onClick={() => this.duplicateMeals(searchedEvents)}
                  >
                    Duplicate last 7 days
                  </button>
                </div>
                <BigCalendar // react-calendar that passes data from backend as event
                  selectable
                  popup
                  localizer={localizer}
                  defaultDate={new Date()}
                  defaultView="month"
                  onSelectEvent={event => this.toggleModal(event)}
                  events={events}
                  style={{ height: "100vh" }}
                  views={{ month: true }}
                />
              </div>
              <div>
                {this.state.showModal ? ( // portal ternary statement to turn on/off
                  <Modal onClose={this.toggleModal}>
                    <div // inline styling for modal
                      className="modal-container"
                      style={{
                        maxWidth: 400,
                        position: "relative",
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column"
                      }}
                    >
                      {!this.state.isUpdated ? ( // modal on
                        <div className="modal-sub-container">
                          <h1 className="modal-text">
                            Please select Meal and Date!
                          </h1>
                          <Buttons
                            mealButtonHandler={this.mealButtonHandler}
                            type={this.state.type}
                          />
                          <div className="modal-date-picker">
                            <DatePicker handlePickDate={this.handlePickDate} />
                          </div>
                          <button
                            className="modal-button"
                            onClick={this.onEventSave}
                            name="save-btn"
                          >
                            Save
                          </button>
                          <button
                            className="modal-button"
                            onClick={this.toggleModal}
                          >
                            Cancel
                          </button>
                          <button
                            className="modal-button"
                            onClick={this.deleteHandler}
                          >
                            Delete
                          </button>
                        </div>
                      ) : (
                        <div className="modal-confirmation">
                          <p className="modal-text-confirmation">
                            {this.state.message}
                          </p>
                          <button
                            className="modal-button"
                            onClick={this.toggleModal}
                          >
                            Close
                          </button>
                        </div>
                      )}
                    </div>
                  </Modal>
                ) : null}
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

RecipeCalendar.propTypes = propTypes;

const createEventMutation = graphql(CREATE_EVENT_MUTATION, {
  name: "createEvent"
});

const deleteEventMutation = graphql(DELETE_EVENT_MUTATION, {
  name: "deleteEvent"
});

export default compose(
  createEventMutation,
  deleteEventMutation
)(RecipeCalendar);
export { QUERY_RECIPE_EVENT, CREATE_EVENT_MUTATION };
