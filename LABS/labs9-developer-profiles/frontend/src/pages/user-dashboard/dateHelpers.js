export const oneToTwo = (oneString) => {

    let dates = oneString.split(" to ")
    let monthMaker = {
      'January': '01',
      'February': '02',
      'March': '03',
      'April': '04',
      'May': '05',
      'June': '06',
      'July': '07',
      'August': '08',
      'September': '09',
      'October': '10',
      'November': '11',
      'December': '12',
    }
    let startFrom = dates[0].split(" ")
    let monthFrom = startFrom[0]
    let yearFrom = startFrom[1]
    let endFrom = `${yearFrom}-${monthMaker[monthFrom]}`
    let startTo = dates[1].split(" ")
    let monthTo = startTo[0]
    let yearTo = startTo[1]
    let endTo = `${yearTo}-${monthMaker[monthTo]}`
    return {from: endFrom, to: endTo}
}

export const twoToOne = (dateFrom='2018-06', dateTo='2019-04') => {
  let from = dateFrom.split('-')
  let to = dateTo.split('-')
  let months = {
    '01': 'January',
    '02': 'February',
    '03': 'March',
    '04': 'April',
    '05': 'May',
    '06': 'June',
    '07': 'July',
    '08': 'August',
    '09': 'September',
    '10': 'October',
    '11': 'November',
    '12': 'December',
  }
  return `${months[from[1]]} ${from[0]} to ${months[to[1]]} ${to[0]}`;
}