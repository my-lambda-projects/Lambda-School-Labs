import React from "react";

class AddToCalendar extends React.Component {
  handleClick() {
    let title = "Invoice Due";
    let address = "User Address";
    let url = [
      "https://www.google.com/calendar/render",
      "?action=TEMPLATE",
      "&text=" + (title || ""),
      //date defaults to today's date
      "&details=Invoice Details",
      "&location=" + address,
      "&sprop=&sprop=name:"
    ].join("");

    window.open(url, "sharer", "toolbar=0,status=0,width=748,height=725");
  }

  render() {
    return (
      <button className="button" onClick={this.handleClick.bind(this)}>
        + Click to add to your Google Calendar
      </button>
    );
  }
}

export default AddToCalendar;
