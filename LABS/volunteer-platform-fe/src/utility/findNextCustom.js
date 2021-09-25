import moment from 'moment';
import { findNthWeek } from './findNthWeek';

export const findNextCustom = (date, info) => {
  let unit = info.repeatEveryValue;
  let timeFrame = info.repeatEvery;
  let dayAbbrevs = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  let days = info.days ? [...info.days].map(day => dayAbbrevs[day]).sort() : [];
  let nextOccurrence = moment(date);
  switch (unit) {
    case 'Day':
    case 'Days':
      return nextOccurrence.add(timeFrame, 'days');
    case 'Week':
    case 'Weeks':
      let greaterThanAllDays = true;
      let desiredDay;
      for (let i = 0; i < days.length; i++) {
        if (date.day() < days[i]) {
          desiredDay = i;
          greaterThanAllDays = false;
          break;
        }
      }
      if (greaterThanAllDays) {
        nextOccurrence
          .add(timeFrame, 'weeks')
          .startOf('week')
          .day(days[0]);
      } else {
        nextOccurrence.day(days[desiredDay]);
      }
      return moment(nextOccurrence.format('LL') + ' ' + date.format('LT'));
    case 'Month':
    case 'Months':
      return info.monthlyPeriod.split(' ')[2] === 'day'
        ? date.add(timeFrame, 'months')
        : findNthWeek(date.add(timeFrame, 'months'), {
            repeatTimePeriod: info.monthlyPeriod,
          });
  }
  return 1;
};
