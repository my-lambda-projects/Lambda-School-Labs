import React from "react";
import moment from "moment";

import {
  TopNavContainer,
  TopNavHeader,
  TopNavHeaderText,
} from "../../styles/Calendar.js";
import { Icon } from "semantic-ui-react";

const CalendarTopNav = props => {
  const clickHandlerLeft = () => {
    props.changeDate(false);
  };
  const clickHandlerRight = () => {
    props.changeDate(true);
  };
  return (
    <TopNavContainer>
      <TopNavHeader>
        <Icon link onClick={clickHandlerLeft} name="angle double left" />
        <TopNavHeaderText>
          {`${moment(props.displayDate)
            .day(1)
            .format("MMMM D")} - 
        ${moment(props.displayDate)
          .day(7)
          .format("D, YYYY")}`}
        </TopNavHeaderText>
        <Icon link onClick={clickHandlerRight} name="angle double right" />
      </TopNavHeader>
    </TopNavContainer>
  );
};

export default CalendarTopNav;
