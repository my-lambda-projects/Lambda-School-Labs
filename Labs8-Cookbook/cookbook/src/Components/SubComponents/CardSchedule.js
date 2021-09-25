import React, { Component } from "react";
import Modal from "./Modal";
import DatePicker from "./DatePicker";
import Buttons from "../Home/SubPages/Buttons";
import { graphql } from "react-apollo";
import {
  QUERY_RECIPE_EVENT,
  CREATE_EVENT_MUTATION
} from "../Home/SubPages/Calendar";
import { GET_RECIPES_QUERY } from "../Home/SubPages/Recipes";
import { toastMessage } from "../../utils/toastify";

//sort the events in ascending order by date
let sortEvents = events => {
  let sortedEvents = events;
  sortedEvents.sort(function(a, b) {
    let dateA = new Date(a.date);
    let dateB = new Date(b.date);

    if (dateA < dateB) return -1;
    else if (dateA === dateB) return 0;
    else return 1;
  });
  return sortedEvents;
};

let findSoonestEvent = sortedEvents => {
  //get today's date and set the time to the start of the day
  let now = new Date();
  now.setHours(0, 0, 0, 0);

  //all the events that are scheduled for today or after
  let futureEvents = sortedEvents.filter(function(event) {
    return new Date(event.date) - now >= 0;
  });

  //all the events that are scheduled for before today
  let pastEvents = sortedEvents.filter(function(event) {
    return new Date(event.date) - now < 0;
  });

  //return the index of the first event with date on or after today.
  //if there are none, return the index of event with closest date in the past
  if (futureEvents.length > 0) {
    let index = sortedEvents.indexOf(futureEvents[0]);
    return index;
  } else if (pastEvents.length > 0) {
    let index = sortedEvents.indexOf(pastEvents[pastEvents.length - 1]);
    return index;
  } else return -1;
};

class CardSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortedEvents: null,
      currentEventIndex: -1,
      showModal: false,
      onDates: [],
      type: ""
    };
  }

  componentDidMount() {
    let sortedEvents = sortEvents(this.props.events);
    this.setState({ sortedEvents });
    this.setState({ currentEventIndex: findSoonestEvent(sortedEvents) });
  }

  toggleModal = () => {
    this.setState({
      showModal: !this.state.showModal,
      type: ""
    });
  };

  handlePickDate = dates => {
    this.setState({ onDates: dates });
  };

  mealButtonHandler = e => {
    e.preventDefault();
    if (this.state.type === e.target.name) {
      this.setState({ type: "" });
    } else {
      this.setState({ type: e.target.name });
    }
  };

  onSave = async () => {
    //If no recipe title scraped, then save button won't work.
    if (!(this.state.type && this.state.onDates.length)) {
      return toastMessage("error", "Please select both meal type and dates");
    }

    let events = [];

    this.state.onDates.forEach(i => {
      const event = {
        date: i,
        mealType: this.state.type,
        recipe: this.props.recipeId
      };
      events.push(event);
    });

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
      toastMessage("error", "There was an error! Failed to update meal.");
    }
  };

  handleEventScroll = amount => {
    if (
      amount > 0 &&
      this.state.currentEventIndex < this.state.sortedEvents.length - 1
    ) {
      this.setState({
        currentEventIndex: this.state.currentEventIndex + amount
      });
    } else if (amount < 0 && this.state.currentEventIndex > 0) {
      this.setState({
        currentEventIndex: this.state.currentEventIndex + amount
      });
    }
  };

  handleScrollClass = direction => {
    if (this.state.currentEventIndex < 0) return "scroll-hidden";
    if (direction === "right") {
      if (this.state.currentEventIndex < this.state.sortedEvents.length - 1)
        return "scroll-right";
      else return "scroll-hidden";
    }
    if (direction === "left") {
      if (this.state.currentEventIndex > 0) return "scroll-left";
      else return `scroll-hidden`;
    }
  };

  render() {
    return (
      <React.Fragment>
        <span>scheduled for</span>
        <div className="event-scroller">
          <div
            className={this.handleScrollClass("left")}
            onClick={() => this.handleEventScroll(-1)}
          >
            <div className='left-arrow'></div>
          </div>

          <div className="event" onClick={this.toggleModal}>
            <div className="meal">
              {this.state.currentEventIndex >= 0
                ? this.state.sortedEvents[this.state.currentEventIndex].mealType
                : "no events"}
            </div>
            <div className="date">
              {this.state.currentEventIndex >= 0
                ? new Date(
                    this.state.sortedEvents[this.state.currentEventIndex].date
                  ).toLocaleDateString()
                : "scheduled"}
            </div>
          </div>

          <div className={this.handleScrollClass("right")} onClick={() => this.handleEventScroll(1)}>
            <div className='right-arrow'></div>
          </div>
        </div>
        <div>
          {this.state.showModal ? ( // portal ternary statement to turn on/off
            <Modal onClose={this.toggleModal}>
              <div
                className="modal-container"
                style={{
                  maxWidth: 400,
                  position: "relative",
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column"
                }}
              >
                {!this.state.isUpdated ? (
                  <div className="modal-sub-container">
                    <h1 className="modal-text">Please select Meal and Date!</h1>
                    <Buttons
                      mealButtonHandler={this.mealButtonHandler}
                      type={this.state.type}
                    />
                    <div className="modal-date-picker">
                      <DatePicker handlePickDate={this.handlePickDate} />
                    </div>
                    <button
                      className="modal-button"
                      onClick={this.onSave}
                      name="save-btn"
                    >
                      Save
                    </button>
                    <button className="modal-button" onClick={this.toggleModal}>
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="modal-confirmation">
                    <p className="modal-text-confirmation">
                      {this.state.message}
                    </p>
                    <button className="modal-button" onClick={this.toggleModal}>
                      Close
                    </button>
                  </div>
                )}
              </div>
            </Modal>
          ) : null}
        </div>
      </React.Fragment>
    );
  }
}

export default graphql(CREATE_EVENT_MUTATION, { name: "createEvent" })(
  CardSchedule
);
