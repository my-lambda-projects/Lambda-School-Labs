export function timeConvertor(time) {
  var PM = time.match("PM") ? true : false;

  time = time.split(":");

  if (PM) {
    if (time[0] == 12) {
      var hour = 12;
      var min = time[1].replace("PM", "");
    } else {
      var hour = 12 + parseInt(time[0], 10);
      var min = time[1].replace("PM", "");
    }
  } else {
    var hour = time[0];
    var min = time[1].replace("AM", "");
  }

  return `${hour}:${min}`;
}

export const chronoSorter = allActivities => {
  // Turn your strings into dates, and then subtract them
  // to get a value that is either negative, positive, or zero.
  allActivities.sort(function(a, b) {
    return new Date(a.date) - new Date(b.date);
  });
};
