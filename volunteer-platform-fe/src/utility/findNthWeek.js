import moment from 'moment';

export const findNthWeek = (date, info) => {
  let dayAbbrevs = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  let unitConversion = { First: 1, Second: 2, Third: 3, Fourth: 4 };
  let whichWeek = unitConversion[info.repeatTimePeriod.split(' ')[2]];
  let whichDay = dayAbbrevs[info.repeatTimePeriod.split(' ')[3]];
  let dateMonth = date.month();
  let first_week = moment(date)
    .startOf('month')
    .day(whichDay);
  if (first_week.month() !== dateMonth) {
    first_week.add(7, 'days');
  }
  let correct_week = first_week.add(7 * (whichWeek - 1), 'days');
  return moment(correct_week.format('LL') + ' ' + date.format('LT'));
};
