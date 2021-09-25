export const setDaysOpen = arr => {
    if (!arr) {
      return '';
    }
    const dayConversion = {
      Monday: 0,
      Tuesday: 1,
      Wednesday: 2,
      Thursday: 3,
      Friday: 4,
      Saturday: 5,
      Sunday: 6
    };
    const rC = {
      0: 'Monday',
      1: 'Tuesday',
      2: 'Wednesday',
      3: 'Thursday',
      4: 'Friday',
      5: 'Saturday',
      6: 'Sunday',
    };
    let daysAsNum = arr.map(day => dayConversion[day]).sort();

    let daySegments = [];
    let segment = [];
    for (let i = 0; i < daysAsNum.length; i++) {
      segment.push(daysAsNum[i]);
      if (i < daysAsNum.length - 1 && daysAsNum[i] + 1 === daysAsNum[i + 1]) {
        continue;
      } else {
        daySegments.push(segment);
        segment = [];
      }
    }
    let result = [];
    for (let i = 0; i < daySegments.length; i++) {
      switch (daySegments[i].length) {
        case 1:
          result.push(`${rC[daySegments[i][0]]}`);
          break;
        case 2:
          result.push(`${rC[daySegments[i][0]]}`);
          result.push(`${rC[daySegments[i][1]]}`);
          break;
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
          result.push(
            `${rC[daySegments[i][0]]} - ${
              rC[daySegments[i][daySegments[i].length - 1]]
            }`
          );
          break;
      }
    }
    return result.join(', ');
  };