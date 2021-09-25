import React from "react";

import Month from "./test_pages/Month.js"

class Calendar extends Component {

  render() {
    return(
      <div classname="container">
      <header>
        <div id="logo">
          <span className="icon">date_range</span>
          <span>
            Shift<b>EZ</b>
          </span>
        </div>
        </header>
        <main>
          <Month/>
        </main>
      </div>
    )
  }
}

export default Calendar;