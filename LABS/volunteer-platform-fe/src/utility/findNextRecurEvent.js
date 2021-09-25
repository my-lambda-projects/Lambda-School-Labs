import moment from 'moment';
import { findNextCustom } from './findNextCustom';
import { findNthWeek } from './findNthWeek';

const eventPassed = date => {
  return moment().unix() - date > 0;
};

export const findNext = (date, keyWord, info = {}) => {
  switch (keyWord) {
    case 'Other':
      return findNextCustom(date, info);
    case 'Daily':
      return date.add(1, 'days');
    case 'Weekly':
      let dayAbbrevs = {
        Sun: 0,
        Mon: 1,
        Tue: 2,
        Wed: 3,
        Thu: 4,
        Fri: 5,
        Sat: 6,
      };
      let weekdayOfEvent = dayAbbrevs[info.repeatTimePeriod.split(' ')[2]];
      return date.day(weekdayOfEvent + 7);
    case 'Monthly':
      return findNthWeek(date.add(1, 'month'), info);
    case 'Annually':
      return date.add(1, 'year');
    case 'Weekdays':
      let dayOfWeek = date.day();
      if (dayOfWeek === 5 || dayOfWeek === 6) {
        return date.day(8);
      } else {
        return date.add(1, 'days');
      }
    case 'Weekends': //Fri, Sat, Sun
      return date.day() < 5 ? date.day(5) : date.add(1, 'day');
    case 'Sat/Sun':
      return date.day() < 6 ? date.day(6) : date.add(1, 'day');
  }
};

const findEndDate = (info, arr) => {
  let endDate = info.occurrenceEndDate || '';
  let ends = info.occurrenceEnds || ''; //'On', 'Never', 'After'
  let endsAfter = info.occurrenceEndsAfter || ''; //Number of events

  switch (ends) {
    case 'On':
      return { maxDate: moment.unix(endDate), maxEvents: 8 - arr.length };
    case 'Never':
    case '':
      return { maxDate: moment().add(3, 'months'), maxEvents: 8 - arr.length };
    case 'After':
      if (arr.length > endsAfter) {
        return false;
      } else {
        return {
          maxDate: moment().add(3, 'months'),
          maxEvents: endsAfter - arr.length,
        };
      }
  }
};

export const findNextEvents = event => {
  let dayAbbrevs = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  let keyWord = event.recurringInfo.repeatTimePeriod.split(' ')[0];
  event.registeredVolunteers = event.registeredVolunteers || {};
  let arrayOfDates = event.registeredVolunteers
    ? [...Object.keys(event.registeredVolunteers)].sort()
    : [];
  let eventDay =
    arrayOfDates.length > 0
      ? findNext(
          moment.unix(arrayOfDates[arrayOfDates.length - 1]),
          keyWord,
          event.recurringInfo
        )
      : moment.unix(event.startTimeStamp);
  let passed = eventPassed(eventDay.unix());
  let days = {
    Weekends: [0, 5, 6],
    'Sat/Sun': [0, 6],
    Other: (event.recurringInfo.days || []).map(day => dayAbbrevs[day]),
  };

  let isGood = true;
  if (keyWord === 'Weekends' || keyWord === 'Sat/Sun') {
    isGood = days[keyWord].includes(eventDay.day());
  }

  if (
    keyWord === 'Other' &&
    event.recurringInfo.repeatEveryValue.includes('Week')
  ) {
    isGood = days[keyWord].includes(eventDay.day());
  }

  while (passed || !isGood) {
    eventDay = findNext(eventDay, keyWord, event.recurringInfo);
    passed = eventPassed(eventDay.unix());
    isGood = true;
  }

  let end = findEndDate(event.recurringInfo, arrayOfDates);
  if (!end) return event;
  arrayOfDates = arrayOfDates.filter(timeStamp => moment().unix() < timeStamp);
  let newDates = [];
  while (
    end.maxDate.diff(moment(eventDay).startOf('day')) > 0 &&
    newDates.length < end.maxEvents
  ) {
    newDates.push(eventDay.unix());
    eventDay = findNext(eventDay, keyWord, event.recurringInfo);
  }
  arrayOfDates = [...arrayOfDates, ...newDates];
  for (let key of arrayOfDates) {
    if (!event.registeredVolunteers[key]) {
      event.registeredVolunteers[key] = [];
    }
  }
  return event.registeredVolunteers;
};
