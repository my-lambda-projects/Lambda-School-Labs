import React from 'react';
import moment from 'moment-timezone';
const currentTimeZone = moment.tz.guess();

export function timeConverter(time) {
  const changedTime = new Date(
    `1988-01-01T${time}Z`
  ).toLocaleTimeString(
    {},
    {
      timeZone: 'UTC',
      hour12: true,
      hour: 'numeric',
      minute: 'numeric'
    }
  );
  return changedTime;
}

export function dateConverter(date) {

  let changedDate = moment
    .tz(date, currentTimeZone)
    // .add(1, 'd')
    .format('DD/MM/YYYY');

  return changedDate;
}
export function createDropdown (options) {
  return options.map(opt => {
    return(
      <option value={opt.value}>{opt.label}</option>
    )
  })
}

// used by StudentInformationTab
export function getDateStringENGBFormat(date) {
  let options = { year: 'numeric', month: 'numeric', day: 'numeric' };
  return new Date(date).toLocaleDateString('en-GB', options);
}

export function booleanToYesNo(booleanValue) {
  return booleanValue ? "Yes" : "No";
}

export function yesNoToBoolean(text) {
  return text === "Yes";
}

// scroll to top to page
// add to onClick when you need the top of a React component to be visible
export function scrollToTop() {
  window.scrollTo(0, 0);
}
