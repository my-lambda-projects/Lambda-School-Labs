import moment from 'moment';

export const getAccHoursForDuration = (duration, events) => {
  let start = moment(duration.start).unix();
  let end = moment(duration.end).endOf('month').unix();
  let numHours = 0;
  events.forEach(item => {
    if (item.isVerified && (item.date >= start && item.date <= end)) {
      numHours += item.hours;
    }
  })
  return numHours;
}

export const volunteerProgress = (goals, events) => {
  let hours = getAccHoursForDuration(goals.duration, events);
  let total;

  if (goals.frequency === 'per week') {
    total = moment(goals.duration.end).endOf('month').diff(moment(goals.duration.start), 'weeks');
    return Math.round(hours * 100/ (total * goals.hours));
  } else if ((goals.frequency === 'per month')) {
    total = moment(goals.duration.end).diff(moment(goals.duration.start), 'months') + 1;
    return Math.round(hours * 100/ (total * goals.hours));
  }
}



/*
expected data format (user document):

registeredEvents: [
  {
    ...
    date: //unix timestamp
    hours: int,
    isVerified: Boolean;
  },
  ...
]

duration = {
  start: //unix timestamp,
  end: //unix timestamp
}

goal = {
  hours: int,
  frequency: // 'per week', 'per month'
}

*/