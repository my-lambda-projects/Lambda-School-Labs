import moment from 'moment';

//this function is being used to get the accumulated volunteered hours for each month for the current year 

export const groupHoursByMonths = (events) => {
  let start = moment().startOf('year');
  let end = moment().endOf('year');
  
  let arr = []
  for (let i = moment().startOf('year'); moment(i).isSameOrBefore(moment().endOf('year')); i = moment(i).add(1, 'months')) {
    arr.push({
      month: i.format('MMM'),
      hours: 0});
  }

  let filteredHours = events
    .filter(item => item.isVerified && moment.unix(item.date).isBetween(moment(start).startOf('month'), moment(end).endOf('month'), null, '[]'))
    .map(item => ({
      date: item.date,
      hours: item.hours
    }))

  filteredHours.sort((a, b) => a.date - b.date);

  let grouped = {}
  
  filteredHours.forEach(item => {
    if (!grouped[moment.unix(item.date).format('MMM')]) {
      grouped[moment.unix(item.date).format('MMM')] = item.hours;
    } else {
      grouped[moment.unix(item.date).format('MMM')] += item.hours;
    }
  })

  let newArr = arr.map(item => ({
    ...item,
    hours: grouped[item.month] || 0
  }))

  return newArr;
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
*/