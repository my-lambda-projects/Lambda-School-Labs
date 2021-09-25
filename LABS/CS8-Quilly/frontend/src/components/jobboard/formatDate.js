module.exports = function formatDate(dateAdded) {
  let yearAdded = parseInt(dateAdded.slice(0, 4), 10);
  let monthAdded = parseInt(dateAdded.slice(5, 7), 10);
  let dayAdded = parseInt(dateAdded.slice(8, 10), 10);

  let currentDate = new Date();
  let currentYear = currentDate.getFullYear();
  let currentMonth = currentDate.getMonth() + 1;
  let currentDay = currentDate.getDate();

  let formattedDate = 'Added ';
  let difference;
  let s = '';

  if (currentYear === yearAdded) {
    if (currentMonth === monthAdded) {
      if (currentDay === dayAdded || currentDay - dayAdded < 1) {
        formattedDate = formattedDate + 'today';
      } else {
        difference = currentDay - dayAdded;
        if (difference > 1) s = 's';
        formattedDate = formattedDate + difference + ` day${s} ago`;
      }
    } else {
      difference = currentMonth - monthAdded;
      if (difference > 1) s = 's';
      formattedDate = formattedDate + difference + ` month${s} ago`;
    }
  } else {
    difference = currentYear - yearAdded;
    if (difference > 1) s = 's';
    formattedDate = formattedDate + difference + ` year${s} ago`;
  }

  return formattedDate;
}
